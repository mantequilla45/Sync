import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors'; // Import the cors package

const app = express();
const PORT = 4000;

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

interface user {
    id: string,
    name: string,
    room: string
}

const UsersState = {
    users: [] as user[],
    setUsers: function (newUsersArray:user[]) {
        this.users = newUsersArray
    }
}

app.post('/create-room', (req, res) => {
    const { roomName } = req.body;

    // Emit an event to notify all clients about the new room
    io.emit('roomList', {
        rooms: getAllActiveRooms()
    });

    res.status(200).send(`Room ${roomName} created`);
});

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)
    socket.emit('createRoom', 'RoomB');
    // Upon connection - only to user 
    socket.emit('message', buildMsg("Admin", "Welcome to Chat App!"))

    socket.on('createRoom', (roomName) => {
        // Emit a message or update the list of rooms
        io.emit('roomList', {
            rooms: getAllActiveRooms()
        })
        socket.emit('message', buildMsg("Admin", `Room ${roomName} created`))
    })

    socket.on('enterRoom', ({ name, room }) => {

        // leave previous room 
        const prevRoom = getUser(socket.id)?.room

        if (prevRoom) {
            socket.leave(prevRoom)
            io.to(prevRoom).emit('message', buildMsg("Admin", `${name} has left the room`))
        }

        const user = activateUser(socket.id, name, room)

        // Cannot update previous room users list until after the state update in activate user 
        if (prevRoom) {
            io.to(prevRoom).emit('userList', {
                users: getUsersInRoom(prevRoom)
            })
        }

        // join room 
        socket.join(user.room)

        // To user who joined 
        socket.emit('message', buildMsg("Admin", `You have joined the ${user.room} chat room`))

        // To everyone else 
        socket.broadcast.to(user.room).emit('message', buildMsg("Admin", `${user.name} has joined the room`))

        // Update user list for room 
        io.to(user.room).emit('userList', {
            users: getUsersInRoom(user.room)
        })

        // Update rooms list for everyone 
        io.emit('roomList', {
            rooms: getAllActiveRooms()
        })
    })

    // When user disconnects - to all others 
    socket.on('disconnect', () => {
        const user = getUser(socket.id)
        userLeavesApp(socket.id)

        if (user) {
            io.to(user.room).emit('message', buildMsg("Admin", `${user.name} has left the room`))

            io.to(user.room).emit('userList', {
                users: getUsersInRoom(user.room)
            })

            io.emit('roomList', {
                rooms: getAllActiveRooms()
            })
        }

        console.log(`User ${socket.id} disconnected`)
    })

    // Listening for a message event 
    socket.on('message', ({ name, text }) => {
        const room = getUser(socket.id)?.room
        if (room) {
            io.to(room).emit('message', buildMsg(name, text))
        }
    })

    // Listen for activity 
    socket.on('activity', (name) => {
        const room = getUser(socket.id)?.room
        if (room) {
            socket.broadcast.to(room).emit('activity', name)
        }
    })
})

function buildMsg(name: string, text: string) {
    return {
        name,
        text,
        time: new Intl.DateTimeFormat('default', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).format(new Date())
    }
}

// User functions 
function activateUser(id: string, name: string, room: string) {
    const user = { id, name, room }
    UsersState.setUsers([
        ...UsersState.users.filter(user => user.id !== id),
        user
    ])
    return user
}

function userLeavesApp(id:string) {
    UsersState.setUsers(
        UsersState.users.filter(user => user.id !== id)
    )
}

function getUser(id:string) {
    return UsersState.users.find(user => user.id === id)
}

function getUsersInRoom(room:string) {
    return UsersState.users.filter(user => user.room === room)
}

function getAllActiveRooms() {
    return Array.from(new Set(UsersState.users.map(user => user.room)))
}

server.listen(PORT, () => {
  console.log(`💬 server on port ${PORT}`);
});

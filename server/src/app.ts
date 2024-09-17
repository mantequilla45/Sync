import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { TestRoute } from './routes/TestRoute';
import { corsConfig, socketCORSConfig } from './config/corsConfig';
import { authenticateFirebaseToken } from './middleware';
import { updateUserStatus } from './lib/FirebaseAdmin';
import { trackUserStatus } from './sockets/trackUserStatus';
import { UserStatus } from '../../_shared/enums';

const app = express();

// Middleware
app.use(corsConfig);
app.use(bodyParser.json());

// API Routes
app.use('/api', authenticateFirebaseToken, TestRoute);

// Create HTTP server
const httpServer = createServer(app);

// Setup Socket.IO with existing CORS configuration
const io = new Server(httpServer, {
    cors: socketCORSConfig,
});

// Socket.IO connection handler
io.on('connection', (socket) => {
    const uid = socket.handshake.query.uid as string; // Get uid from client-side
    console.log(uid);
    if (!uid) {
      socket.disconnect(); // Disconnect if no UID is provided
      return;
    }

    // Track the user's online status when connected
    trackUserStatus(uid, socket);

    // Update Firebase when a user disconnects (e.g., browser is closed)
    socket.on('disconnect', () => {
      updateUserStatus(uid, UserStatus.Offline);
    });
});

// Export the HTTP server for starting
export { httpServer };
export default app;

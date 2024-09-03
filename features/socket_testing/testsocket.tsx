import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketClient: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [counter, setCounter] = useState<number | null>(null);
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

  const connectSocket = () => {
    const newSocket = io('http://localhost:4000');
    
    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    // Update the counter instead of appending to an array
    newSocket.on('message', (num: number) => {
      setCounter(num);
    });

    setSocket(newSocket);
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setIsConnected(false);
      setCounter(null);
    }
  };

  return (
    <div>
      <h2>Socket.IO Client is {isConnected ? 'Connected' : 'Disconnected'}</h2>
      <p>{counter !== null ? `Current ${counter}` : 'Waiting for counter...'}</p>
      <button onClick={connectSocket} disabled={isConnected} className='bg-green-500'>
        Connect to Socket
      </button>
      <button onClick={disconnectSocket} disabled={!isConnected} className='bg-green-500'>
        Disconnect from Socket
      </button>
    </div>
  );
};

export default SocketClient;

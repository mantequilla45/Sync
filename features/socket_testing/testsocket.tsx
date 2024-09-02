import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketClient: React.FC<{ onConnectionStatusChange: (status: string) => void }> = ({ onConnectionStatusChange }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connectSocket = useCallback(() => {
    if (!socket) {
      const newSocket = io('http://localhost:4000');
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to server');
        setIsConnected(true);
        onConnectionStatusChange('Connected');
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
        setIsConnected(false);
        onConnectionStatusChange('Disconnected');
      });

      newSocket.on('message', (data: string) => {
        console.log('Received message:', data);
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      newSocket.on('connect_error', (error) => {
        console.log('Connection error:', error);
        onConnectionStatusChange('Connection Error');
      });
    }
  }, [socket, onConnectionStatusChange]);

  const disconnectSocket = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [socket]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <div>
      <h2>Socket.IO Client is {isConnected ? 'Connected' : 'Disconnected'}</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <button onClick={connectSocket} disabled={isConnected}>
        Connect to Socket
      </button>
      <button onClick={disconnectSocket} disabled={!isConnected}>
        Disconnect from Socket
      </button>
    </div>
  );
};

export default SocketClient;

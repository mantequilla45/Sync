import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { corsConfig, socketCORSConfig } from './config/corsConfig';
import { authenticateFirebaseToken } from './middleware';
import { trackUserStatus } from './sockets/trackUserStatus';
import { DocumentRoute } from './routes/DocumentRoute';
import { editDocumentTentative } from './sockets/editDocumentTentative';

const app = express();

// Middleware
app.use(corsConfig);
app.use(bodyParser.json());

// API Routes
app.use('/api', authenticateFirebaseToken, DocumentRoute);

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


  trackUserStatus(uid, socket);
  editDocumentTentative(socket);

});

// Export the HTTP server for starting
export { httpServer };
export default app;

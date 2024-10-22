import { Request, Response, NextFunction } from 'express';
import { Socket } from 'socket.io';
import { verifyIdToken } from './actions/_index';

export const authenticateFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  console.log(idToken);

  if (!idToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log(idToken);
    const decodedToken = await verifyIdToken(idToken);
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export async function authenticateSocket(socket: Socket, next: (err?: any) => void): Promise<void> {
  const token = socket.handshake.auth.token;

  if (!token) {
    const error = new Error('Unauthorized: No token provided');
    console.log('No token provided');
    return next(error);
  }

  try {
    const decodedToken = await verifyIdToken(token);
    (socket as any).user = decodedToken;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    next(new Error('Unauthorized: Invalid or expired token'));
  }
}
import express from 'express';
import bodyParser from 'body-parser';
import { TestRoute } from './routes/TestRoute';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import { verifyIdToken } from './lib/FirebaseAdmin';
const app = express();
const port = 4000;

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Add Authorization header
  }));

app.use(bodyParser.json())

app.use('/api', TestRoute);


const authenticateFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
  
    if (!idToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const decodedToken = await verifyIdToken(idToken);
      (req as any).user = decodedToken; // Attach user info to request object
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
  
  // Example route
  app.get('/api/example', authenticateFirebaseToken, (req: Request, res: Response) => {
    console.log("reached");
    res.json({ message: 'Authenticated request', user: (req as any).user });
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  })
import { Request, Response, NextFunction } from 'express';
import { verifyIdToken } from './actions/_index';

export const authenticateFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
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

import { Request, Response } from 'express';
import { bucket } from '../../lib/Firebase/_index';

export const saveDocument = async (req: Request, res: Response): Promise<void> => {
    const { content } = req.body;
    const file = bucket.file('documents/myDocument.txt');
  
    try {
      await file.save(content, {
        contentType: 'text/plain',
      });
      res.status(200).send('Document saved successfully.');
    } catch (error) {
      console.error('Error saving document:', error);
      res.status(500).send('Error saving document.');
    }
};

//deprecated i guess

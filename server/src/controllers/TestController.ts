import { Request, Response } from "express";

const response = { message: 'd, World!' };

export const getResponse = (req: Request, res: Response):void => {
    res.json(response);
};

console.log( {response} + " ")
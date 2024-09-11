import { Router } from "express";
import { getResponse } from "../controllers/TestController";

const router = Router();

router.get('/getResponse', getResponse); 

export const TestRoute = router;

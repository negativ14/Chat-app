import express from "express";
import authRouter from "./auth.route";
import { getMessages, getUserSidebar, sendMessage } from "../controllers/message.controller";

const messageRouter = express.Router();

messageRouter.get('/users', authRouter, getUserSidebar);

messageRouter.get('/:id', authRouter, getMessages);

messageRouter.post('/send/:id', authRouter, sendMessage);

export default messageRouter;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./auth.route"));
const message_controller_1 = require("../controllers/message.controller");
const messageRouter = express_1.default.Router();
messageRouter.get('/users', auth_route_1.default, message_controller_1.getUserSidebar);
messageRouter.get('/:id', auth_route_1.default, message_controller_1.getMessages);
messageRouter.post('/send/:id', auth_route_1.default, message_controller_1.sendMessage);
exports.default = messageRouter;

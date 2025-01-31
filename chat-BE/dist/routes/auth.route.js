"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authRouter = (0, express_1.Router)();
authRouter.post('/signup', auth_controller_1.signup);
authRouter.post('/login', auth_controller_1.login);
authRouter.post('/logout', auth_controller_1.logout);
authRouter.put('/update-profile', auth_middleware_1.authMiddleware, auth_controller_1.updateUserProfile);
authRouter.get('/check', auth_middleware_1.authMiddleware, auth_controller_1.checkAuth);
exports.default = authRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_session_1 = __importDefault(require("express-session"));
var secret = process.env.secret;
var sessionObj = express_session_1.default({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 2 * 600000,
    },
});
// function sessionImplementation(req:Request, res:Response, next:NextFunction){
// }
exports.default = sessionObj;

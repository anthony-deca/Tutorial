"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var MONGO_URI = process.env.MONGO_URI;
var connectDB = function () {
    try {
        mongoose_1.default.connect(MONGO_URI);
        console.log("db connected");
    }
    catch (error) {
        throw Error;
    }
};
exports.default = connectDB;

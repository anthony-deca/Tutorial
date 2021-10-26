"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var tutorialSchemaObject = {
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        default: false,
        required: true,
    }
};
var tutorialSchema = new mongoose_1.default.Schema(tutorialSchemaObject, { timestamps: true });
exports.default = mongoose_1.default.model("Tutorial", tutorialSchema);

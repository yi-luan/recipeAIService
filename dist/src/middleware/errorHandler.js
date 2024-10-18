"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = __importDefault(require("console"));
const errorHandler = (err, req, res, next) => {
    console_1.default.error(err.stack);
    res.status(500).send('發生了一些錯誤！');
    next();
};
exports.default = errorHandler;

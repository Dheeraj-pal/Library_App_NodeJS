"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.loggerMiddleware = void 0;
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: 'logs.log' }),
    ],
});
exports.logger = logger;
const loggerMiddleware = (req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
};
exports.loggerMiddleware = loggerMiddleware;

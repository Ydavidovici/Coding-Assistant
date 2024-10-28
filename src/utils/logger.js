// src/utils/logger.js
import { createLogger, format, transports } from 'winston';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

// Ensure logs directory exists
const logDir = path.resolve('logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(
            (info) =>
                `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
        )
    ),
    transports: [
        new transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error',
        }),
        new transports.File({ filename: path.join(logDir, 'combined.log') }),
    ],
});

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf((info) => {
                    switch (info.level) {
                        case 'info':
                            return chalk.blue(`[INFO] ${info.message}`);
                        case 'warn':
                            return chalk.yellow(`[WARN] ${info.message}`);
                        case 'error':
                            return chalk.red(`[ERROR] ${info.message}`);
                        default:
                            return info.message;
                    }
                })
            ),
        })
    );
}

export function logAction(message) {
    logger.info(message);
}

export function logError(message) {
    logger.error(message);
}

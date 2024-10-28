// src/assistants/statsTracker.js
import fs from 'fs';
import path from 'path';
import { logAction } from '../utils/logger.js';

let apiUsage = 0;
let tokensUsed = 0;
let successfulTests = 0;
let totalTests = 0;
let executionTime = 0;

export function trackApiUsage(tokens) {
    apiUsage += 1;
    tokensUsed += tokens;
}

export function trackAccuracy(passed, total) {
    successfulTests += passed;
    totalTests += total;
}

export function logMetrics() {
    const accuracy = totalTests > 0 ? (successfulTests / totalTests) * 100 : 0;
    const metrics = {
        apiUsage,
        tokensUsed,
        codeAccuracy: `${accuracy.toFixed(2)}%`,
        executionTime, // Currently unused; you can implement timing if needed
    };

    const logDir = path.resolve('logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    const logPath = path.join(
        logDir,
        `session-log-${new Date().toISOString().split('T')[0]}.json`
    );
    fs.writeFileSync(logPath, JSON.stringify(metrics, null, 2), 'utf-8');
    logAction(`Metrics logged to ${logPath}`);
}

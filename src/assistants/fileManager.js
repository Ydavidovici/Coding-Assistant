// src/assistants/fileManager.js
import fs from 'fs';
import path from 'path';
import { logAction, logError } from '../utils/logger.js';

export function writeToFile(filename, content) {
    try {
        const filePath = path.resolve('project', filename); // Ensure 'project' directory exists or adjust as needed
        fs.writeFileSync(filePath, content, 'utf-8');
        logAction(`Written to file: ${filePath}`);
    } catch (error) {
        logError(`Error writing to file ${filename}: ${error.message}`);
        throw error;
    }
}

export function readFile(filename) {
    try {
        const filePath = path.resolve('project', filename);
        const data = fs.readFileSync(filePath, 'utf-8');
        logAction(`Read file: ${filePath}`);
        return data;
    } catch (error) {
        logError(`Error reading file ${filename}: ${error.message}`);
        throw error;
    }
}

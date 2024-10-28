// src/assistants/testRunner.js
import { execSync } from 'child_process';
import ora from 'ora';
import { logAction, logError } from '../utils/logger.js';

export async function runTests(config) {
    const spinner = ora('Running tests...').start();
    try {
        const output = execSync(config.defaultTestCommand || 'npm test', {
            encoding: 'utf-8',
        });
        spinner.succeed('Tests completed successfully.');

        // Simple parsing logic; adjust based on your test framework's output
        const passed = output.includes('PASS');
        const total = output.match(/(\d+) total/)
            ? parseInt(output.match(/(\d+) total/)[1], 10)
            : 0;
        const failed = output.match(/(\d+) failed/)
            ? parseInt(output.match(/(\d+) failed/)[1], 10)
            : 0;

        return {
            success: passed && failed === 0,
            passed,
            total,
        };
    } catch (error) {
        spinner.fail('Tests failed.');
        logError(`Tests failed: ${error.message}`);
        return {
            success: false,
            passed: 0,
            total: 0,
        };
    }
}

// Implement an interactive version of runTests if needed
export async function runTestsInteractive(config) {
    const spinner = ora('Running tests...').start();
    try {
        const output = execSync(config.defaultTestCommand || 'npm test', {
            encoding: 'utf-8',
        });
        spinner.succeed('Tests completed successfully.');

        const passed = output.includes('PASS');
        const total = output.match(/(\d+) total/)
            ? parseInt(output.match(/(\d+) total/)[1], 10)
            : 0;
        const failed = output.match(/(\d+) failed/)
            ? parseInt(output.match(/(\d+) failed/)[1], 10)
            : 0;

        console.log(output); // Display test output

        return {
            success: passed && failed === 0,
            passed,
            total,
        };
    } catch (error) {
        spinner.fail('Tests failed.');
        console.error(error.stdout.toString()); // Display failed test output
        logError(`Tests failed: ${error.message}`);
        return {
            success: false,
            passed: 0,
            total: 0,
        };
    }
}

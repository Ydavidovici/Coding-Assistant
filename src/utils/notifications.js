// src/utils/notifications.js
import notifier from 'node-notifier';
import path from 'path';
import chalk from 'chalk';

export function sendNotification(message, type = 'info') {
    let title = 'Coding Assistant';
    let icon;

    switch (type) {
        case 'success':
            icon = path.join(__dirname, '..', 'assets', 'success.png'); // Ensure you have an icon
            break;
        case 'error':
            icon = path.join(__dirname, '..', 'assets', 'error.png'); // Ensure you have an icon
            break;
        case 'warning':
            icon = path.join(__dirname, '..', 'assets', 'warning.png'); // Ensure you have an icon
            break;
        default:
            icon = path.join(__dirname, '..', 'assets', 'info.png'); // Ensure you have an icon
    }

    notifier.notify({
        title: title,
        message: message,
        icon: icon, // Absolute path (doesn't work on balloons)
        sound: true, // Only Notification Center or Windows Toasters
        wait: false, // Do not wait for user action
    });

    // Also log to console with colors
    switch (type) {
        case 'success':
            console.log(chalk.green(`[SUCCESS] ${message}`));
            break;
        case 'error':
            console.log(chalk.red(`[ERROR] ${message}`));
            break;
        case 'warning':
            console.log(chalk.yellow(`[WARN] ${message}`));
            break;
        default:
            console.log(chalk.blue(`[INFO] ${message}`));
    }
}

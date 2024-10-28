// eslint.config.js
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
    {
        files: ['**/*.js'],
        ignores: ['node_modules/**', 'dist/**'], // Specify directories to ignore
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                // Define the globals you need, for example:
                process: 'readonly',
                __dirname: 'readonly',
                module: 'readonly',
                require: 'readonly',
                // Add other globals as needed
            },
        },
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            'no-unused-vars': 'warn',
            eqeqeq: 'error',
            'no-console': 'warn',
            'prettier/prettier': 'error',
        },
    },
];

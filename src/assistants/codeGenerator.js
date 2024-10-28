// src/assistants/codeGenerator.js
import axios from 'axios';
import { logAction, logError } from '../utils/logger.js';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/completions'; // Update if using different endpoint

export async function generateInitialCode(prompt, config) {
    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: 'gpt-4-turbo', // Use your preferred model
                prompt: buildPrompt(prompt, config),
                max_tokens: 1500, // Adjust as needed
                temperature: 0.2, // Lower temperature for more deterministic output
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        const code = response.data.choices[0].text.trim();
        logAction('Generated initial code from OpenAI.');
        return code;
    } catch (error) {
        logError(`Error generating initial code: ${error.message}`);
        throw error;
    }
}

export async function refineCode(refinementPrompt, config) {
    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: 'gpt-4-turbo',
                prompt: buildRefinementPrompt(refinementPrompt, config),
                max_tokens: 1500,
                temperature: 0.2,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        const refinedCode = response.data.choices[0].text.trim();
        logAction('Refined code using OpenAI.');
        return refinedCode;
    } catch (error) {
        logError(`Error refining code: ${error.message}`);
        throw error;
    }
}

function buildPrompt(userPrompt, config) {
    // Incorporate codePreferences.json settings into the prompt
    const { stylePreferences, testing, documentationStyle } = config;
    return `
You are a professional JavaScript developer.

Preferences:
- Indentation: ${stylePreferences.indentation}
- Variable Naming: ${stylePreferences.variableNaming}
- Class Naming: ${stylePreferences.classNaming}
- Comments: ${stylePreferences.comments.functionComments}
- API Documentation: ${stylePreferences.comments.apiDocumentation}
- Code Modularity: ${config.codeModularity.approach}
- Testing: ${JSON.stringify(testing)}
- Documentation Style: ${JSON.stringify(documentationStyle)}

Task:
${userPrompt}

Provide the code adhering to the above preferences.
`;
}

function buildRefinementPrompt(refinementPrompt, config) {
    // Similar to buildPrompt but focused on refinement
    return `
You are a professional JavaScript developer.

Preferences:
- Indentation: ${config.stylePreferences.indentation}
- Variable Naming: ${config.stylePreferences.variableNaming}
- Class Naming: ${config.stylePreferences.classNaming}
- Comments: ${config.stylePreferences.comments.functionComments}
- API Documentation: ${config.stylePreferences.comments.apiDocumentation}
- Code Modularity: ${config.codeModularity.approach}
- Testing: ${JSON.stringify(config.testing)}
- Documentation Style: ${JSON.stringify(config.documentationStyle)}

Task:
${refinementPrompt}

Refine the code to fix the failing tests while adhering to the above preferences.
`;
}

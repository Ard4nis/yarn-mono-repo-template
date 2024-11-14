import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: [
            '**/dist/**/*',
            '**/node_modules/**/*',
            '**/build/**/*',
            '**/out/**/*',
            '**/public/**/*',
            '**/static/**/*',
            '**/vendor/**/*',
            '**/tmp/**/*',
            '**/temp/**/*',
            '**/cache/**/*',
            '**/.*',
            '**/.*/**/*',
            '**/.*/**/.*',
        ],
    },
    ...compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:unicorn/recommended',
        'prettier'
    ),
    {
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },

        languageOptions: {
            globals: {
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },

        rules: {
            'unicorn/filename-case': [
                'error',
                {
                    case: 'camelCase',
                },
            ],

            'unicorn/no-array-for-each': 0,
        },
    },
    {
        files: ['**/*.tsx'],
        rules: {
            'unicorn/filename-case': [
                'error',
                {
                    case: 'pascalCase',
                    ignore: ['main.tsx'],
                },
            ],
        },
    },
];

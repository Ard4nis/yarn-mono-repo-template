export default {
    roots: ['<rootDir>/modules'],
    testMatch: ['<rootDir>/modules/**/src/**/__tests__/**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', './tsconfig.json'],
    },
    workerIdleMemoryLimit: '512MB',
    testPathIgnorePatterns: ['/node_modules/'],
};

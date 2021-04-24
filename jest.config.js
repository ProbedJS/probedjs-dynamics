const config = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)?$',
    testPathIgnorePatterns: ['/test-dist'],
    moduleFileExtensions: ['js', 'ts'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    collectCoverage: process.env.COVERAGE === 'ON',
    coverageDirectory: './coverage',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
};

export default config;

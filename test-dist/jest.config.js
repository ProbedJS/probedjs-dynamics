var glob = require('glob');

function createDistTestConfig(libName, directory, umdCoverageThresholds) {
    var targets = glob.sync('**/*.js', { cwd: directory }).map((f) => ({
        name: f,
        lib: f,
    }));

    return {
        testEnvironment: 'node',
        collectCoverageFrom: ['./dist/**/*.js'],
        collectCoverage: true,
        coverageDirectory: './coverage',
        coverageThreshold: {
            global: {
                statements: 100,
                branches: 100,
                functions: 100,
                lines: 100,
            },
            // UMDs have some boilerplate that we can't systematically test against.
            // The numbers represent the current state of affairs.
            '**/umd/**': umdCoverageThresholds,
        },
        projects: targets.map((t) => {
            const mappings = {};
            mappings[libName] = `${libName}/${t.lib}`;
            return {
                displayName: t.name,
                transform: {
                    '^.+\\.[tj]sx?$': ['./transform', { mappings }],
                },
            };
        }),
    };
}

module.exports = createDistTestConfig('@probed/dynamics', './dist', {
    statements: 92,
    branches: 60,
    functions: 93,
    lines: 93,
});

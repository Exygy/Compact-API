module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../',
  testEnvironment: 'node',
  testRegex: 'spec.ts$',
  workerIdleMemoryLimit: '500M',
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        diagnostics: false,
      },
    ],
  },
  collectCoverage: true,
  collectCoverageFrom: [
    './src/services/**',
    './src/utilities/**',
    './src/controllers/**',
    './src/modules/**',
    './src/passports/**',
    './src/utilities/custom-exception-filter.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 90,
      lines: 90,
    },
  },
};

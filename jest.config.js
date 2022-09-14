const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  displayName: 'root-tests',
  testMatch: ['<rootDir>/**/*.test.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/useCases/*.ts',
    '<rootDir>/src/utils/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  preset: 'ts-jest'
};
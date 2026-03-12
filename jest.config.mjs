export default {
  testEnvironment: 'node',

  // Let babel-jest transform TS/JS files using babel.config.js
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },

  // Treat .ts as ESM (since your project uses "type": "module")
  extensionsToTreatAsEsm: ['.ts'],

  // Resolve @/ to src/
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
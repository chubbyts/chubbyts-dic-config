const config = require('@chubbyts/chubbyts-eslint/dist/eslintrc').default;

module.exports = {
  ...config,
  parserOptions: {
    ...config.parserOptions,
    project: './tsconfig.eslint.json', // or tsconfig.json if no custom tsconfig is needed
  },
};

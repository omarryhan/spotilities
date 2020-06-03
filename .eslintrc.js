module.exports = {
    root: true,
    env: {
      es6: true,
      node: true,
      jest: true,
      "jest/globals": true
    },
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
      "react",
      "jsx-a11y",
      "jest"
    ],
    parserOptions: {
      project: './tsconfig.json',
      extraFileExtensions: ['.json'],
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      "plugin:react/recommended",
      "airbnb-typescript",
      "react-app",
      "plugin:jsx-a11y/recommended",
      "plugin:react-hooks/recommended"
    ],
    rules: {
      "indent": ["error", 2],
      "@typescript-eslint/indent": ["error", 2],
      'import/prefer-default-export': 'off',
      'react/prop-types': 'off',  // Typescript types are enough for most cases
      'no-return-await': 'off',
      'no-console': 'off',
      'no-await-in-loop': 'off'
    }
};
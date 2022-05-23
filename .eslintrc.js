module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:cypress/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'cypress',
    'es',
    'noredink-cypress',
    'mocha',
    '@typescript-eslint',
    'unused-imports'
  ],
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'brace-style': [ 'error', '1tbs', { allowSingleLine: true } ],
    camelcase: 'error',
    'capitalized-comments': [ 'error', 'never', { ignorePattern: 'TODO|QA-\\d|Cypress.' } ],
    'comma-spacing': [ 'error', { before: false, after: true } ],
    'comma-style': [ 'error', 'last' ],
    curly: [ 'error', 'all' ],
    'default-case': 'error',
    'eol-last': [ 'error', 'always' ],
    'function-paren-newline': [ 'error', 'multiline' ],
    indent: [ 'error', 2, { SwitchCase: 1 } ],
    'max-len': [ 'error', { code: 120, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true } ],
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-skipped-tests': 'error',
    'multiline-comment-style': [ 'off', 'bare-block' ],
    'no-duplicate-imports': 'error',
    'no-empty-function': 'error',
    'no-extra-parens': [ 'error', 'all', { nestedBinaryExpressions: false } ],
    'no-floating-decimal': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'off',
    'no-multiple-empty-lines': [ 'error', { max: 2, maxEOF: 1 } ],
    'no-self-compare': 'error',
    'no-trailing-spaces': 'error',
    'unused-imports/no-unused-imports': 'error',
    'no-use-before-define': 'off',
    'no-var': 'error',
    'noredink-cypress/assertion-before-percySnapshot': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    quotes: [ 'error', 'single' ],
    semi: [ 'error', 'never', { beforeStatementContinuationChars: 'always' } ],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  },
  overrides: [
    {
      files: [ '*.js' ],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files: [ '*.ts' ],
      rules: {
        'capitalized-comments': 'off',
        'no-unused-vars': 'off',
        'no-undef': 'off'
      }
    }
  ]
}

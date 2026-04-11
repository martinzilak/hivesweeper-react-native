module.exports = {
  root: true,
  extends: [
    'expo',
    'eslint-config-prettier',
  ],
  rules: {
    'prettier/prettier': 0,
    'no-restricted-imports': ['error', {
      patterns: [{
        group: ['hivesweeper/*/*'],
        message: 'Import from the module root instead: hivesweeper/<module>',
      }],
    }],
    'import/no-duplicates': ['error', { 'prefer-inline': true }],
  },
};

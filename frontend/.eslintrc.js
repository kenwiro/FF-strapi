module.exports = {
  'env': {
    'es6': true,
    'node': true
  },
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'parser': 'babel-eslint',
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [ 'vue','vuetify' ],
  'extends': [
    'plugin:nuxt/recommended',
    'plugin:vue/essential',
  ],
  'rules': {
    'quotes': [
      2,
      'single'
    ],
    'brace-style': [
      2,
      '1tbs',
      {
        'allowSingleLine': true
      }
    ],
    'array-bracket-spacing': [
      2,
      'always'
    ],
    'arrow-parens': [
      2,
      'as-needed'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'indent': [
      2,
      2,
      {
        'SwitchCase': 1
      }
    ],
    'no-param-reassign': [
      'error',
      {
        'props': true,
        'ignorePropertyModificationsFor': [
          'state',
          'Vue'
        ]
      }
    ],
    'import/no-named-as-default': 0,
    'max-len': [
      'error',
      {
        'code': 120,
        'ignoreTrailingComments': true
      }
    ],
    'semi': [
      'error'
    ]
  }
};

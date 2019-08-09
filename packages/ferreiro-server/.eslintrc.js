module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'jquery': true
    },
    'extends': [
        'eslint:recommended',
    ],
    'globals': {
        '__dirname': true,
        'process': true,
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'callback-return': [
            'error',
        ],
        'handle-callback-err': [
            'error',
        ],
        'no-sync': [
            'error',
        ],
    }
}
module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        "es6": true,
        "jquery": true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 9,
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            2
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
            'always'
        ]
    }
};
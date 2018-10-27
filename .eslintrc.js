module.exports = {
    'parser': 'babel-eslint',
    'extends': 'airbnb',
    'env': {
        'browser': true,
        'commonjs': true,
        "es6": true,
        "jquery": true
    },
    'rules': {
        'indent': [
            'error',
            2
        ],
        'consistent-return': 'off',
        'no-underscore-dangle': 'off',
        'import/first': 'off',
        'class-methods-use-this': 'off',
        'no-unused-vars': 'off'
    },
    'globals': {
        'describe': true,
        'expect': true,
        'test': true,
        'jest': true,
        'lodash': true
}
};
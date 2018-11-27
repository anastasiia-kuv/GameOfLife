module.exports = function () {
    return {
      module: {
        rules: [
          {
            test: /\.handlebars$/,
            exclude: /node_modules/,
            loader: 'raw-loader',
          },
        ],
      },
    };
  };
  
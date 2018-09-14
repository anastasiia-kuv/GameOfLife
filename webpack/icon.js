module.exports = function () {

  return {
    'module': {
      'rules': [
        {
          'test': /\.(png|svg|jpg|gif)$/,
          'loader': 'file-loader',
          'options': {
            'name': '/dist/img/[name].[ext]'
          }
        }
      ]
    }
  };

};

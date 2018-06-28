module.exports = function() {
    return {
        module: {
            rules: [
              {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '/build/fonts/[name].[ext]'
                },
              },
            ]
        }
    };
};
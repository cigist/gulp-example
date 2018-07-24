module.exports = {
    output: {
      filename: 'bunlde.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: [
              ['es2015'],
            ],
          },
        },
      ],
    },
  };
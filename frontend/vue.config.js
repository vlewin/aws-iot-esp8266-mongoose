module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.graphql$/,
          use: 'graphql-tag/loader'
        }
      ]
    }
  }
}

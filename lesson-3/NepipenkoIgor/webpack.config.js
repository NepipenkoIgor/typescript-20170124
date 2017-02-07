module.exports = {
  entry: './lesson-3/NepipenkoIgor/main.ts',
  output: {
    filename: './lesson-3/NepipenkoIgor/bundle.js'
  },
  module: {
    loaders: [
      {
        test:/\.tsx?$/,
        loader: 'awesome-typescript-loader?configFileName=./lesson-3/NepipenkoIgor/tsconfig.json'
      }
    ]
  }
}

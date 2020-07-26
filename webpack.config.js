const path = require('path')
const fs = require('fs')

const demos = fs.readdirSync(path.resolve(__dirname, "demos"))

const entry = {}
demos.forEach(app => {
  entry[app] = path.resolve(__dirname, "demos", app, 'index.ts')
})
module.exports = {
  entry,
  output: {
    filename: '[name].js'
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [{
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "static"),
    watchOptions: {
      poll: true
    },
    before: (app) => {
      app.get('/', (req, res) => {
        let content = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        const menuStr = demos.map(app => `<li><a class='menu-item' data-link='${app}'>${app}</a></li>`).join('\n')
        content = content.replace("__MENU__", menuStr)
        res.send(content)
      })
      demos.forEach(dir => {
        app.get('/' + dir, (req, res) => {
          let content = fs.readFileSync(path.resolve(__dirname, 'demos', dir, "index.html"), 'utf-8')
          content = content.replace("__APP__", dir)
          res.send(content)
        })
      })
    },
    compress: true,
    port: 3000
  }
}

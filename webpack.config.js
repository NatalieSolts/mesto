const path = require('path'); // подключаем path к конфигу вебпак. Она нужна, чтобы подключить к проекту новые методы для работы с путём.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //плагин, который будет каждый раз при сборке проекта удалять содержимое папки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // плагин объединяет много css-файлов в один

// module.exports — это синтаксис экспорта в Node.js
module.exports = {
  entry: { main: './src/pages/index.js' }, // указали первое место, куда заглянет webpack, — файл index.js в папке src
  output: {  // указали в какой файл будет собираться весь js и дали ему имя
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },
  mode: 'development', // добавили режим разработчика
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [
      // добавим объект правил для бабеля
      {
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: 'babel-loader', // при обработке этих файлов нужно использовать babel-loader
        exclude: '/node_modules/' // исключает папку node_modules, файлы в ней обрабатывать не нужно
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/, // регулярное выражение, которое ищет все файлы с такими расширениями
        type: 'asset/resource'
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          // добавьте объект options
          options: { importLoaders: 1 }
        },
          // Добавьте postcss-loader
        'postcss-loader']
      },
    ]
  },
  devtool: 'eval-source-map', //Чтобы в консоли всегда была правильная строка ошибки
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin() // подключение плагина для объединения файлов
  ]
}

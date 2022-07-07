const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js", //js 파일의 진입점
  output: {
    // 빌드를 했을때 번들파일 관련 속성
    filename: "bundle.js", // 파일이름 지정(번들들파일)
    path: path.resolve(__dirname, "./dist"), //번들파일이 생성될 경로, path.resolve 메소드를 사용해서 __dirname 을사용해 웹팩이 절대경로를 찾을 수 있도록 해줌
    clean: true, //이미 번들파일이 있다면 다 지우고 다시 만들어주는 속성
  },
  devtool: "source-map", //build 한 파일과 원본 파일을 연결시켜주는 파일
  mode: "development", //production 과 devlopment 모드가 있는데 html,css,js 파일을 난독화 기능을 제공하는지에 대한 차이
  devServer:{
    host:"localhost",
    port:8080,
    open:true,
    watchFiles: "index.html"
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: "keyboard", //title
      template: "./index.html", //lodash 파일 사용할 수 있게 해줌 -> 유틸성 메소드나 템플릿성 메소드를 제공해 주는 라이브러리
      inject: "body", //js 번들했을때 파일을 body 쪽에 넣어주겠다.
      favicon: "./favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], //css파일을 이런 로더를 사용해서 읽어들이도록 하겠다.
      },
    ],
  },

  optimization: {
    //압축해주는 친구들
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
  },
};

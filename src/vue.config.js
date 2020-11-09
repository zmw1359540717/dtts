// vue.config.js
module.exports = {
  // 打包的根路径 使用的是相对
  publicPath: './',
  outputDir: "dist", // 输出文件目录
  assetsDir: "static", //静态资源文件名称
  indexPath: "index.html",
  // 不要map文件 记录打包的信息
  productionSourceMap: false,
  // 意思是 和webpack的设置合并
  configureWebpack: {
    // 不要打包的文件
    externals: {
      // 左侧是 模块的名字
      // 右边的是 模块主动暴露出来的名字
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
    }
  },
  views: {

    css: {

      // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)

      // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象

      extract: true,

      // 是否开启 CSS source map？

      sourceMap: false,

      // 为预处理器的 loader 传递自定义选项。比如传递给

      // Css-loader 时，使用 `{ Css: { ... } }`。

      loaderOptions: {

        css: {

          // 这里的选项会传递给 css-loader

        },

        postcss: {

          // 这里的选项会传递给 postcss-loader

        }

      },

      // 为所有的 CSS 及其预处理文件开启 CSS Modules。

      // 这个选项不会影响 `*.vue` 文件。

      modules: false

    },

  }
}
// }
// module.exports = {
//   publicPath: "./", // 公共路径(必须有的)
//   outputDir: "dist", // 输出文件目录
// assetsDir: "static", //静态资源文件名称
//   lintOnSave: false,
//   productionSourceMap: false, //去除打包后js的map文件
//   devServer: { //启动项目在8080端口自动打开
//     open: true,
//     port: 8080,
//     proxy: null
//   },
//   //去掉console
//   configureWebpack: (config) => {
//     // 判断为生产模式下，因为开发模式我们是想保存console的
//     if (process.env.NODE_ENV === "production") {
//       config.optimization.minimizer.map((arg) => {
//         const option = arg.options.terserOptions.compress;
//         option.drop_console = true; // 打开开关
//         return arg;
//       });
//     }

//   },
// };




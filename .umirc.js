// ref: https://umijs.org/config/
const isProd = process.env.UMI_ENV === 'prod'
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      title: 'myapp',
      routes: {
        exclude: [],
      },
    }],
  ],
  routes: [{
    path: '/',
    component: 'layouts',
    routes: [
      {
        path: '/',
        component: 'home',
      },
      {
        path: '/article',
        component: 'article',
      },
      {
        path: '/categories',
        component: 'categories',
      },
      {
        path: '/category',
        component: 'category',
      },
      {
        path: '/about',
        component: 'about',
      },
    ],
  }],
  proxy: {
    '/api': {
      target: isProd ? 'http://api.littlebug.vip' : 'http://localhost:8081/',
      changeOrigin: true,
    },
    // '/api/': {
    //   target: 'https://easymock.verystar.cn/mock/5c248a445595980019189316/example',
    //   changeOrigin: true
    // },
  },
  chainWebpack(config, {webpack}) {
    if (isProd) {
      const AliossPlugin = require('webpack-oss')
      config.merge({
        plugin: {
          uploadToOss: {
            plugin: new AliossPlugin({
              accessKeyId: process.env.ACCESS_KEY_ID,
              accessKeySecret: process.env.ACCESS_KEY_SECRET,
              region: process.env.REGION,
              bucket: process.env.BUCKET,
              prefix: process.env.PREFIX,
              exclude: /.*\.html$/,
              enableLog: true,
              ignoreError: false,
              deleteMode: false,
              deleteAll: false,
            }),
          },
        },
      })
    }
  },
}

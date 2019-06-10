// ref: https://umijs.org/config/
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
        component: 'categories'
      },
      {
        path: '/article',
        component: 'article'
      },
      {
        path: '/categories',
        component: 'home'
      },
      {
        path: '/category',
        component: 'category'
      },
      {
        path: '/about',
        component: 'about'
      },
    ]
  }],
  proxy: {
    '/api': {
      target: 'http://api.littlebug.vip',
      changeOrigin: true
    }
  },
  publicPath: "http://littlebug.oss-cn-beijing.aliyuncs.com/react.blog.vip/",
  theme: {
    // 'primary-color': '#1DA57A',
    // 'link-color': '#1DA57A',
    // 'border-radius-base': '2px',
  },
}

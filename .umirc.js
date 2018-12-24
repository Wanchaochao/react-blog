
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
        component: 'home'
      },
      {
        path: '/article',
        component: 'article'
      },
      {
        path: '/categories',
        component: 'categories'
      },
      {
        path: '/category',
        component: 'category'
      },
    ]
  }],
  proxy: {
    '/api': {
      target: 'http://localhost:8081',
      changeOrigin: true
    }
  },
}

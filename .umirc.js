
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'myapp',
      dll: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
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
      // {
      //   path: '/helloworld',
      //   component: 'HelloWorld'
      // },
      // {
      //   path: '/dashboard',
      //   routes: [
      //     {path: '/dashboard/analysis', component: 'Dashboard/Analysis'},
      //     {path: '/dashboard/monitor', component: 'Dashboard/Monitor'},
      //     {path: '/dashboard/workplace', component: 'Dashboard/Workplace'},
      //   ]
      // },
      // { path: 'puzzlecards', component: './puzzlecards' },
      // { path: 'list', component: './list' },

    ]
  }],
  proxy: {
    '/example': {
      target: 'https://easymock.verystar.net/mock/5c185ca41bdca40022797054',
      changeOrigin: true
    }
  },
}

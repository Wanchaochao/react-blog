// ref: https://umijs.org/config/
console.log('process.env.UMI_ENV',process.env.UMI_ENV)
const AliossPlugin = require('webpack-oss')
export default {
  chainWebpack(config, {webpack}) {
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
            deleteAll: false
          })
        },
      },
    })
  },
}

## react-blog
个人博客 

[![stable](https://img.shields.io/badge/react--blog-active-brightgreen.svg)](https://github.com/wanchaochao/react-blog)
[![stable](https://img.shields.io/badge/api-golang-blue.svg)](https://github.com/wanchaochao/blog_api)
[![stable](https://img.shields.io/badge/umi-%5E2.3.5-blue.svg)](https://umijs.org/)
[![stable](https://img.shields.io/badge/ant--design-%5E3.0.0-blue.svg)](https://ant.design/index-cn)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/wanchaochao)

online project: 
<a href="www.littlebug.vip" target="_blank">Little Bug</a>

## INSTALL(安装)
```bash
# 安装umi(antd官方脚手架)
npm install umi -g
```

```bash
# 安装依赖
npm install // cnpm install
```


## 修改环境变量
```bash
cp .env.example .env
vim .env
publicPath = '静态资源路径' # 如果静态资源与打包后的index.html一起放在服务器上,不需要cdn、oss等加速可以忽略这一步
# aliyun oss 相关配置
ACCESS_KEY_ID = 'xxx'
ACCESS_KEY_SECRET = 'xxx'
REGION = 'xxx'
BUCKET = 'littlebug'
PREFIX = 'react.blog.vip'
```

## RUN
```bash
umi dev 
```

## package
```bash
npm run build
```

<p align="center">
	<a href="https:www.littlebug.vip">
		<img src="http://littlebug.oss-cn-beijing.aliyuncs.com/www.littlebug.vip/favicon.ico" width="75">
	</a>
</p>


## react-blog
个人博客
online project 
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

## CONFIG OPTIONS
```bash
# .umirc.js

proxy #代理配置

plugins #相关插件配置

routes #路由配置

theme # 主题配置

```

<p align="center">
	<a href="https:www.littlebug.vip">
		<img src="http://littlebug.oss-cn-beijing.aliyuncs.com/www.littlebug.vip/favicon.ico" width="75">
	</a>
</p>


import style from './style.less'
import React, {Component} from 'react'
import {Row, Col} from 'antd'
import Link from 'umi/link'

class About extends Component {


  componentDidMount() {

  }

  render() {

    return (
      <Row className="container">
        <Col span={24}>
          <div className="post-block page" >
            <header className="post-header">
              <h2 className="post-title" itemProp="name headline">关于博客</h2>
            </header>
            <div className="post-body">
              <h3>
                简介
              </h3>
              <p>维护人: <strong>Little Bug</strong></p>
              <p
                className="text-indent">现任职于上海某互联网公司后端开发工程师。以前读到一些好的文章,踩到一些让人扶额的坑...或是记在github上，或是记在有道云上，有一天忽然想到作为一个PHPer应该有自己的网站吧...</p>
              <h3 id=""><a href="#" className="headerlink" title="联系方式">联系方式</a></h3>
              <ul>
                <li><p>邮箱： <a href="#" target="_blank" rel="noopener">471937306@qq.com</a></p></li>
                <li><p>github：<code><a href="https://github.com/Wanchaochao">https://github.com/Wanchaochao</a></code>
                </p></li>
                <li>
                  <p>Wechat：
                    <img src="http://littlebug.oss-cn-beijing.aliyuncs.com/www.littlebug.vip/LittleBug.jpeg" width="250" height="300" alt="" />
                  </p>
                </li>
              </ul>
              <h3 id=""><a href="#" className="headerlink" title="愿景">愿景</a></h3>
              <p>勿忘初心</p>
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}

export default About

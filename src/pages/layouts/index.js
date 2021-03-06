/* eslint-disable react/jsx-no-target-blank */
import { Component } from 'react';
import { Card, List, Row, Col, Calendar, Layout, BackTop } from 'antd';
import Link from 'umi/link';
import moment from 'moment';
import 'moment/locale/zh-cn';
import style from './style.less';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import hljs from 'highlight.js'
import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function(code) {
    hljs.initHighlightingOnLoad()
    return hljs.highlightAuto(code).value;
  },
});


class BasicLayout extends Component {

  state = {
    menuList: [
      { name: '首页', link: '/' },
      { name: '分类', link: '/categories' },
      { name: '关于', link: '/about' },
    ],
    friendsBlogs: [
      { name: 'fifsky', link: 'https://fifsky.com/' },
      { name: 'JinXin', link: 'https://laravel.sh-jinger.com' },
    ],
    noopener: 'noopener',
  };

  UNSAFE_componentWillUpdate() {
    NProgress.start()
  }

  componentDidUpdate () {
    NProgress.done()
  }

  static onPanelChange() {
    // return console.log(1)
  }


  render() {
    moment.locale('zh-cn');
    // moment({ hour:15, minute:10 })
    // const startTime = moment()

    // startTime.startOf('hour').fromNow()
    return (
      <div id="app">
        <Layout style={{ overflow: 'hidden' }}>
          <div className={style.topMargin}/>
          <Row type="flex" justify="space-around" gutter={{ xs: 8, sm: 16, md: 24 }}>
            <Col span={3} offset={2} className="baseMargin">
              <Row>
                <Col span={24}>
                  <Card
                    title={<div>
                      <a href="https://github.com/wanchaochao" target="_blank">Little Bug</a>
                      <br/>
                      <p className={style.logoText}>努力让编程成为</p>
                      <br/>
                      <p className={style.logoText}>一门艺术</p>
                    </div>}
                    className={style.blogTitleCard}
                  >
                    <List
                      dataSource={this.state.menuList}
                      renderItem={item => (<List.Item>
                        <Link className="center" to={item.link}>{item.name}</Link>
                      </List.Item>)}
                    >
                    </List>
                  </Card>
                </Col>

                <Col span={24}>
                  <Card
                    className={style.blogBottomTitleCard}
                    title={<Row>
                      <Link to="/">
                        <Col span={12} className={style.cardRightBorder}>
                          <h5>分类</h5>
                          <p>8</p>
                        </Col>
                      </Link>
                      <Col span={12}>
                        <Link to="/categories">
                          <h5>日志</h5>
                          <p>25</p>
                        </Link>
                      </Col>
                    </Row>}
                  >
                    <div className="center">
                      <p>友情链接</p>
                      {this.state.friendsBlogs.map(item => {
                        return (<span className={style.friendLink} key={item.name}>
                        <a href={item.link} target="_blank">
                          {item.name}
                        </a>
                      </span>);
                      })}
                    </div>
                  </Card>
                </Col>
              </Row>

            </Col>
            <Col span={12}>
              {this.props.children}
            </Col>
            <Col span={6}>
              <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4, backgroundColor: '#fff' }}>
                <Calendar fullscreen={false} onPanelChange={BasicLayout.onPanelChange}/>
              </div>
            </Col>
          </Row>
        </Layout>
        <div>
          <BackTop>
            <div className={style.antBackTopInner}>UP</div>
          </BackTop>
        </div>
      </div>
    );
  }

}

export default BasicLayout;

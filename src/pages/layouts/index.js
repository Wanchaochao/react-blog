/* eslint-disable react/jsx-no-target-blank */
import { Component } from 'react'
import { Card, List, Row, Col, Calendar } from 'antd'
import Link from 'umi/link'
import moment from 'moment'
import 'moment/locale/zh-cn'
import style from './style.less'
//
// const {Header, Sider, Content, Footer} = Layout
// const {Item, SubMenu} = Menu


class BasicLayout extends Component {

  state = {
    menuList: [
      { name: '首页', link: '/' },
      { name: '分类', link: '/category' },
      { name: '关于', link: '/about' },
    ],
    friendsBlogs: [
      { name: '蔡旭东', link: 'https://fifsky.com/' },
      { name: '刘金星', link: 'https://laravel.sh-jinger.com' },
      { name: '李宇', link: 'http://liyu.91yiso.com' },
    ],
    noopener: 'noopener',
  };

  dateCellRender() {

  }

  monthCellRender() {

  }

  onPanelChange() {

  }

  onSelect() {

  }

  render() {
    moment.locale('zh-cn');
    // moment({ hour:15, minute:10 })
    const startTime = moment.momentToFormat
    console.log(startTime)
    // startTime.startOf('hour').fromNow()
    return (
      <div id="app">
        {/*顶部margin*/}
        <div className={style.topMargin}/>
        <Row type="flex" justify="space-around" gutter={{xs: 8, sm: 16, md: 24}}>
          <Col span={3} offset={4} className="baseMargin">
            <Row>
              <Col span={24}>
                <Card
                  title={<div>
                    <a href="https://github.com/wanchaochao" target="_blank">Little Bug</a>
                    <p className="logoText">努力让编程成为一门艺术</p>
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
                    <Link to="/articleList">
                      <Col span={12} className={style.cardRightBorder}>
                        <p>日志</p>
                        <p>8</p>
                      </Col>
                    </Link>
                    <Col span={12}>
                      <Link to="/categories">
                        <p>分类</p>
                        <p>10</p>
                      </Link>
                    </Col>
                  </Row>}
                >
                  <div className="center">
                    <p>友情链接</p>
                    {this.state.friendsBlogs.map(item => {
                      return (<span className={style.friendLink} key={item.name}>
                        <Link to={item.link}>
                          {item.name}
                        </Link>
                      </span>)
                    })}
                  </div>
                </Card>
              </Col>
            </Row>

          </Col>
          <Col span={10}>
            {this.props.children}
          </Col>
          <Col span={7}>
            <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
              <Calendar
                fullscreen={false}
                value={startTime}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }

}

export default BasicLayout;

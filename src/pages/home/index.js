import React, { Component } from 'react';
import { Row, Col, Icon, Button } from 'antd';
import Link from 'umi/link';
import style from './style.less';

class Home extends Component {

  state = {
    articles: [
      {
        id: '34',
        title: 'react dva model',
        author: 'little bug',
        category: 'javascript',
        category_id: '3',
        description: 'dva model 对象 基本属性',
        created_at: '2018-12-12'
      },
      {
        id: '14',
        title: 'react dva model',
        author: 'little bug',
        category: 'javascript',
        category_id: '3',
        description: 'dva model 对象 基本属性',
        created_at: '2018-12-12'
      },
      {
        id: '24',
        title: 'react dva model',
        author: 'little bug',
        category: 'javascript',
        category_id: '3',
        description: 'dva model 对象 基本属性',
        created_at: '2018-12-12'
      },

    ],
  };

  render() {
    return (<Row type="flex" justify="center">
      {this.state.articles.map(item => {
        return (
          <Col className={style.contentItem} span={24} key={item.id}>

            <h3 className="center">{item.title}</h3>
            <p className={`center ${style.contentTop}`}>
            <span
              className="center"
            >
              <Icon type="smile" theme="twoTone"/> {item.author} 创建于 {item.created_at} |
              <Icon
                theme="twoTone"
                type="tags"
              /> 分类
              <Link
                to={"/category?id=2" + item.category_id}><b>{item.category}</b></Link> </span>
            </p>
            <p className={style.contentDescription}>{item.description}</p>
            <Row className="center">
              <Button type="primary" htmlType="button"><Icon type="read"/><Link to={"article?id=" + item.id} className="white"> 阅读全文 </Link></Button>
            </Row>
          </Col>
        )
      })}
    </Row>);
  }
}

export default Home;

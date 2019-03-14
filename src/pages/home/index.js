import React, { Component } from 'react';
import { Row, Col, Icon, Button } from 'antd';
import Link from 'umi/link';
import style from './style.less';
import {connect} from 'dva'

@connect(({ home, loading }) => ({
  home,
  loading: loading.models.home,
}))
class Home extends Component {

  load = (page) => {
    this.props.dispatch({
      type: 'home/articleListApi',
      payload:{page}
    })
  }

  componentDidMount() {
    this.load(1)
  }

  render() {

    const {list} = this.props.home

    return (<Row type="flex" justify="center">
      {list.length > 0 && list.map(item => {
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

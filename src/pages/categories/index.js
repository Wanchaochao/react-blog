import globalLess from '../../global.less';
import style from './style.less'
import React, { Component } from 'react';
import { Card, Icon, Avatar, Tooltip, Row, Col } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import { sync } from '../../util';

const { Meta } = Card;

@connect(({ category, loading }) => ({
  category,
  loading: loading.models.category,
}))
class Categories extends Component {

  load = () => {
    return this.props.dispatch({
      type: 'category/getCategories',
    })
  }

  componentDidMount() {
    let self = this;
    sync(function* () {
      yield self.load()
    })
  }

  render() {
    const {category,loading} = this.props
    return (
      <Row>
        <Col span={24}>
        {category.list.map((item,index) => {
          return (<div className={(index + 2) % 3 === 0 ? style.midItemContainer : style.itemContainer}>
            <Card
              cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
              actions={[<Link to={"article?id=" + item.id }>
                <span>共{item.articles.length}篇文章 </span> <Icon type="read" style={{ color: 'green' }} className={globalLess['pull-right']}/>
              </Link>]}
              key={item.id}
              // hoverable={true}
              loading={loading}
              className={style.cateCard}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                title={item.title}
                description={<Tooltip title={item.description} placement="right"
                                      className={style.description}
                >
                  <span>{item.description}...</span>
                </Tooltip>}
              />
            </Card>
          </div>)
        })}
        </Col>
      </Row>
    );
  }
}

export default Categories;

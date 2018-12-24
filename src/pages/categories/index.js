import globalLess from '../../global.less';
import React, { Component } from 'react';
import { Card, Icon, Avatar } from 'antd';
import { connect } from 'dva';
import { sync } from '../../util';

const { Meta } = Card;

@connect(({ category, loading }) => ({
  category,
  loading: loading.models.category,
}))
class Categories extends Component {
  state = {}

  load = () => {
    console.log(111)
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
    return (
      <div>
        <Card
          style={{ width: 300 }}
          cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
          actions={[<div>
            <span>查看</span> <Icon type="read" style={{ color: 'green' }} className={globalLess['pull-right']}/>
          </div>]}
        >
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
            title="Card title"
            description="This is the description"
          />
        </Card>
      </div>
    );
  }
}

export default Categories;

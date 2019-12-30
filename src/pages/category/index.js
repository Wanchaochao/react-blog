import React, { Component } from 'react';
import { Row, List, Icon, Avatar } from 'antd';
import Link from 'umi/link';
import { sync } from '../../util';
import { connect } from 'dva';
import style from './style.less';


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }}/>
    {text}
  </span>
);


@connect(({ category, loading }) => ({
  category,
  loading: loading.models.article,
}))

class Index extends Component {

  load = (category_id) => {
    return this.props.dispatch({
      type: 'category/getArticles',
      payload: { category_id: parseInt(category_id, 10) },
    });
  };

  componentDidMount() {
    let self = this;
    sync(function* () {
      yield self.load(self.props.location.query.id);
    });
  }


  render() {
    const { list } = this.props.category;
    return (
      <div>
        <Row className="container">
          {list.length > 0 ? <List
            dataSource={list}
            itemLayout="vertical"
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[<IconText type="like-o" text={item.like}/>,
                  <IconText type="dislike-o" text={item.dislike}/>, <IconText type="message" text={item.comments_num} />]}
                className={style.customListItem}
              >
                <List.Item.Meta
                  // avatar={<Avatar src={item.avatar} />}
                  title={<Link to={'article?id=' + item.id}>{item.title}</Link>}
                  description={item.description}
                />
              </List.Item>
            )}
          >

          </List> : <div>
            暂无数据
          </div>}
        </Row>
      </div>
    );
  }
}

export default Index;

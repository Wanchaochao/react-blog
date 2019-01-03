import React, { Component } from 'react';
import { Row, List, Icon, Avatar } from 'antd';
import Link from 'umi/link'
import { sync } from '../../util';
import { connect } from 'dva';
import style from './style.less'


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

  load = (id) => {
    return this.props.dispatch({
      type: 'category/getArticles',
      payload: { id },
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
    console.log(list)
    return (
      <div>
        <Row className="container">
          {list.length > 0 ? <List
            dataSource={list}
            itemLayout="vertical"
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[<IconText type="like-o" text={item.praise_num} />, <IconText type="dislike-o" text={item.against_num} />, <IconText type="message" text="2" />]}
                className={style.customListItem}
              >
                <List.Item.Meta
                  // avatar={<Avatar src={item.avatar} />}
                  title={<Link to={'article?id=' + item.id}>{item.title}</Link>}
                  description={item.description}
                />
                {item.content}
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

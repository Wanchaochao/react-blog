import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import marked from 'marked';
import hljs from 'highlight.js';
import style from './style.less';
import 'highlight.js/styles/github.css';
import { connect } from 'dva';
import { sync } from '../../util';

@connect(({ article, loading }) => ({
  article,
  loading: loading.models.category,
}))

class Article extends Component {

  state = {
    articleContent: '## 1. 检测用户是否认证你可以通过验证用户是否为空来检测其是否认证：\n' +
      '\n' +
      '```php\n' +
      '@if(auth()->user())\n' +
      '    // 用户已认证\n' +
      '@endif\n' +
      '```',
  };

  load = (id) => {
    console.log('dispatch')
    return this.props.dispatch({
      type: 'article/articleApi',
      payload: { id },
    });
  };

  componentDidMount() {
    let self = this;
    sync(function* () {
      yield self.load(self.props.location.query.id);
    });


    hljs.initHighlightingOnLoad();
    let myMarked = marked.setOptions({
      highlight(code) {
        return hljs.highlightAuto(code).value;
      },
    });
    document.getElementById('content').innerHTML = myMarked(this.state.articleContent);
  }

  render() {
    const { article } = this.props.article;
    console.log(article);

    return (

      <Row className={style.articleContainer}>
        <Col span={24}>
          <h2 className={style.articleTitle}>title</h2>
          <p className={style.articleDescription}>
            <Icon type="home" theme="twoTone"/> Little Bug 发表于 <Icon theme="twoTone" type="schedule"/> 2018-12-17
            16:54:47 |
            分类 <Icon theme="twoTone" type="database"/> Javascript
          </p>
          <div className={style.articleContent} id="content">
          </div>
        </Col>
      </Row>
    );
  }
}

export default Article;

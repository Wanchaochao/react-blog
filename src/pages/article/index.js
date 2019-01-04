import React, { Component } from 'react';
import { Row, Col, Icon, Button, Comment, Tooltip, Input, Form, Avatar, List } from 'antd';
import marked from 'marked';
import hljs from 'highlight.js';
import style from './style.less';
import { connect } from 'dva';
import { sync } from '../../util';
import Link from 'umi/link';
import { get } from '../../util';
import '../../global.less';
import moment from 'moment';
import 'highlight.js/styles/dracula.css'

const TextArea = Input.TextArea;

const Editor = ({ onChange, onSubmit, loading, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} style={{ resize: 'none', maxLength: '50' }}/>

    </Form.Item>
    <Form.Item className="pull-right">
      <Button
        htmlType="submit"
        loading={loading}
        onClick={onSubmit}
        type="primary"
      >
        提交
      </Button>
    </Form.Item>
  </div>
);

const CommentList = ({ comments, loading, evaluate }) => (
  <List
    dataSource={comments}
    header={`${comments.length}条回复`}
    itemLayout="horizontal"
    loading={loading}
    renderItem={(item, index) => (
      <Comment
        key={item.id}
        content={item.content}
        author={item.nickname}
        datetime={<Tooltip title={item.created_at}>
          <span>{moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').fromNow()}</span>
        </Tooltip>}
        actions={[
          <span>
                <Tooltip title="Like">
                  <Icon
                    type="like"
                    theme="outlined"
                    onClick={() => evaluate(item.id, 1, 2, index)}
                  />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                  {item.praise_num}
                </span>
              </span>,
          <span>
                <Tooltip title="Dislike">
                  <Icon
                    type="dislike"
                    theme="outlined"
                    onClick={() => evaluate(item.id,1 ,2, index)}
                  />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                  {item.against_num}
                </span>
              </span>,
          <span onClick={() => this.reply(item.id)}>回复</span>,
        ]}
        avatar={(
          <Avatar
            src={item.avatar}
            alt={item.nickname}
          />
        )}
      >
      </Comment>
    )}
  />
);

@connect(({ article, loading }) => ({
  article,
  loading: loading.models.article,
}))


class Article extends Component {

  state = {
    commentContent: '',
    commentNickname: '匿名用户',
    replyContent: '', // 要回复评论的内容
    replyId: 0, // 要回复评论的id
    submitting: false,
    marked: marked
  };

  load = (id) => {
    return this.props.dispatch({
      type: 'article/articleApi',
      payload: { id },
    });
  };

  componentDidUpdate() {
    this.state.marked.setOptions({
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
  }

  componentDidMount() {
    let self = this;
    sync(function* () {
      yield self.load(self.props.location.query.id);
    });
  }

  handleChange = (e) => {
    this.setState({ commentContent: e.target.value });
  };
  handleSubmit = () => {
    const {commentContent, commentNickname} = this.props.state
    let me = this;
    sync(function* () {
      yield me.props.dispatch({
        type: 'article/commentApi',
        payload: { article_id: me.props.location.query.id, content: commentContent, nickname: commentNickname },
      });
    });
    this.setState({ commentContent: '' });
    this.setState({ commentNickname: '' });
  };

  evaluate = (id, praise, type, index) => {
    let me = this;
    sync(function* () {
      yield me.props.dispatch({
        type: 'article/evaluateApi',
        payload: { id, praise, type, index },
      });
    });
  };

  reply = () => {
    alert('reply');
  };

  render() {
    const { loading } = this.props;
    const { comments, content, prev, next } = this.props.article;
    const { commentContent } = this.state;
    return (
      <div>
        <Row className={style.articleContainer}>
          <Col span={24}>
            <h2 className={style.articleTitle}>title</h2>
            <p className={style.articleDescription}>
              <Icon type="home" theme="twoTone"/> Little Bug 发表于 <Icon theme="twoTone" type="schedule"/> 2018-12-17
              16:54:47 |
              分类 <Icon theme="twoTone" type="database"/> Javascript
            </p>
            <div className={style.articleContent} id="content"
                 dangerouslySetInnerHTML={{ __html: marked(content) }}>
            </div>
            <Row style={{ margin: '15px 0 0 0' }}>
              <Col span={5}>
                {get(prev, 'id', 0)
                  ? <Link to={'article?id=' + prev.id}>
                    <Button type="default" htmlType="button">
                      <Icon type="left"/>{prev.title}
                    </Button>
                  </Link>
                  : ''
                }
              </Col>
              <Col span={5} offset={14} style={{ textAlign: 'right' }}>
                {get(next, 'id', 0)
                  ? <Link to={'article?id=' + prev.id}>
                    <Button type="default" htmlType="button">
                      {next.title}<Icon type="right"/>
                    </Button>
                  </Link>
                  : ''
                }
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={style.articleContainer} style={{ margin: '15px 0 15px 0' }}>
          <Col>
            <div>
              <Comment
                avatar={(
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                  />
                )}
                content={(
                  <Editor
                    onChange={this.handleChange}
                    value={commentContent}
                    onSubmit={this.handleSubmit}
                    loading={loading}
                  />
                )}
              />
              {comments && <CommentList comments={comments} evaluate={this.evaluate} loading={loading}/>}
            </div>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Article;

import React, {Component} from 'react'
import {Row, Col, Icon, Button, Comment, Tooltip, Avatar, List, message} from 'antd'
import style from './style.less'
import {connect} from 'dva'
import {sync} from '../../util'
import {get} from '../../util'
import '../../global.less'
import moment from 'moment'
import 'highlight.js/styles/dracula.css'
import {Input, Form} from '../../components/form'

const CommentList = ({comments, loading, evaluate, className, reply}) => (
  <List
    className={className}
    dataSource={comments}
    header={comments.length > 0 ? `${comments.length}条回复` : ''}
    itemLayout="horizontal"
    loading={loading}
    locale={{emptyText: '暂无评论,快来抢沙发吧~'}}
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
                <span style={{paddingLeft: 8, cursor: 'auto'}}>
                  {item.praise_num}
                </span>
              </span>,
          <span>
                <Tooltip title="Dislike">
                  <Icon
                    type="dislike"
                    theme="outlined"
                    onClick={() => evaluate(item.id, 0, 2, index)}
                  />
                </Tooltip>
                <span style={{paddingLeft: 8, cursor: 'auto'}}>
                  {item.against_num}
                </span>
              </span>,
          <span onClick={() => reply(item.id)}>回复</span>,

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
)

@connect(({article, loading}) => ({
  article,
  loading: loading.models.article,
}))
class Article extends Component {

  load = (id) => {
    return this.props.dispatch({
      type: 'article/articleApi',
      payload: {id},
    })
  }

  componentDidMount() {
    let self = this
    sync(function* () {
      yield self.load(self.props.location.query.id)
    })
  }

  handleSubmit = () => {
    let me = this

    const {form} = this.props
    form.validateFields((err, values) => {
      console.log(values)
      if (err || values.content.length === 0) {
        return message.error('数据验证未通过')
      } else {
        sync(function* () {
          yield me.props.dispatch({
            type: 'article/commentApi',
            payload: {
              article_id: parseInt(me.props.location.query.id, 10),
              ...values,
            },
          })
        })
      }
    })

  }

  evaluate = (id, praise, type, index) => {
    let me = this
    sync(function* () {
      yield me.props.dispatch({
        type: 'article/evaluateApi',
        payload: {id, praise, type, index},
      })
    })
  }

  reply = () => {
    message.info('功能正在开发中~')
  }

  pageChange = (id) => {
    this.props.history.push('/article?id=' + id)
    let self = this
    sync(function* () {
      yield self.load(id)
    })
  }


  subString = (str, len, hasDot) => {
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex, "**").length;
    for (var i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(chineseRegex) != null) {
        newLength += 2;
      }
      else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }

    if (hasDot && strLength > len) {
      newStr += "...";
    }
    return newStr;
  }

  commentChange = () => {

  }

  render() {
    const {loading, form} = this.props
    const {comments, content, prev, next, title} = this.props.article
    return (
      <div>
        <Row className={style.articleContainer}>
          <Col span={24}>
            <h2 className={style.articleTitle}>{title}</h2>
            <p className={style.articleDescription}>
              <Icon type="home" theme="twoTone"/> Little Bug 发表于 <Icon theme="twoTone" type="schedule"/> 2018-12-17
              16:54:47 |
              分类 <Icon theme="twoTone" type="database"/> Javascript
            </p>
            <div className={style.articleContent} dangerouslySetInnerHTML={{__html: content}}>
            </div>
            <Row style={{margin: '15px 0 0 0'}}>
              <Col span={7}>
                {get(prev, 'id', 0)
                  ? <Button type="default" className={style.articleBtn} htmlType="button" onClick={() => this.pageChange(prev.id)}>
                    <Icon type="left"/> <span className={style.btnTitle}> {this.subString(prev.title,15,true)}</span>
                  </Button>
                  : ''
                }
              </Col>
              <Col span={7} offset={10} style={{textAlign: 'right'}}>
                {get(next, 'id', 0)
                  ? <Button type="default" className={style.articleBtn} htmlType="button" onClick={() => this.pageChange(next.id)}>
                    <span className={style.btnTitle}>{this.subString(next.title,15,true)} </span> <Icon type="right"/>
                  </Button>
                  : ''
                }
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={style.articleContainer}>

          <Col span={24}>
            <Form api={form} data={{comment: '', nickname: ''}} className={style.formContainer}
                  onSubmit={this.handleSubmit}>
              <Form.Item>
                <Input
                  id="content"
                  textarea
                  style={{resize: 'none'}}
                  max={30}
                  rows={4}
                  msg="写点什么吧~"
                />
              </Form.Item>
              <Form.Item className="pull-right" style={{marginLeft: '70%', width: '30%'}}>
                <Input
                  prefix={<Icon type="smile" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  id="nickname"
                  msg="昵称"
                  rules={['required', 'string', 'max=20']}
                  max={20}
                />
              </Form.Item>
              <Form.Item className="pull-right">
                <Button
                  htmlType="submit"
                  loading={loading}
                  type="primary"
                >
                  <Icon type="check"/>
                  提交
                </Button>
              </Form.Item>
            </Form>
            {comments && <CommentList comments={comments} evaluate={this.evaluate} loading={loading} reply={this.reply}
                                      className={style.commentsList}/>}
          </Col>
        </Row>
      </div>

    )
  }
}

export default Form.create()(Article)

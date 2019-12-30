import React, { Component } from 'react'
import style from './style.less'
import { Row} from 'antd';
import tui from './tui.jpg'

class Cxb extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Row className="container">
          <div className={style.tui}>
            <img src={tui} alt=""/>
          </div>
          <h1 className={style.cxb}>
            敲(li)麻🏆毛杂🐔小传染🐦斌
          </h1>
        </Row>
      </div>
    )
  }
}

export default Cxb

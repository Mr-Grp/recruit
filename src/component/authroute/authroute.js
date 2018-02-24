import React, { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'
@withRouter
@connect(null, {
  loadData
})
class AuthRoute extends Component {
  state = {  }

  componentDidMount() {
    /**
     * 是否登陆
     * url是否是 /login
     * 用户身份
     * 用户是否完善信息
     */
    const publicList = ['/login', '/regesiter']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null
    }
    axios.get('/user/info')
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.props.loadData(res.data.data)
          } else {
            this.props.history.push('/login')
          }
        }
      })
  }
  render() {
    return (
      <div>
      </div>
      );
  }
}

export default AuthRoute;
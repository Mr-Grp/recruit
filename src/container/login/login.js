import React, { Component } from 'react';
import { Button, List, InputItem, WingBlank, WhiteSpace } from "antd-mobile"
import Logo from '../../component/logo/logo'
import { login } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

@connect(state => state.user, {
  login
})

class Login extends Component {
  state = {
    user: '',
    pwd: ''
  }

  register = () => {
    this.props.history.push('/register')
  }

  handleLogin = () => {
    this.props.login(this.state)
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  render() {
    return (
      <div>
        { this.props.redirectTo
          ? <Redirect to={ this.props.redirectTo }></Redirect>
          : null }
        <Logo></Logo>
        <h2>login</h2>
        <WingBlank>
          <List>
            <InputItem onChange={ v => this.handleChange('user', v) }>用户</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={ v => this.handleChange('pwd', v) }>密码</InputItem>
          </List>
          <Button type="primary" onClick={ this.handleLogin }>登陆</Button>
          <WhiteSpace/>
          <Button onClick={ this.register } type="primary">注册</Button>
        </WingBlank>
      </div>
      );
  }
}

export default Login;

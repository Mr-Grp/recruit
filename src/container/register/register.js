import React, { Component } from 'react';
import Logo from '../../component/logo/logo'
import { Button, List, InputItem, WhiteSpace, Radio } from "antd-mobile"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'

const RadioItem = Radio.RadioItem

@connect(state => state.user, {
  register
})

class Register extends Component {
  state = {
    type: 'genius',
    user: '',
    pwd: '',
    repeatepwd: ''
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  handleRegister = () => {
    this.props.register(this.state)
  }
  
  render() {
    return (
      <div>
        { this.props.redirectTo
          ? <Redirect to={ this.props.redirectTo }></Redirect>
          : null }
        <Logo></Logo>
        <List>
          <InputItem onChange={ v => this.handleChange('user', v) }>用户</InputItem>
          <WhiteSpace/>
          <InputItem type="password" onChange={ v => this.handleChange('pwd', v) }>密码</InputItem>
          <WhiteSpace/>
          <InputItem type="password" onChange={ v => this.handleChange('repeatepwd', v) }>确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem checked={ this.state.type === 'genius' } onClick={ () => this.handleChange('type', 'genius') }>牛人</RadioItem>
          <RadioItem checked={ this.state.type === 'boss' } onClick={ () => this.handleChange('type', 'boss') }>BOSS</RadioItem>
          <WhiteSpace/>
          <Button type="primary" onClick={ this.handleRegister }>注册</Button>
        </List>
      </div>
      );
  }
}

export default Register;
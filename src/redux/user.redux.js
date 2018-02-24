import axios from 'axios'
import { Toast } from "antd-mobile"
import { getRedirectPath } from '../utils'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const initState = {
  isAtch: '',
  msg: '',
  user: '',
  type: '',
  redirectTo: ''
}

export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload
      }
    case ERROR_MSG:
      return {
        ...state,
        isAuth: false,
        msg: action.msg
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
      }
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
  }
}

export function loadData(userinfo) {
  return {
    type: LOAD_DATA,
    payload: userinfo
  }
}

export function login({user, pwd}) {
  if (!user || !pwd) {
    Toast.fail('用户名密码必须输入', 2)
    return errorMsg('用户名密码必须输入')
  }
  return dispatch => {
    axios
      .post('/user/login', {
        user,
        pwd
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          Toast.success('登陆成功', 2)
          dispatch(loginSuccess(res.data.data))
        } else {
          Toast.fail(res.data.msg, 2)
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function register({user, pwd, repeatepwd, type}) {
  if (!user || !pwd || !type) {
    Toast.fail('用户名密码必须输入', 2)
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatepwd) {
    Toast.fail('密码和确认密码不同', 2)
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    axios
      .post('/user/register', {
        user,
        pwd,
        type
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          Toast.success('注册成功', 2)
          dispatch(registerSuccess(res.data.data))
        } else {
          Toast.fail(res.data.msg, 2)
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}



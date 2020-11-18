/*
 * @Author: fightWz
 * @Date: 2020-05-14 14:26:26
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-08 16:26:21
 * @FilePath: \langya-admin\src\request\http.js
 * @Description: axios网络请求封装
 */
// 引入axios模块
import axios from 'axios'
// 引入qs模块，用来序列化post类型的数据
import QS from 'qs' // 如果post请求头为 "application/json; charset=utf-8" 可去掉不使用
// 从vuex拿到token
import store from '@/store'
import * as Cookies from 'js-cookie'
import NProgress from 'nprogress'
import { Message } from 'view-design'
NProgress.configure({ showSpinner: false })
// 设置axios的默认请求地址,根据不同环境配置接口地址
if (location.hostname === 'localhost' || location.hostname.indexOf('192') !== -1) {
  axios.defaults.baseURL = process.env.VUE_APP_BASEURL_LOC
} else if (location.hostname.indexOf('bims.langyaapp') !== -1) {
  axios.defaults.baseURL = process.env.VUE_APP_BASEURL_PROD
} else if (location.hostname.indexOf('bims.release') !== -1) {
  axios.defaults.baseURL = process.env.VUE_APP_BASEURL_DEV
} else if (location.hostname.indexOf('47.98.162.11') !== -1) {
  axios.defaults.baseURL = 'http://47.98.162.11:5053'
}
// 设置请求超时
axios.defaults.timeout = 5000

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = Cookies.get('token')
    token && (config.headers.Authorization = token)
    NProgress.start()
    // config.data = JSON.stringify(config.data);
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      // 成功后默认返回code=200
      NProgress.done()
      switch (response.data.code) {
        case 10000: // 请求成功
          return Promise.resolve(response)
        case 20001: // token失效
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          store.dispatch('clearStorage')
          return Promise.reject(response)
        default:
          return Promise.reject(response)
      }
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 500:
        // Message.error({
        //   content: '服务器异常'
        // });
          error.response.data['code'] = 500
          break
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          error.response.data.code = 401
          // Message.error({
          //   content: '登陆已过期，请重新登陆'
          // });
          // 清除token
          // removeToken();
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
          //   router.replace({
          //     path: '/login',
          //     query: {
          //       redirect: router.currentRoute.fullPath
          //     }
          //   });
          }, 1000)
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          error.response.data.code = 403
          // Message.error({
          //   content: error.response.data.message
          // });
          break
        // 404请求不存在 网络请求不存在
        case 404:
          error.response.data.code = 404
          break
        default:
      }
    }
    NProgress.done()
    Message.error(error.response.data.message)
    return Promise.reject(error.response)
  }
)

export default async(url = '', type = 'GET', data = {}, postType = '') => {
  const httpType = type.toUpperCase()
  // post请求头的设置
  axios.defaults.headers.post['Content-Type'] =
    postType === 'form'
      ? 'application/x-www-form-urlencoded; charset=UTF-8'
      : '' // "multipart/form-data"; // application/x-www-form-urlencoded; charset=UTF-8
  return new Promise(async(resolve, reject) => {
    try {
      let promise
      switch (httpType) {
        case 'GET':
          promise = await get(url, data)
          break
        case 'POST':
          promise = await post(url, data, postType)
          break
        case 'PUT':
          promise = await put(url, data, postType)
          break
        case 'DELETE':
          promise = await del(url, data)
          break
        case 'UPLOAD':
          promise = await upload(url, data)
          break
        default:
          break
      }
      resolve(promise.data)
    } catch (error) {
      reject(error.data)
    }
  })
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url, params, postType) {
  const data = QS.stringify(params)
  return new Promise((resolve, reject) => {
    axios
      .post(url, postType === 'form' ? data : params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function put(url, params, postType) {
  const data = QS.stringify(params)
  return new Promise((resolve, reject) => {
    axios
      .put(url, postType === 'form' ? data : params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function del(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, { data: params })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function upload(url, params) {
  const param = new FormData()
  for (const key in params) {
    if (Array.isArray(params[key])) {
      params[key].forEach(v => {
        param.append(key + '[]', v)
      })
    } else {
      param.append(key, params[key])
    }
  }
  return new Promise((resolve, reject) => {
    axios
      .post(url, param)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

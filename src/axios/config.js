
import axios from 'axios'
import qs from 'qs'
import { Message  } from 'element-ui';
import router from '../router';
// let headers = {
//   'uid': sessionStorage.getItem('uid'),
//   'token': sessionStorage.getItem('access_token'),
//   'Content-Type': 'application/x-www-form-urlencoded'
// }

let baseURL = 'http://47.115.1.205:21004/'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
// axios.defaults.baseURL = 'http://iot.hzcando.com/api/idm/v1/'

  /** 拦截器 */
// 请求拦截器 POST传参序列化
axios.interceptors.request.use((config) => {
  config.headers.token = sessionStorage.getItem('token');
  // if (config.method === 'post') {
  //   config.data = qs.stringify(config.data)
  // }
  return config
}, (error) => {
  // 请求错误时做些事
  return Promise.reject(error)
})

// 响应拦截器 返回状态判断
axios.interceptors.response.use((res) => {
  return res
}, (error) => {
  console.error('出错了，进入了error')
    Message({
        message: '系统开小差!请稍后重试',
        duration: 2000,
        type:'error'
    })
  // 404等问题可以在这里处理
  return Promise.reject(error)
})

// 公共方法
export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function checkStatus (response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 ||
    response.status === 400)) {
      if (!response.data.err){
          return response.data
      }else {
          Message({
              message: response.data.err,
              duration: 2000,
              type:'error'
          })
          return response.data
      }

  }else if (response.status === 401) {
      router.push('/login')
  }else {
      Message({
          message: '系统开小差！~请稍后重试',
          duration: 2000,
          type:'error'
      })
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

export default {
  // getAddressJson () {
  //   return fetch('/demo/get', { addressId: 1 })
  // }

  getAccessToken (url, params) {  //  post
    return axios({
      method: 'post',
        url: baseURL + url,
      params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }

    )
  },
    //formData
  post (url, params) {  //  post
    return axios({
      method: 'post',
        url: baseURL + url,
        data: params,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    )
  },
    //requestBody
  postBody(url, params) {  //  post
      return axios({
          method: 'post',
          url: baseURL + url,
          data: params,
          headers: {
              'Content-Type': 'application/json',
          },
      }).then(
          (response) => {
              return checkStatus(response)
          }
      )
  },
  get (url, params) {  // get
    return axios({
      method: 'get',
        url: baseURL + url,
      params, // get 请求时带的参数
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    )
  },
    postQueryAndBody(url,params,datas){
        return axios.post(baseURL + url,params,{ params:datas }).then(
            (response) => {
            return checkStatus(response)
        })
    },
  Downloadapi(){
    return 'http://iot.hzcando.com:10004'
  },
}

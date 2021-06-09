let baseURL
let socketURL
let domain = document.domain
if (domain == 'localhost' || domain == '192.168.1.102') { // 开发环境
    // baseURL = 'http://192.168.1.201:9101/api'
    // socketURL = 'http://192.168.1.201:6658'
  }

export default {
    // 请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
  url: '/user',
    // 请求方法同上
  method: 'POST', // default
  baseURL: baseURL,
  socketURL: socketURL,
    // 设置超时时间
  timeout: 50000,
  data: {},
    // 返回数据类型
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
}

import axios from 'axios'
import config from './config'
// import router from './router'

//将URL地址前面相同的一段封装
const $http = axios.create({
    baseURL: config.baseURL,
    // 返回数据类型
    responseType: 'json',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }
})
$http.interceptors.response.use((response:any)=>{
    let errorText = response.data.message || ''
    if (errorText.length && !response.data.status) {
        // vue.$Message.destroy()
        // vue.$Message.error(errorText)
    }
    
    let domain = document.domain
    return response
})
/** 所有请求列表完成后才进行消失loader */
let axiosList:any = []
function pushAxios (bgColor:any, hideLoader:any) {
  axiosList.push(1)
  if (hideLoader) {
    return
  }
  showCover(bgColor)
}
function popAxios () {
    axiosList.pop()
    if (!axiosList.length) {
        hideCover()
    }
}
function showCover (bgColor:any) {
    let cover:any = document.getElementById('cover')
    cover.style.display = 'block'
    if (bgColor) {
        cover.style.background = bgColor
    }
}
function hideCover () {
    let cover:any = document.getElementById('cover')
    cover.style.display = 'none'
    cover.style.background = 'transparent'
}

/** 通用处理 */
axios.defaults.withCredentials = false

function getErrorText (res:any) {
  return res.statusText
}

// 下载excel文件
export const downLoadFileByBlob =  (res:any) =>{
    const blob = new Blob([res.data], { type: res.headers['content-type'] })
    let desprsitions = res.headers['content-disposition'].split(';')
    let filename = ''
    for (let i = 0; i < desprsitions.length; i++) {
      if (desprsitions[i].indexOf('filename') > -1) {
        let filenames = desprsitions[i].split('=')
        if (filenames.length > 1) {
          filename = decodeURI(filenames[1].trim())
        }
      }
    }
    if ('download' in document.createElement('a')) {
      const downloadElement = document.createElement('a')
      let href = ''
      if (window.URL) href = window.URL.createObjectURL(blob)
      else href = window.webkitURL.createObjectURL(blob)
      downloadElement.href = href
      downloadElement.download = filename
      document.body.appendChild(downloadElement)
      downloadElement.click()
      if (window.URL) window.URL.revokeObjectURL(href)
      else window.webkitURL.revokeObjectURL(href)
      document.body.removeChild(downloadElement)
    } else {
      navigator.msSaveBlob(blob, filename)
    }
  }

// 封装get
export const get = (url:any, params:any) => {
    params = params || {};
    return new Promise((resolve:any, reject:any) => {
        $http.get(url, {
            params,
        }).then((res:any) => {
            if (res.data.status === 0) {
                resolve(res.data)
            } else {
                alert(res.data.msg)
            }
        }).catch((err:any) => {
        })
    })
}
// 封装文件上传
export const formData = (url:any, params:any,hideLoader?:any) => {
    pushAxios(null, hideLoader)
    params = params || {};
    return new Promise((resolve:any, reject:any) => {
        $http.post(url,
            params,
            {
                headers:{
                    'X-Token':localStorage.getItem("loginToken") || '',
                    'Content-Type':'multipart/form-data'
                }
            }
        ).then((res:any) => {
            popAxios()
            if(res.data.code == 'login'){
                // vue.$Message.destroy();
                // vue.$Message.warning('该账号已在其他地点登录');
                return
            }
            resolve(res.data)
        }).catch((error:any) => {
            popAxios()
            // vue.$Message.destroy();
            let response = error.response;
            let errorText = getErrorText(response)
            if (response.status === 490 || response.status === 590 || response.status === 502) {
                // vue.$Message.warning('抱歉，服务器打了个盹儿~请稍后再试！');
            } else if (response.status === 404) {
                return
            } else {
                // vue.$Message.warning(errorText);
            }
            resolve(error.data)
        })
    })
}

//封装post
export const post = (url:any, params:any,responseType?:any,hideLoader?:any) => {
    pushAxios(null, hideLoader)
    params = params || {};
    return new Promise((resolve:any, reject:any) => {
        $http.post(url,
            params,
            {
                headers:{
                    'X-Token':localStorage.getItem("loginToken") || '',
                    'Content-Type':'application/json'
                },
                responseType:responseType?responseType:'json'
            }
        ).then((res:any) => {
            popAxios()
            if(res.data.code == 'login'){
                // vue.$Message.destroy();
                // vue.$Message.warning('该账号已在其他地点登录');
                return
            }
            if(responseType){
                resolve(res)//导出接口专用
            }else{
                resolve(res.data)
            }
        }).catch((error:any) => {
            popAxios()
            // vue.$Message.destroy();
            let response = error.response;
            let errorText = getErrorText(response)
            if (response.status === 490 || response.status === 590 || response.status === 502) {
                // vue.$Message.warning('抱歉，服务器打了个盹儿~请稍后再试！');
            } else if (response.status === 404) {
                return
            } else {
                // vue.$Message.warning(errorText);
            }
            resolve(error.data)
        })
    })
}
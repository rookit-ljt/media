import axios from 'axios'

export default function ajax(url = '', params = {}, type= 'GET') {
    console.log("此处的params"+JSON.stringify(params))

    let promise;
    // 1. 返回promise对象
    return new Promise((resolve, reject)=>{
        // 1.1 判断请求的方式
        if('GET' === type.toUpperCase()){
            // 1.2 拼接字符串
            let paramsStr = '';
            Object.keys(params).forEach(key =>{
                paramsStr += key + '=' + params[key] + '&'
            });
            // 1.3 过滤最后的&
            if(paramsStr !== ''){
                paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'));
            }
            // 1.4 拼接完整的路径
            url += '?' + paramsStr;
            // 1.5 发起get请求
            promise = axios.get(url);
        }else if('POST' === type.toUpperCase()){
            promise = axios.post(url, params);
        }
        // 1.6 返回结果
        promise.then((response)=>{
            console.log(response)
            resolve(response.data);
            if (response.data.resultCode==='000004'){
                alert('账号异地登陆，请重新登陆')
                // window.history.back()
                window.location.href = '/';
            }
            else if (response.data.resultCode==='000003'){
                alert('请重新登陆')//token失效
                window.history.back()
                window.location.href = '/';
            }else if (response.data.resultCode==='110018'){
                alert('您还未登陆，请重新登陆')//没有token
                // window.history.back()
                window.location.href = '/';
            }
        }).catch(error=>{
            reject(error);
        })
    })
}

import axios from 'axios';

axios.defaults.baseURL = 'http:baidu.com'
//http request 拦截器
axios.interceptors.request.use(
    config => {
        config.headers = {
            //'Content-Type':'application/x-www-form-urlencoded'
            'Content-Type': 'multipart/form-data'
        }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    return response
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                return Promise.resolve({status:err.response.status,message:'错误请求'});
                break;
            case 401:
                return Promise.resolve({status:err.response.status,message:'未授权，请重新登录'});
                break;
            case 403:
                return Promise.resolve({status:err.response.status,message:'拒绝访问'});
                break;
            case 404:
                return Promise.resolve({status:err.response.status,message:'请求错误,未找到该资源'});
                break;
            case 405:
                return Promise.resolve({status:err.response.status,message:'请求方法未允许'});
                break;
            case 408:
                return Promise.resolve({status:err.response.status,message:'请求超时'});
                break;
            case 500:
                return Promise.resolve({status:err.response.status,message:'服务器端出错'});
                break;
            case 501:
                return Promise.resolve({status:err.response.status,message:'网络未实现'});
                break;
            case 502:
                return Promise.resolve({status:err.response.status,message:'网络错误'});
                break;
            case 503:
                return Promise.resolve({status:err.response.status,message:'服务不可用'});
                break;
            case 504:
                return Promise.resolve({status:err.response.status,message:'网络超时'});
                break;
            case 505:
                return Promise.resolve({status:err.response.status,message:'http版本不支持该请求'});
                break;
            default:
                return Promise.resolve({status:err.response.status,message:'未知错误'});
                break;
        }
    } else {
        return Promise.resolve({status:err.response.status,message:'连接到服务器失败'});
    }
    return Promise.resolve(err.response)
})


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
            .then(response => {
                if(response.data) resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装上传图片upload的方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function upload(url,data = {}){
    let instance = axios.create();
    return new Promise((resolve,reject) => {
        instance.post(url,data)
            .then(response => {
                if(response.data) resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,qs.stringify(data))
            .then(response => {
                if(response.data) resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data)
            .then(response => {
                if(response.data) resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                if(response.data) resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.delete(url,data)
            .then(response => {
                if(response.data) resolve(response.data);
            },err => {
                reject(err)
            })
    })
}


/**
 * 封装异步Ajax请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export async function syncAjax (url = '',method = 'get',data = {},callbackr = ()=>{},callbackw = ()=>{}) {
    try {
        let response = await axios({ method, url, data })
        callbackr && callbackr(response)
        return Promise.resolve(response)
    } catch (err) {
        callbackw && callbackw(err)
        return Promise.reject(err)
    }
}

const ajax = {
    fetch,post,patch,put,del,syncAjax,upload
}

export default ajax
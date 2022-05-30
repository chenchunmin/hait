import { Toast } from 'vant'
import axios from "axios"
import store from "../store/index.js"
import router from "../router/index.js"
// 创建请求实例
const instance = axios.create({
    baseURL: 'http://api.w0824.com/api/',
    timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 将token通过请求头(token) 带给服务器进行验证
    if (store.state.token) {
        config.headers['token'] = store.state.token
    }
    config.headers['If-Modified-Since'] = 0; //设置请求头，告诉服务端不要缓存，服务器会返回最新的资源
    Toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...',
        forbidClick: true,
    });
    // 在发送请求之前做些什么
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    Toast.clear()
    let { status, message } = response.data;
    // 对后台接口返回状态码统一管理
    if (status === 40001) {
        Toast(message)
        router.push('/login')
        return
    }
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    Toast.clear()
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;
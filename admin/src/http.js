import axios from 'axios';
import Vue from 'vue'
import router from './router';

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
});

http.interceptors.request.use(req => {
    if(localStorage.token){
        req.headers.Authorization = 'Bearer ' + localStorage.token;
    }
    return req;
}, err => {
    return Promise.reject(err); 
})


// 设置响应拦截器，配合app里设置的status的状态，将错误的信息拦截，然后进行处理，最后返回给前端。
http.interceptors.response.use(res => {
    return res;
}, err => {
    const message = err.response.data.message;
    const status = err.response.status;
    if (status === 422) { 
        Vue.prototype.$message.error(message);
    }else if(status === 401){
        router.push('/login');
        Vue.prototype.$message.error(message);
    }
    return Promise.reject(err);
})

export default http;
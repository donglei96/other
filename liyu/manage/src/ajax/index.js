import axios from 'axios'
import { HOST } from './env.js'

const instance = axios.create({
    baseURL: HOST,
    timeout: 50000,
})

let formDataArr = ['/uploadstudentinfomation', '/uploadstudentscore']
// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = 'bearer ' + token
        }
        if (formDataArr.indexOf(config.url) !== -1) {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        return response
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)

export { instance }

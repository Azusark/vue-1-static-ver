//进行axios二次封装：使用请求与响应拦截器
import { Switch } from '@element-plus/icons-vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import.meta.env.VITE_APP_BASE_API; //获取环境变量
import useuseStore from '@/store/modules/user';

//第一步:利用axios对象的create方法，去创建axios实例（其他的配置：基础路径，超时的时间）
let request = axios.create({
    //基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API,//基础路径上会携带/api
    timeout: 5000, //超时时间
});
//第二步:请求拦截器
request.interceptors.request.use((config) => {
    //获取用户相关仓库：获取仓库内部token，登陆成功以后携带给服务器
    let userStore = useuseStore();
    if (userStore.token) {
        config.headers.token = userStore.token; //给请求头添加token
        //config配置对象,headers属性请求头，经常给服务器端携带公共参数
        //返回配置对象
    }
    return config;
});

//第三步:响应拦截器
request.interceptors.response.use((response) => {
    //响应成功的回调函数
    //简化数据
    return response.data; //返回响应体数据
}, (error) => {
    //失败回调：处理http网络错误的
    //定义一个变量：存储网络错误信息
    let message = '';
    //http状态码
    if (error.response) {
        let status = error.response.status; //获取错误状态码
        switch (status) {
            case 401:
                message = 'token过期';
                break;
            case 403:
                message = '没有权限';
                break;
            case 404:
                message = '请求地址不存在';
                break;
            case 500:
                message = '服务器内部错误';
                break;
            default:
                message = '网络错误';
                break;
        }
    } else {
        message = '网络连接失败';
    }
    //提示错误信息
    ElMessage({
        type: 'error',
        message
    });

    return Promise.reject(error); //返回一个失败的Promise对象
})

//对外暴露
export default request;
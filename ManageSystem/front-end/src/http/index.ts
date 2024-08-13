import axios from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
    baseURL:"http://127.0.0.1:3007",
    timeout:3000,
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }
});

instance.interceptors.request.use(function(config){
    // 在发送请求之前做些什么
    // 判断是否存在token,如果存在将每个页面header添加token
    if (localStorage.getItem("token")) {
        // console.log(localStorage.getItem("token"))
        config.headers.Authorization = localStorage.getItem("token");
      }
      return config;
  }, function(error) {
      // 对请求错误做些什么
      return Promise.reject(error);
});


instance.interceptors.response.use(function(response){
    if(response.data.status || response.data.message){
        if(response.data.status == 0){
        // if(response.data.message){
            //  ElMessage({
            //    message: response.data.message,
            //    type: 'success',
            //  })
            // }
        }else{
            // ElMessage.error(response.data.message)
        }
    }

    return response.data
},function(error){
    if(error && error.response){
        switch(error.response.status){
            case 400:
        ElMessage.error('请求错误')
        break
      case 401:
        ElMessage.error('未授权，请登录')
        break
      case 403:
        ElMessage.error('拒绝访问')
        break
      case 404:
        ElMessage.error(`请求地址出错: ${error.response.config.url}`)
        break
      case 408:
        ElMessage.error('请求超时')
        break
      case 500:
        ElMessage.error('服务器内部错误')
        break
      case 501:
        ElMessage.error('服务未实现')
        break
      case 502:
        ElMessage.error('网关错误')
        break
      case 503:
        ElMessage.error('服务不可用')
        break
      case 504:
        ElMessage.error('网关超时')
        break
      case 505:
        ElMessage.error('HTTP版本不受支持')
        break
      default:
        }
    };

    return Promise.reject(error);
});

export default instance;
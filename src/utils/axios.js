import axios from 'axios'
import { ElMessage, ElNotification } from 'element-plus'
import { getToken, removeToken } from '@/utils/auth.js'
// import { removeToken, getToken } from '@/utils/auth'
import { toast } from '@/utils/tips.js'

const service = axios.create({
  baseURL: '/api'
})
function logout () {
  removeToken('admin-token')
  toast('Token过期,请重新登录!!!', 'error')
  location.reload()
}

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 往header头自动添加token
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = token
    }
    // console.log("axios",config);
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    let apiData = ''
    if (response.status == '204') {
      apiData = { code: 0 }
    } else {
      apiData = response.data
    }
    console.log('响应拦截器1111', response.data)
    // 二进制数据则直接返回
    const responseType = response.request.responseType
    if (responseType === 'blob' || responseType === 'arraybuffer')
      return apiData
    // 判断code
    const code = Number(apiData.code)
    // console.log('code', code)
    // console.log(typeof code)

    // console.log("响应拦截器",apiData);
    switch (code) {
      case 0:
        return apiData
      case -1:
        return apiData
      case 9999:
        return apiData
      case 401:
        console.log('hahahah')
        return logout()
      // return
      case 500:
        return logout()
    }
    if (code === undefined && response.status !== '204') {
      ElMessage.error('非本系统接口')
      return Promise.reject(new Error('非本系统接口'))
    }
    // console.log("ststus",response.status);
    // console.log(response);
  },
  function (error) {
    // 对响应错误做点什么
    console.log(error)

    ElNotification({
      message: error.response.data.message || '请求失败',
      type: 'error',
      duration: 3000
    })
    return Promise.reject(error)
  }
)

// service.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       if (error.response && (error.response.status === 401 || error.response.status === 500)) {
//         // Token 过期，显示提示并重定向到登录页面
//         removeToken('admin-token');
//         const router = useRouter();
//         router.push('/login');
//         toast('Token过期,请重新登录!!!', 'error');
//       }
//       return Promise.reject(error);
//     }
//   );

export default service

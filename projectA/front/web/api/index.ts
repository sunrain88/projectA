import httpRequest from './httpRequest'

// 账号登录模块
// 注册
export function register(data: any) {
  return httpRequest.post('/register', data)
}
// 登录
export function login_password(data: any) {
  return httpRequest.post('/login/password', data)
}
// 获取个人信息
export function get_user_info(params?: any) {
  return httpRequest.get('/user/get_user_info', params)
}
// 上传图片
export function upload_image(data: any) {
  return httpRequest.post('/upload/image', data)
}
// 获取图片
export function get_image(params: any) {
  return httpRequest.get('/file/get_image', params)
}

// sql注入
export function get_sql_data(data: any) {
  return httpRequest.post('/quick/sql', data)
}

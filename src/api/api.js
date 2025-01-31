import axios from '@/utils/axios.js'

//用户登录
export function login (username, password) {
  return axios.post('/user/login', {
    username,
    password
  })
}

//用户信息
export function user_info () {
  return axios.get('/user/userinfo')
}

//修改密码
export function change_password (data) {
  return axios.post('/user/change_pwd', data)
}

//用户列表
export function get_userlist (page) {
  return axios.get(`/user/userlist?page=` + page)
}

//增加用户
export function add_user (data) {
  return axios.post('/user/register', data)
}

//修改用户
export function update_user (id, data) {
  return axios.post('/user/update_user' + id, data)
}

//删除用户
export function delete_user (id) {
  return axios.post('/user/delete_user', { id: id })
}

// 获取一级菜单项
export function get_folderlist () {
  return axios.get('/folder')
}

// 删除一级菜单
export function del_folder (id) {
  return axios.delete('/folder/' + id)
}

// 添加一级菜单
export function add_folder (data) {
  return axios.post('/folder', data)
}

// 获取二级菜单
export function get_secondarymenu (folder_id) {
  return axios.get('/route', { params: { folder: folder_id } })
}

// 删除二级菜单
export function del_secondarymenu (id) {
  return axios.delete('/route/' + id)
}

// 添加二级菜单
export function add_secondarymenu (data) {
  return axios.post('/route', data)
}

// 获取权限列表
export function get_permission (router_id) {
  return axios.get('/permission', { params: { router: router_id } })
}

// 添加权限
export function add_permission (data) {
  return axios.post('/permission', data)
}

// 删除权限
export function del_permisssion (id) {
  return axios.delete('/permission/' + id)
}

// 获取角色列表
export function get_role () {
  return axios.get('/role')
}

// 添加角色
export function add_role (data) {
  return axios.post('/role', data)
}

// 删除角色
export function del_role (id) {
  return axios.delete('/role/' + id)
}

// 获取权限值
export function get_permissionValue () {
  return axios.get('/permission/total')
}

// 获取角色拥有的权限
export function get_permisssionList (id) {
  return axios.get(`/role/${id}/permission`)
}

// 更新权限列表
export function update_permissionList (id, data) {
  return axios.post(`/role/${id}/update/permission`, data)
}

// 获取用户列表
export function get_AdminList (params) {
  return axios.get('/admin', { params: params })
}

// 添加用户
export function add_User (data) {
  return axios.post('/admin', data)
}

// // 查询姓名的实现
// export function search_username (params) {
//   return axios.get('/admin', params)
// }

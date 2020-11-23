/*
 * @Author: fightWz
 * @Date: 2020-04-27 15:24:07
 * @LastEditors: fightWz
 * @LastEditTime: 2020-05-22 10:16:06
 * @Description: api
 */
import mock from '@/assets/mock/mock'
// 登录
export const login = () => mock.resSuccess()
// 退出登录
export const logOut = () => mock.resSuccess()

// 获取用户菜单
export const getAdminMenu = () => mock.menus()
// 修改密码
export const editPassword = () => mock.resSuccess()

// 表格数据
export const tableData = () => mock.tableData()

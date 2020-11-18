/*
 * @Author: fightWz
 * @Date: 2020-04-27 14:49:34
 * @LastEditors: fightWz
 * @LastEditTime: 2020-10-21 10:05:37
 * @Description: 头部注释
 */
const getters = {
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  un_read_count: state => state.user.un_read_count,
  keepAlive: state => state.user.keepAlive,
  permision: state => state.menu.permision
}
export default getters

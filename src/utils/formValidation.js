/*
 * @Author: fightWz
 * @Date: 2020-04-30 14:47:05
 * @LastEditors: wuzhen
 * @LastEditTime: 2020-05-06 09:47:32
 * @Description: 表单常用验证
 */
export default {
  // 手机号
  isMobile(value) {
    return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(
      value
    )
  },
  // 邮箱
  isEmail(value) {
    return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
      value
    )
  },
  // 金额，只允许保留两位小数
  isAmount(value) {
    return /^([0-9]*[.]?[0-9])[0-9]{0,1}$/.test(value)
  },
  // 数字
  isNum(value) {
    return /^[0-9]+$/.test(value)
  },
  // 中文
  isChinese(value) {
    const reg = /.*[\u4e00-\u9fa5]+.*$/
    return (
      value !== '' &&
      reg.test(value) &&
      !this.isSpecial(value) &&
      !this.isEmoji(value)
    )
  },
  // 特殊字符
  isSpecial(value) {
    const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im
    const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
    if (regEn.test(value) || regCn.test(value)) {
      return true
    }
    return false
  },
  // 表情
  isEmoji(value) {
    return /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g.test(value)
  },
  // 日期 2019-10-12
  isDate(value) {
    const reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/
    return reg.test(value)
  },
  // 链接url地址
  isUrl(value) {
    return /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value)
  },
  // 相等
  isSame(value1, value2) {
    return value1 === value2
  },
  // 车牌号
  isCarNo(value) {
    // 新能源车牌
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
    // 旧车牌
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
    if (value.length === 7) {
      return creg.test(value)
    } else if (value.length === 8) {
      return xreg.test(value)
    }
    return false
  }
}

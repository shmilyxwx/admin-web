/*
 * @Author: fightWz
 * @Date: 2020-05-22 10:41:56
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-03 10:07:18
 * @FilePath: \langya-admin\src\utils\index.js
 * @Description: 扩展方法
 */

class Common {
  // 序列化树label和value
  converTreeLabel(array, label, value) {
    const res = []
    array.forEach(v => {
      const Obj = {}
      Obj.label = v[label]
      Obj.value = v[value]
      if (v.children) {
        Obj.children = this.converTreeLabel(v.children, label, value)
      }
      res.push(Obj)
    })
    return res
  }
  // 序列化树label和value(对象转数组对象)
  converLabel(obj) {
    const res = []
    for (const key in obj) {
      res.push({ value: key, label: obj[key] })
    }
    return res
  }
  // 删除为空的字段
  compactObj(obj) {
    for (var i in obj) {
      if (typeof obj[i] === 'object') {
        this.compactObj(obj[i])
      }
      if (this.isEmpty(obj[i])) {
        delete obj[i]
      }
    }
    return obj
  }
  isEmpty(foo) {
    if (typeof foo === 'object') {
      for (var i in foo) {
        return false
      }
      return true
    } else {
      return foo === '' || foo === null || foo === undefined || foo === false || foo === '111'
    }
  }
  // 数据平铺
  treeToArray(tree) {
    const arr = []
    const expanded = datas => {
      if (datas && datas.length > 0) {
        datas.forEach(e => {
          arr.push(e)
          expanded(e.children)
        })
      }
    }
    expanded(tree)
    return arr
  }
  // 判断文件类型
  formatFileType(fileName) {
    const arry = fileName.split('.')
    // .后缀
    const type = arry[arry.length - 1]
    if (type === 'png' || type === 'jpg' || type === 'gif') {
      return 'image'
    } else if (type === 'xls' || type === 'xlsx') {
      return 'xls'
    } else if (type === 'docx' || type === 'doc') {
      return 'doc'
    } else if (type === 'txt' || type === 'rtf') {
      return 'txt'
    } else if (type === 'ppt' || type === 'pptx') {
      return 'ppt'
    } else if (type === 'ppt' || type === 'pptx') {
      return 'ppt'
    } else if (type === 'pdf') {
      return 'pdf'
    } else if (type === 'html') {
      return 'html'
    } else if (type === 'zip') {
      return 'zip'
    } else if (type === 'rar') {
      return 'rar'
    } else if (type === 'mp3') {
      return 'music'
    } else if (type === 'mp4' || type === 'wmv') {
      return 'video'
    }
    return 'default'
  }
}

export default new Common()

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
  delFalseKey(formatData) {
    const data = {}
    for (const key in formatData) {
      if ((formatData[key] !== '-111') && (formatData[key] !== 0 && formatData[key])) {
        if ((formatData[key] && typeof formatData[key] !== 'object') || (typeof formatData[key] === 'object' && formatData[key][0])) {
          data[key] = formatData[key]
        }
      }
    }
    return data
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

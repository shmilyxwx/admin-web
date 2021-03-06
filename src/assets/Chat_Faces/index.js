/*
 * @Author: fightWz
 * @Date: 2020-07-04 16:57:22
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-04 16:57:36
 * @FilePath: \view-ly-admin\src\assets\Chat_Faces\index.js
 * @Description: emoj
 */
const emojNames = [
  '白眼',
  '抱抱',
  '抱拳',
  '鄙视',
  '闭嘴',
  '擦汗',
  '呲牙',
  '大哭',
  '大笑',
  '担心',
  '蛋糕',
  '灯笼',
  '地雷',
  '掉泪',
  '发',
  '发呆',
  '发怒',
  '奋斗',
  '福字',
  '尴尬',
  '干杯',
  '勾手指',
  '鼓掌',
  '害羞',
  '红包',
  '花',
  '花枯萎',
  '花心',
  '滑稽',
  '怀疑',
  '坏笑',
  '奸笑',
  '惊恐',
  '惊讶',
  '噘嘴',
  '可爱',
  '哭了',
  '酷',
  '快哭了',
  '困',
  '困了',
  '蜡烛',
  '篮球',
  '雷人',
  '礼物',
  '流汗',
  '卖萌',
  '难过',
  '破涕为笑',
  '强大',
  '敲打',
  '亲亲',
  '轻松',
  '拳头',
  '扔肥皂',
  '弱爆了',
  '胜利',
  '帅',
  '睡觉',
  '太阳',
  '调皮',
  '偷笑',
  '吐',
  '挖鼻',
  '微笑',
  '委屈',
  '吻',
  '握手',
  '捂脸',
  '小黄鸡',
  '心',
  '心碎',
  '一根手指',
  '疑问',
  '右哼哼',
  '月亮',
  '再见',
  '咒骂',
  '皱眉',
  '猪头',
  '抓狂',
  '足球',
  '左哼哼',
  'ok'
];

const emojs = emojNames.map( v=> {
  return {
    name: v,
    filename: `/static/Chat_Faces/[${v}].imageset/[${v}]@2x.png`
  };
});
export default emojs;
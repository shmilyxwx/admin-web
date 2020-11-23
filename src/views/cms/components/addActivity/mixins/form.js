/*
 * @Author: fightWz
 * @Date: 2020-05-07 09:05:59
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-13 13:06:35
 * @Description: 头部注释
 */
import { getUserEnum } from '@/request/api';

export default {
  data() {
    return {
      formObj: {
        sectionData: 2,
        section: '一整天',
        expect: []
      },
      formData: {
      },
      location: {
        location: '',
        lng: '',
        lat: '',
        city: ''
      },
      resource: [], // 上传资源
      expectTree: [] // 期望对象下拉
    };
  },
  computed: {
    formProps() {
      return [
        {
          forms: [
            {
              key: 'theme',
              label: '活动主题',
              span: 22,
              type: 'select',
              options: {
                data: [
                  {
                    value: '健康运动',
                    label: '健康运动'
                  },
                  {
                    value: '看电影',
                    label: '看电影'
                  },
                  {
                    value: '去唱歌',
                    label: '去唱歌'
                  },
                  {
                    value: '玩游戏',
                    label: '玩游戏'
                  },
                  {
                    value: '吃吃喝喝',
                    label: '吃吃喝喝'
                  },
                  {
                    value: '陪我购物',
                    label: '陪我购物'
                  },
                  {
                    value: '夜蒲聚会',
                    label: '夜蒲聚会'
                  },
                  {
                    value: '连麦聊天',
                    label: '连麦聊天'
                  }
                ]
              },
              rules: [
                {
                  required: true,
                  message: '请选择活动主题',
                  trigger: 'change'
                }
              ]
            },
            {
              key: 'location',
              label: '发布位置',
              slot: true,
              rules: {
                required: true,
                message: '请选择发布位置',
                trigger: 'change',
                type: 'object'
              }
            },
            {
              key: 'sectionData',
              label: '活动日期',
              type: 'radio',
              span: 22,
              options: {
                data: [{
                  label: '具体时间',
                  value: 1
                }, {
                  label: '随时',
                  value: 2
                }]
              },
              rules: [{
                required: true,
                message: '请选择活动日期',
                trigger: 'change',
                type: 'number'
              },
              {
                validator: (rule, value, callback) => {
                  this.showModule = value === 1;
                  callback();
                }
              }]
            },
            {
              key: 'activity_date',
              label: '活动时间',
              slot: true,
              rules: [{
                required: true,
                message: '请选择活动时间',
                trigger: 'change'
              }
              ]
            },
            {
              key: 'section',
              label: '活动时间',
              type: 'radio',
              span: 22,
              options: {
                data: [{
                  label: '白天',
                  value: '白天'
                }, {
                  label: '晚上',
                  value: '晚上'
                }, {
                  label: '通宵',
                  value: '通宵'
                }, {
                  label: '一整天',
                  value: '一整天'
                }]
              },
              rules: {
                required: true,
                message: '请选择活动时间',
                trigger: 'change'
              }
            },
            {
              key: 'expect',
              label: '期望对象',
              slot: true,
              rules: {
                required: true,
                trigger: 'change',
                type: 'array',
                validator: (rule, value, callback) => {
                  if (value.length > 0 && value.length <= 3) {
                    return callback();
                  }
                  if (!value.length) {
                    return callback(new Error('请选择期望对象'));
                  }
                  if (value.length > 3) {
                    return callback(new Error('最多只能选择3个'));
                  }
                }
              }
            },
            {
              key: 'expect',
              label: '期望对象',
              type: 'checkbox',
              span: 22,
              options: {
                data: this.expectTree
              },
              rules: {
                required: true,
                trigger: 'change',
                type: 'array',
                validator: (rule, value, callback) => {
                  if (value.length > 0 && value.length <= 3) {
                    return callback();
                  }
                  if (!value.length) {
                    return callback(new Error('请选择期望对象'));
                  }
                  if (value.length > 3) {
                    return callback(new Error('最多只能选择3个'));
                  }
                }
              }
            },
            {
              key: 'resource',
              label: '图片',
              slot: true
              // rules: {
              //   required: true,
              //   message: '请选择图片',
              //   trigger: 'change',
              //   type: 'array'
              // }
            },
            {
              key: 'instruction',
              label: '补充说明',
              type: 'textarea',
              maxlength: 50,
              showLimit: true
            }
          ]
        }
      ];
    }
  },
  created() {
    this.getUserEnumData();
  },
  methods: {
    async getUserEnumData() {
      const res = await getUserEnum();
      this.expectTree = res.data.expects.map(v => {
        return {
          label: v.expect,
          value: String(v.id)
        };
      });
    }
  }
};
/*
 * @Author: fightWz
 * @Date: 2020-07-07 10:06:23
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-07 10:11:39
 * @FilePath: \view-ly-admin\src\views\cms\trends\mixins\upload.js
 * @Description:上传
 */
import { getToken } from '@/request/api';
export default {
  data() {
    return {
      uploadData: {
        token: '',
        key: ''
      },
      accept: '',
      fileSize: 6,
      format: ['jpg','jpeg','png']
    };
  },
  methods: {
    // 上传前
    async handleUpload(file) {
      if (this.fileSize < this.resource.length) {
        this.$Message.warning(`最多只能上传${this.fileSize}个文件`);
        return false;
      }
      try {
        const res = await getToken({ drive: 'public' });
        this.uploadData.token = res.data;
        this.uploadData.key =
          'park/' +
          file.type +
          '/' +
          Math.ceil(Math.random() * Math.pow(10, 15)) +
          '.' +
          file.type.split('/')[1];
      } catch (error) {
        this.$Message.error(error.msg || '操作失败');
      }
    },
    // 上传成功
    handleSuccess(res) {
      if (res.key.includes('image')) {
        this.accept = 'image/*';
        this.resourceType = 1;
      }

      this.resource.push({
        type: this.resourceType,
        path: res.key
      });
      this.changeValue('resource', this.resource);
    },
    // 移除文件
    handleRemove(file, fileList) {
      if (!fileList.length) {
        this.accept = '';
        this.fileSize = 6;
      }
      this.resource = fileList.map(v => {
        return {
          type: this.resourceType,
          path: v.response.key
        };
      });
      this.changeValue('resource', this.resource);
    },
    // 上传格式不正确
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc:
          '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      });
    }
  }
};
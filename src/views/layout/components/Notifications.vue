<!--
 * @Author: fightWz
 * @Date: 2020-08-24 16:05:57
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-15 17:34:28
 * @FilePath: \langya-admin\src\views\dashboard\components\Notifications.vue
 * @Description:
-->
<template>
  <div class="notifications">
    <Dropdown @on-click="handleClick">
      <div class="notifications-icon">
        <Badge :count="un_read_count">
          <Icon type="md-notifications-outline" size="26" />
        </Badge>
      </div>
      <DropdownMenu v-if="un_read_count" slot="list">
        <DropdownItem name="chatManagement-messageReply">留言回复：未读消息数量<span style="color:#ed4014">{{ un_read_count }}条</span></DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { getUnreadCount } from '@/request/api'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['un_read_count'])
  },
  created() {
    this.getUnreadCountData()
  },
  methods: {
    ...mapMutations(['set_un_read_count']),
    async getUnreadCountData() {
      const res = await getUnreadCount()
      const count = res.data
      this.set_un_read_count(count)
    },
    handleClick(name) {
      if (this.$route.name === name) {
        return
      }
      this.$router.push({
        name: name
      })
    }
  }
}
</script>
<style lang="less" scoped>
.notifications {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  line-height: 35px;
  padding-top: 5px;
  &-icon {
    cursor: pointer;
  }
}
</style>

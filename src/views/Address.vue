<template>
  <div class="address-container">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
    <van-empty v-if="list.length === 0" description="请添加地址" />
  </div>
</template>

<script>
import { fetchGetaddress } from "../api/index.js";
export default {
  data() {
    return {
      // 默认选中的id
      chosenAddressId: 0,
      list: [],
    };
  },
  created() {
    this._fetchGetaddress();
  },
  methods: {
    onAdd() {
      this.$router.push("/addaddress");
    },
    onEdit(item, index) {
      // 把当前点击地址信息当做路由参数传递到地址编辑页面,用于回显
      this.$router.push("/editaddress/" + JSON.stringify(item));
    },
    // 获取用户地址
    async _fetchGetaddress() {
      let user_id = this.$store.state.userInfo.id;
      let result = await fetchGetaddress(user_id);
      // 判断地址
      if (result.length === 0) {
        return;
      }
      if (result.length === 1) {
        this.chosenAddressId = result[0].id;
        result.map((item) => {
          item.isDefault = result[0].id;
        });
      }
      result = result.map((item) => {
        if (item.isDefault === 1) {
          this.chosenAddressId = item.id;
        }
        let { province, city, country, addressDetail } = item;
        item.address = `${province},${city},${country},${addressDetail},`;
        return item;
      });
      this.list = result;
    },
  },
};
</script>

<style>
</style>
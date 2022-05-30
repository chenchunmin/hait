<template>
  <van-address-edit
    :area-list="areaList"
    show-postal
    show-set-default
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @change-area="changArea"
    @save="onSave"
  />
</template>

<script>
import { areaList } from "@vant/area-data";
import { fetchAddaddress } from "../api/index.js";
export default {
  data() {
    return {
      areaList,
      areaCode: "",
    };
  },
  methods: {
    async onSave(addInfo) {
      // 接口参数
      let user_id = this.$store.state.userInfo.id;
      addInfo.isDefault = addInfo.isDefault ? 1 : 0;
      addInfo.country = addInfo.county;
      let data = {
        ...addInfo,
        areaCode: this.areaCode,
      };
      // 调用接口
      let { status, message } = await fetchAddaddress(user_id, data);
      this.$toast(message);
      if (status === 0) {
        this.$router.back("/address");
      }
    },
    changArea(area) {
      this.areaCode = area.map((item) => item.code).join("-");
    },
  },
};
</script>

<style>
</style>
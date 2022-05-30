<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-delete
      :address-info="AddressInfo"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @delete="onDelete"
      @save="onSave"
      @change-default="changeDefault"
      @change-area="changArea"
    />
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { fetchDeladdress, fetchUpdateaddress } from "../api/index.js";
export default {
  data() {
    return {
      areaList,
      fromAddress: JSON.parse(this.$route.params.addressInfo),
      isDefault: "", // 记录当前是否默认地址
      areaCode: "", // 记录当前地址省市区编码
    };
  },
  created() {
    this.areaCode = this.fromAddress.areaCode;
    this.isDefault = this.fromAddress.isDefault;
  },
  computed: {
    AddressInfo() {
      // 默认地址改成对应的格式才会回显
      let address = JSON.parse(this.$route.params.addressInfo);
      address.isDefault = address.isDefault == 1 ? true : false;
      // 完整地址
      address.areaCode = address.areaCode.split("-")[2];
      return address;
    },
  },
  methods: {
    // 删除地址
    async onDelete(item) {
      let { id } = item;
      let { status, message } = await fetchDeladdress(id);
      this.$toast(message);
      if (status === 0) {
        this.$router.back();
      }
    },
    // 更新地址
    async onSave(addressInfo) {
      // 获取接口参数
      let isDefault = this.isDefault ? 1 : 0;
      let areaCode = this.areaCode;
      let country = addressInfo.county;
      let data = {
        ...addressInfo,
        isDefault,
        areaCode,
        country,
      };
      // 发送异步请求
      let { status, message } = await fetchUpdateaddress(addressInfo.id, data);
      this.$toast(message);
      if (status === 0) {
        this.$router.back();
      }
    },
    // 切换省市区
    changArea(data) {
      this.areaCode = data.map((item) => item.code).join("-");
    },
    // 切换默认地址
    changeDefault(bool) {
      this.isDefault = bool;
    },
  },
};
</script>

<style>
</style>
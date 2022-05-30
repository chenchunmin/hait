<template>
  <div class="cartContainer">
    <!-- 收获地址 -->
    <div v-if="carData.length" class="addressWrap">
      <div v-if="hasAddress" class="address">
        <van-icon name="location-o" />
        <div class="info">
          <div>
            {{ address.name }} - {{ address.tel }} 邮编:{{ address.postalCode }}
          </div>
          <div>
            {{ address.province }} {{ address.city }} {{ address.country }}
            {{ address.addressDetail }}
          </div>
        </div>
      </div>

      <!-- 无设置收货地址 -->
      <van-button v-else block plain type="info" @click="$router.push('/addaddress')">添加地址</van-button>
    </div>

    <!-- 购物车列表 -->
    <div class="cartlist">
      <div class="item" v-for="(item, index) in cartGoodslist" :key="item.id">
        <van-checkbox @click="checkBox(item.id, $store.getters.getGoodsStatus[item.id])"
          v-model="$store.getters.getGoodsStatus[item.id]" checked-color="#ee0a24" />
        <div class="imgWrap">
          <img :src="item.thumb_path" />
        </div>
        <div class="info">
          <div class="title ellipsis_l1">{{ item.title }}</div>
          <div class="area">
            <div class="price">&yen;{{ item.sell_price }}</div>
            <van-stepper @change="numberChange($event, item.id)" v-model="$store.getters.getGoodsNumber[item.id]"
              theme="round" button-size="22" disable-input />
            <van-button type="danger" @click="delShopCar(item.id, index)">删除</van-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 没有购物车商品时展示 -->
    <div class="emptyCar" v-if="carData.length === 0">
      <van-empty class="custom-image" :image="emptyCar" description="你的购物车空空如也">
        <van-button @click="$router.replace('/home/index')" type="danger" class="bottom-button">去首页</van-button>
      </van-empty>
    </div>

    <!-- 提交订单 -->
    <van-submit-bar :disabled="isDisabled" :price="$store.getters.getGoodsTotalPrice * 100" button-text="提交订单"
      @submit="onSubmit">
      <template #default>
        共计{{ $store.getters.getGoodsTotalNumber }}件
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { fetchShopCar, fetchGetaddress, fetchCommit } from "../api/index.js";
import emptyCar from "../assets/images/car.png";
import { getOrder } from "..//utils/tools.js";
export default {
  data() {
    return {
      carData: this.$store.state.carData,
      cartGoodslist: [],
      ids: this.$store.getters.getCarId,
      address: {},
      hasAddress: false,
      emptyCar,
    };
  },
  computed: {
    isDisabled() {
      if (
        this.hasAddress === false ||
        this.carData.length === 0 ||
        !this.$store.getters.getSelectedId
      ) {
        return true;
      }
      return false;
    },
  },
  async created() {
    this._fetchShopCar();
    if (this.ids.length == 0) {
      return;
    }
    let user_id = this.$store.state.userInfo.id;
    let result = await fetchGetaddress(user_id);
    if (result.length === 0) {
      this.hasAddress = false;
      this.$dialog({
        message: "请完善地址",
      });
      return;
    } else {
      this.hasAddress = true;
    }
    if (result.length === 1) {
      this.address = result[0];
      return;
    }
    // 多个地址取出默认地址作为收货地址
    let defaultAddress = result.find((item) => item.isDefault == 1);
    if (defaultAddress) {
      this.address = defaultAddress;
    } else {
      this.address = result[0];
    }
  },
  methods: {
    async _fetchShopCar() {
      if (this.ids.length == 0) {
        return;
      }
      let { message } = await fetchShopCar(this.ids);
      this.cartGoodslist = message;
    },
    delShopCar(id, index) {
      this.cartGoodslist.splice(index, 1);
      this.$store.commit("delCar", id);
      this.$router.go(0);
    },
    // 切换选中不选中
    checkBox(id, selected) {
      this.$store.commit("GoodsSelect", { id, selected });
    },
    // 设置购物车购买数量
    numberChange(number, id) {
      this.$store.commit("GoodsNumber", { number, id });
    },
    // 提交订单
    async onSubmit() {
      // 准备订单参数
      let orderData = {
        user_id: this.$store.state.userInfo.id,
        order_id: getOrder(),
        address_id: this.address.id,
        goods_ids: this.$store.getters.getSelectedId,
        number: this.$store.getters.getGoodsTotalNumber,
        total_price: this.$store.getters.getGoodsTotalPrice,
      };
      // 调用api,提交订单
      // 开启loading
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "提交订单中",
      });
      let { status, message } = await fetchCommit(orderData);
      // 关闭loading
      this.$toast.clear();
      if (status !== 0) {
        // 提交订单异常
        this.$toast("网络异常,稍后再试");
        return;
      }
      // 提交订单成功后,清空购物车,跳转订单列表
      this.$store.commit("clearCar");
      this.$router.replace("/order");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common.scss";

.cartContainer {
  height: 100vh;
  background-color: #eae7e75e;
  padding: 6px;

  .addressWrap {
    .address {
      display: flex;
      align-items: center;
      padding: 4px 10px;
      background-color: #fff;
      border-radius: 6px;
      margin: 6px 0;

      .van-icon {
        margin-right: 20px;
        color: red;
        font-size: 20px;
      }
    }
  }

  .van-submit-bar {
    bottom: 50px;
  }

  .cartlist {
    .item {
      display: flex;
      padding: 4px;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border-radius: 6px;
      margin: 10px 0;

      .imgWrap {
        flex-basis: 50px;
        height: 50px;
        padding: 4px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .title {
          width: 70vw;
        }

        .area {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .price {
            color: #ff424a;
          }
        }
      }
    }
  }
}
</style>
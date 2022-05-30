<template>
  <div class="goodsDetail-container">
    <div class="card" @click="previewImg">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in thumb" :key="index">
          <img :src="item.src" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="card">
      <div class="price">
        <span class="sell_price">&yen;{{ goodsInfo.sell_price }}</span>
        <span class="market_price">&yen;{{ goodsInfo.market_price }}</span>
      </div>
      <div class="title ellipsis_l2">{{ goodsInfo.title }}</div>
    </div>

    <div class="card">
      <van-divider content-position="left">介绍</van-divider>
      <div class="content" v-html="goodsInfo.content"></div>
    </div>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.getters.getCarNumber"
        @click="$router.push('/home/shopcar')" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addcar(true)" />
      <van-goods-action-button type="danger" text="立即购买" @click="buy(false)" />
    </van-goods-action>

    <!-- 商品sku -->
    <van-sku v-model="showSku" :sku="sku" :goods="goods" :goods-id="goodsInfo.id" :hide-stock="sku.hide_stock"
      :reset-stepper-on-hide="true" :show-add-cart-btn="ShowAddCartBtn" @add-cart="addCart" @buy-clicked="buyClicked">
      <template #sku-messages>
        <div class="card">
          <van-divider>文字</van-divider>
          <div>商品货号：{{ goodsInfo.goods_no }}</div>
          <div>库存：{{ goodsInfo.stock_quantity }}件</div>
          <div>
            上架时间：{{ goodsInfo.add_time | dateFormat("YYYY-MM-DD") }}
          </div>
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script>
// 商品详情
import { fetchGoodsLunbo, fetchGoodsInfo } from "../api/index.js";
import { ImagePreview } from "vant";
export default {
  props: ["id"],
  data() {
    return {
      ShowAddCartBtn: false,
      thumb: [],
      goodsInfo: {},
      showSku: false,
      sku: {
        // 数据结构见下方文档
        tree: [],
        price: "0.00", // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 数据结构见下方文档
        picture: "",
      },
    };
  },
  created() {
    this._fetchGoodsLunbo();
    this._fetchGoodsInfo();
  },
  methods: {
    async _fetchGoodsLunbo() {
      let { message } = await fetchGoodsLunbo(this.id);
      this.thumb = message;
      this.goods.picture = this.thumb[0].src;
    },
    async _fetchGoodsInfo() {
      let { message } = await fetchGoodsInfo(this.id);
      let reg = /\width=['"]\w+['"]\s+/i;
      message.content = message.content.replace(reg, "");
      this.goodsInfo = message;
      this.sku.price = this.goodsInfo.sell_price;
      this.sku.stock_num = this.goodsInfo.stock_quantity;
    },
    previewImg() {
      ImagePreview({
        images: this.thumb.map((item) => item.src),
        startPosition: 1,
      });
    },
    // 加入购物车
    addcar(bool) {
      this.showSku = true;
      this.ShowAddCartBtn = bool;
    },
    // 立即购买
    buy(bool) {
      this.showSku = true;
      this.ShowAddCartBtn = bool;
    },
    // sku 加入商品到购物车(依旧在当前页面)
    addCart(skuData) {
      // 将商品添加到购物车(vuex)
      // 构造购物车商品数据
      let { goodsId, selectedNum } = skuData;
      let item = {
        id: goodsId,
        number: selectedNum,
        price: this.goodsInfo.sell_price,
        selected: true,
      };
      this.$store.commit("addGoodsToCar", item);
      this.showSku = false;
      this.$notify({
        color: "#666",
        background: "#fff",
        message: "加入购物车成功",
      });
    },
    // sku 立即购买(跳转到购物车页面)
    buyClicked(skuData) {
      // 将商品添加到购物车（vuex）
      // 构造购物车商品数据结构
      let { goodsId, selectedNum } = skuData;
      let price = this.goodsInfo.sell_price;
      let item = { id: goodsId, number: selectedNum, price: price, selected: true }
      // 提交一个mutation
      this.$store.commit('addGoodsToCar', item)
      this.showSku = false;
      this.$router.push("/home/shopcar");
    },
  },
};
</script>

<style lang="scss">
.goodsDetail-container {
  height: 100vh;
  padding: 2px;
  background: #efedee;

  .card {
    border-radius: 6px;
    margin-bottom: 8px;
    background-color: #fff;
    padding: 8px;

    .my-swipe {
      .van-swipe-item {
        height: 240px;
        text-align: center;

        img {
          height: 100%;
        }
      }
    }

    .price {
      .sell_price {
        color: #fa865d;
        font-size: 20px;
        margin-right: 20px;
      }

      .market_price {
        color: #666;
        font-size: 14px;
      }
    }

    .title {
      color: #333;
      font-weight: 500;
    }

    .content {
      color: #666;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
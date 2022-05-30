<template>
  <div class="home-container">
    <!-- 搜索框 -->
    <van-sticky>
      <div class="search">
        <div class="logoWrap">
          <img src="../assets/images/logo.webp" alt="" />
        </div>
        <van-search placeholder="笔记本" @click="$router.push('/home/index/search')"></van-search>
      </div>
    </van-sticky>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in lunboData" :key="item.img">
        <img :src="item.img" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 九宫格 -->
    <van-grid :column-num="4">
      <van-grid-item v-for="item in gridData" :key="item.src" :to="item.to">
        <div class="grid-item">
          <img :src="item.img" alt="" />
          <span class="text">{{ item.text }}</span>
        </div>
      </van-grid-item>
    </van-grid>
    <!-- 商品列表 -->
    <van-divider>推荐商品</van-divider>
    <div class="goodslist">
      <Goods
        v-for="item in goodsData"
        :key="item.id"
        :data="item"
        @click="handle"
      ></Goods>
    </div>

    <!-- BackTiop组件(回到顶部) -->
    <BackTop :scrollTop="500" />
    <router-view></router-view>
  </div>
</template>

<script>
import { fetchLunbo, fetchGoods } from "../api/index.js";
// 导入组件
import BackTop from "../components/BackTop.vue";
import Goods from "../components/Goods.vue";
import png1 from "../assets/images/1.png";
import png2 from "../assets/images/2.png";
import png3 from "../assets/images/3.png";
import png4 from "../assets/images/4.png";
import png5 from "../assets/images/5.png";
import png6 from "../assets/images/6.png";
import png7 from "../assets/images/7.png";
import morePng from "../assets/images/more.png";
export default {
  name: "Home",
  data() {
    return {
      page: 1,
      limit: 12,
      lunboData: [],
      gridData: [
        { text: "海淘超市", img: png1, to: "/goodslist" },
        { text: "新闻列表", img: png2, to: "/goodslist" },
        { text: "乐淘生鲜", img: png3, to: "/goodslist" },
        { text: "生活缴费", img: png4, to: "/goodslist" },
        { text: "领津贴", img: png5, to: "/goodslist" },
        { text: "plus会员", img: png6, to: "/goodslist" },
        { text: "领乐豆", img: png7, to: "/goodslist" },
        { text: "更多", img: morePng, to: "/goodslist" },
      ],
      goodsData: [],
    };
  },
  // 初始化
  created() {
    this._fetchLunbo();
    this._fetchGoods();
  },
  // 操作
  methods: {
    // 轮播图数据
    async _fetchLunbo() {
      let { message } = await fetchLunbo();
      this.lunboData = message;
    },
    // 推荐商品数据
    async _fetchGoods() {
      let { message } = await fetchGoods(this.page, this.limit);
      this.goodsData = message;
    },
    handle(data, event) {
      this.$router.push("/goodsDetail/" + data.id);
    },
  },
  components: {
    BackTop,
    Goods,
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  font-size: 14px;
  color: #666;
  padding-bottom: 50px;

  .search {
    display: flex;
    align-items: center;

    .logoWrap {
      width: 50px;
      height: 54px;
      background-color: #fff;
      padding: 0px 3px;

      img {
        width: 100%;
        height: 50px;
        // transform: scale(0.8);
      }
    }

    .van-search {
      flex: 1;
    }
  }

  .my-swipe {
    .van-swipe-item {
      height: 200px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .van-grid {
    .grid-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 50%;
      }

      .text {
        margin-top: 6px;
      }
    }
  }

  .van-divider {
    font-size: 16px;
    color: #221f1ffc;
  }

  .goodslist {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background: rgba(234, 231, 231, 0.368627451);
  }
}
</style>
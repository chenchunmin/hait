<template>
  <!-- 海淘超市 -->
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="Goods-container">
          <Goods
            v-for="item in goodsList"
            :key="item.id"
            :data="item"
            @click="foo"
          >
            <template #footer>
              <div class="footerArea">
                <div class="price">
                  <span class="sell_price">&yen; 2195</span>
                  <span class="market_price">&yen; 2499</span>
                </div>
                <div class="info">
                  <span class="hot">热卖中</span>
                  <span class="remain">剩余100件</span>
                </div>
              </div>
            </template>
          </Goods>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { fetchGoodsList } from "../api/index.js";
import Goods from "../components/Goods.vue";
export default {
  data() {
    return {
      page: 0,
      limit: 12,
      goodsList: [],
      loading: false, // 是否正在加载中..
      finished: false, // 是否已经加载完毕
      refreshing: false, // 是否正在刷新中
    };
  },
  methods: {
    // 上拉加载
    onLoad() {
      console.log("onLoad");
      this.page++;
      this._fetchGoodsList();
    },
    // 下拉刷新
    onRefresh() {
      console.log("onRefresh");
      this.page = 0;
      // 清空数据
      this.finished = false;
      // 重新加载数据 true属于加载状态
      this.loading = true;
      this.onLoad();
    },
    async _fetchGoodsList() {
      if (this.refreshing) {
        this.goodsList = [];
        this.refreshing = false;
      }
      const result = await fetchGoodsList(this.page, this.limit);
      this.loading = false;
      this.goodsList = [...this.goodsList, ...result.message];
      if (result.message.length === 0) {
        this.goodsList.length % 2 === 1 && this.goodsList.pop();
        this.finished = true;
      }
    },
    foo(data, event) {
      this.$router.push("/goodsDetail/" + data.id);
    },
  },
  components: {
    Goods,
  },
};
</script>

<style lang="scss" scoped>
.Goods-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #f0eded;
  padding-top: 4px;

  .footerArea {
    .price {
      display: flex;
      justify-content: space-between;

      .sell_price {
        color: #ff4142;
        font-size: 16px;
        font-weight: 700;
      }

      .market_price {
        font-size: 12px;
        color: #999;
      }
    }
  }

  .info {
    display: flex;
    margin-top: 8px;
    justify-content: space-between;
    color: #787272;
    font-size: 14px;
  }
}
</style>
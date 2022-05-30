<template>
  <div class="item" @click="clickHandle">
    <div class="imgWrap flex_c_c">
      <img v-lazy="data.img_url" />
    </div>
    <div class="title ellipsis_l1">{{ data.title }}</div>
    <slot name="footer">
      <div class="footer">
        <span class="price">&yen;{{ data.sell_price }}</span>
        <span class="buy">{{ data.buy }}购买</span>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "Goods",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // 触发父的自定义函数
    clickHandle(event) {
      this.$emit("click", this.data, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;
  width: 49%;
  background-color: #fff;
  padding: 6px;
  border-radius: 4px;
  margin-bottom: 6px;

  .imgWrap {
    height: 124px;
    overflow: hidden;
    width: 100%;

    img {
      height: 100%;
    }
  }

  .title {
    padding: 4px 0;
    color: #000;
    margin: 6px 0;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    margin: 6px 0;

    .price {
      color: #ff4142;
      font-size: 16px;
      font-weight: 700;
    }

    .buy {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
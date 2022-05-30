<template>
  <div class="BackTop" v-show="isShow" @click="goTop">
    <img src="../assets/images/backtop.png" />
  </div>
</template>

<script>
import {throttle} from "../utils/tools.js"
export default {
  props: {
    scrollTop: {
      type: Number,
      default: 600,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },

  methods: {
    scrollHand(event) {
      let ScrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(ScrollTop);
      if (ScrollTop >= this.scrollTop) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    goTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
  },

  mounted() {
    // 绑定滚动事件
    // document.addEventListener("scroll", this.scrollHand);
    // 节流
    document.addEventListener('scroll',throttle(this.scrollHand,500))
  },

  destroyed() {
    // 解绑滚动事件
    document.removeEventListener("scroll", this.scrollHand);
  },
};
</script>

<style lang="scss" scoped>
.BackTop {
  position: fixed;
  right: 8px;
  bottom: 120px;
  width: 38px;
  height: 38px;

  img {
    width: 100%;
  }
}
</style>
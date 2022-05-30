<template>
  <div id="app">
    <van-nav-bar v-show="ShowNavBar" :title="title" left-arrow @click-left="onClickLeft" />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      ShowNavBar: true,
      isOnline: navigator.online,
    };
  },

  watch: {
    $route: {
      handler: function (route) {
        let { pageTitle, isShowNavBar } = route.meta;
        // 头部标题
        this.title = pageTitle;
        // 头部NavBar的显示和隐藏
        this.ShowNavBar = isShowNavBar;
      },
      immediate: true,
    },
    // watch监听网络状态
    isOnline() {
      this.isOnline === false && this.$toast.fail("网络异常,请检查网络");
      this.isOnline === true && this.$toast.success("网络已连接");
    },
  },

  methods: {
    onClickLeft() {
      // 返回页面栈的上一个页面(router:路由器route:当前路由)
      this.$router.back();
    },

    updateNetwork(e) {
      this.isOnline = e.type == "online" ? true : false;
    },
  },

  mounted() {
    // 全局断网处理
    window.addEventListener("online", this.updateNetwork);
    window.addEventListener("offline", this.updateNetwork);
  },
};
</script>
<style lang="scss">
@import "./assets/css/common.scss";

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

#app {
  min-width: 320px;
  max-width: 750px;
  margin: auto;

  .van-tabbar {
    min-width: 320px;
    max-width: 750px;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>


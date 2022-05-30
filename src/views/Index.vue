<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar v-model="active" :active-color="color">
      <van-tabbar-item icon="home-o" to="/home/index">首页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" :badge="$store.getters.getCarNumber" to="/home/shopcar">购物车
      </van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/home/users">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      color: "red",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        if (route.meta) {
          let { name } = route.meta;
          const nameMap = {
            Home: 0,
            Shopcar: 1,
            Users: 2,
          };
          this.active = nameMap[name];
        }
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>
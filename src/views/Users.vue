<template>
  <div class="user-container">
    <div class="userInfo">
      <div class="active">
        <van-image round width="80px" height="80px" :src="avatar" @click="updateAvatar" />
        <input v-show="false" type="file" @change="_updateAvatar" ref="inputFile" />
      </div>
      <div class="username">
        {{ $store.state.userInfo.username }}
      </div>
    </div>

    <van-cell-group>
      <van-cell title="修改密码" is-link />
      <van-cell title="我的订单" @click="$router.push('/order')" is-link />
      <van-cell title="收货地址" @click="$router.push('/address')" is-link />
      <van-cell title="提交反馈" is-link />
      <van-cell title="设置" is-link />
      <van-cell title="关于海淘" is-link />
    </van-cell-group>
    <van-button type="danger" block @click="logout">退出登录</van-button>
  </div>
</template>

<script>
import { fetchAvatar } from "../api/index.js";
export default {
  computed: {
    avatar: function () {
      return "http://api.w0824.com/" + this.$store.state.userInfo.avatar;
    },
  },
  methods: {
    // 退出登录
    logout() {
      const _this = this;
      _this.$dialog
        .confirm({
          message: "确定退出登录吗?",
        })
        .then(() => {
          _this.$store.commit("clearUserInfo");
          _this.$router.push("/login");
        });
    },
    // 更换头像
    updateAvatar() {
      this.$refs.inputFile.click();
    },
    async _updateAvatar() {
      // 获取图像二进制
      let file = this.$refs.inputFile.files[0];
      if (!file) {
        return;
      }
      let formData = new FormData();
      formData.set("user_id", this.$store.state.userInfo.id);
      formData.set("file", file);
      // 调用api更新头像
      let { message, src, status } = await fetchAvatar(formData);
      this.$toast(message);
      if (status === 0) {
        // 更改vuex中用户src的路径
        this.$store.commit("updateUserAvatar", src);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-container {
  .van-cell {
    font-size: 16px;
  }

  .userInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;

    .active {
      width: 80px;

      img {
        width: 100%;
      }
    }

    .username {
      color: #000;
      font-size: 18px;
    }
  }
}
</style>
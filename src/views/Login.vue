<template>
  <div class="loginContainer">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <router-link tag="div" :to="{path:'/register'}" class="text-center text-gray-color">没有账号？去注册</router-link>
  </div>
</template>

<script>
import { fetchLogin } from "../api/index.js";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(obj) {
      const { username, password } = obj;
      const { message, status, token, userInfo } = await fetchLogin(
        username,
        password
      );
      this.$toast(message);
      if (status === 0) {
        // 成功
        this.$toast(message);
        // 将token和userInfo存储到vuex进行保存
        this.$store.commit("setToken", token);
        this.$store.commit("setUserInfo", userInfo);
        // 获取重定向参数redirect
        let { redirect } = this.$route.query;
        if (redirect) {
          this.$router.push(redirect);
        } else {
          this.$router.push("/home/index");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
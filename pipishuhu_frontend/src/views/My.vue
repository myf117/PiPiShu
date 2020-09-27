<template>
  <div id="my-nav">
    <router-link to="/my/subscribed">订阅</router-link>
    <router-link to="/my/listened">听过</router-link>
    <router-link to="/my/buy">已购</router-link>
    <router-link to="/my/like">喜欢</router-link>
    <button class="logout userbutton" @click="logout">退出登录</button>
    <button class="logmodify userbutton" @click="usermodify">修改资料</button>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      alert("退出成功");
      this.$router.go(0);
    },
    usermodify() {
      this.$router.push("/my/usermodify");
    },
  },
  mounted() {
    if (!document.cookie) {
      this.$router.push("/");
    } else if (this.$route.path != "/my/subscribed") {
      this.$router.push("/my/subscribed");
    }
  },
};
</script>
<style lang="scss" scoped>
#my-nav {
  position: relative;
  top: 50px;
  left: 200px;
  a {
    color: #2c3e50;
    font-size: 20px;
    text-decoration: none;
    margin-left: 30px;

    &.router-link-exact-active {
      color: #3cced0;
    }
  }
}
.userbutton {
  border-color: #3cced0;
  border-radius: 5px;
  background-color: #3cced0;
  width: 100px;
  height: 40px;
  cursor: pointer;
  font-size: 18px;
  color: #fff;
  margin-left: 20px;
  outline:none;
}
.logout {
  margin-left: 500px;
}

</style>

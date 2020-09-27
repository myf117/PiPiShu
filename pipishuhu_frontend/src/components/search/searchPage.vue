<template>
  <div id="searchBox">
    <p><span @click="tomainPage">首页</span>>搜索 "{{this.$route.params.kw}}"</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="专辑" name="second">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="声音" name="third">
        <router-view></router-view> 
      </el-tab-pane>
      <el-tab-pane label="主播" name="fourth">
        <router-view></router-view>
      </el-tab-pane>
    </el-tabs>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      muAlbumList: [],
      myAudioList: [],
      myUserList: [],
    };
  },
  components: {
  },

  methods: {
    tomainPage(){
      this.$router.push("/")
    },
    handleClick(tab, event) {
      // console.log(tab, event);
      let path;
      switch (tab.label) {
        case "专辑":
          path = `/search/${this.$route.params.kw}/p2`;
          break;
        case "全部":
          path = `/search/${this.$route.params.kw}/p1`;
          break;
        case "声音":
          path = `/search/${this.$route.params.kw}/p3`;
          break;
        case "主播":
          path = `/search/${this.$route.params.kw}/p4`;
          break;
        default:
          break;
      }
      if (decodeURI(this.$route.fullPath) === path) {
        return;
      }
      if (path) {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style scoped>
 #searchBox {
   cursor: pointer;
   margin: 20px auto;
   width: 1100px;

 }
</style>
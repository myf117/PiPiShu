<template>
  <div class="rankcon">
    <div class="border">
      <div class="border-title">
        <span @click="shouYe" class="shouye">首页</span>
        <span>> 排行榜</span>
      </div>
      <el-tabs class="rank-title" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="rank-kinds" label="有声书" name="first"></el-tab-pane>
        <el-tab-pane class="rank-kinds" label="相声评书" name="second"></el-tab-pane>
        <el-tab-pane class="rank-kinds" label="儿童" name="third"></el-tab-pane>
        <el-tab-pane class="rank-kinds" label="头条" name="fourth"></el-tab-pane>
        <el-tab-pane class="rank-kinds" label="音乐" name="fifth"></el-tab-pane>
        <el-tab-pane class="rank-kinds" label="娱乐" name="sexth"></el-tab-pane>
      </el-tabs>
      <router-view />
    </div>
  </div>
</template>
<script>
import rankconItem from "../components/rankconItem.vue";
export default {
  data() {
    return {
      activeName: "first",
      kinds: "有声书",
    };
  },

  created() {
    this.activeName = this.GetCookie("kind");
    console.log(this.activeName);
  },
  methods: {
    // 排行榜切换路由
    handleClick(tab, event) {
      this.kinds = tab.label;
      document.cookie = `kind=${tab.name}`;
      let path;
      switch (this.kinds) {
        case "有声书":
          path = "/rankcon/rankconItem";
          break;
        case "相声评书":
          console.log(this.activeName);
          path = "/rankcon/rankItemXiangSheng";
          break;
        case "娱乐":
          path = "/rankcon/rankItemYuLe";
          break;
        case "儿童":
          path = "/rankcon/rankItemErTong";
          break;
        case "头条":
          path = "/rankcon/rankItemYuLe";
          break;
        case "音乐":
          path = "/rankcon/rankconItem";
          break;
        default:
          break;
      }
      if (path) {
        this.$router.push(path);
      }
    },
    // 跳转首页路由
    shouYe(el) {
      let path;
      path = "/";
      this.$router.push(path);
    },
    // 获取cookie
    GetCookie(key) {
      // var key = "kind";
      var getCookie = document.cookie.replace(/[ ]/g, ""); //获取cookie，并且将获得的cookie格式化，去掉空格字符
      var arrCookie = getCookie.split(";"); //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
      var tips; //声明变量tips
      for (var i = 0; i < arrCookie.length; i++) {
        //使用for循环查找cookie中的tips变量
        var arr = arrCookie[i].split("="); //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
        if (key == arr[0]) {
          //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
          tips = arr[1]; //将cookie的值赋给变量tips
          break; //终止for循环遍历
        }
      }
      return tips
    },
  },
  components: {
    rankconItem: rankconItem,
  },
};
</script>

<style scoped="scoped">
.rankcon {
  width: 1120px;
  margin: 0 auto;
}
.border {
  height: 80px;
  font-size: 12px;
  /* border-bottom: 1px solid rgb(226, 225, 225); */
}
.rank-title-hr {
  color: rgb(226, 225, 225);
}
.border-title {
  padding: 20px 0;
}
.rank-title {
  font-size: 16px;
  margin: 0 auto;
}
.rank-kinds {
  margin-right: 30px;
}
.shouye:hover {
  cursor: pointer;
  color: #3cced0;
}
</style>
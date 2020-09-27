<template>
  <div id="container">
    <p>
      共
      <span id="number">{{myuser.length}}</span> 个搜索记录
    </p>
    <div class="line"></div>

    <zhubo :user="myuser"></zhubo>
  </div>
</template>
 
<script>
import zhubo from "./zhubo.vue";
export default {
  data: function () {
    return {
      myuser: []
    };
  },
  components: {
    zhubo,
  },
  created() {
    this.$http
      .get("http://localhost:7001/getUserInf", {})
      .then((res) => {
        this.userArr = res.data;
        this.myuser = this.userArr.filter((el) => {
          return el.nickname.indexOf(`${this.$route.params.kw}`) != -1;
        });
      })
      .catch((err) => {});
  },
};
</script>

<style scoped>
#container {
  width: 800px;
}
#number {
  color: #3cced0;
}
.line {
  height: 2px;
  background-color: rgb(224, 224, 224);
  margin-bottom: 10px;
}
</style>
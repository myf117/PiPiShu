<template>
  <div id="albumItem" @click="enterAlbum(el)">
    <div id="albumImg">
      <img :src="el.album_url" alt />
      <img id="loadImg" :src="loadImgsrc" alt />
    </div>

    <span id="amount">
      <i class="el-icon-service"></i>
      <span class="tubiao" v-if="el.album_amount.toString().length<5">{{el.album_amount}}</span>
      <span
        class="tubiao"
        v-else-if="el.album_amount.toString().length<9"
      >{{(el.album_amount/10000).toFixed(2)}}万</span>
      <span
        class="tubiao"
        v-else-if="el.album_amount.toString().length>=9"
      >{{(el.album_amount/100000000).toFixed(2)}}亿</span>
    </span>

    <span id="albumName" class="hoverColor">{{el.album_name}}</span>
    <div id="autho">{{el.nickname}}</div>
  </div>
</template>   
   
<script>
import loadImgsrc from "../../assets/img/play2.png";
export default {
  data: function () {
    return {
      loadImgsrc: loadImgsrc,
      loadImg: "loadImg",
      nickname: "",
    };
  },
  props: ["albumxinxi", "el"],
  mounted() {},
  methods: {
    enterAlbum(el) {
      // console.log(el);
      let path;
      let kind = el.kind;

      switch (kind) {
        case "有声书":
          path = `/youshengintr/${el.album_id}`;
          break;
        default:
          break;
      }
      if (path) {
        this.$router.push(path);
      }
    },
    // 取出用户信息
    // getUserInf() {
    //   this.$http
    //     .get("http://localhost:7001/getUserInf", {})
    //     .then((res) => {
    //       // console.log(res.data);
    //       // this.userArr = res.data;
    //     })
    //     .catch((err) => {});
    // },
  },
};
</script>

<style scoped>
#albumItem {
  width: 144px;
  position: relative;
  margin-bottom: 20px;
}

#albumItem img {
  width: 144px;
  border-radius: 12px;
}

#albumItem #loadImg {
  display: none;
  width: 58px;
  height: 58px;
  position: absolute;
  top: 42px;
  left: 42px;
}

#albumImg:hover #loadImg {
  display: block;
}

#amount {
  background-color: rgb(0, 0, 0);
  color: white;
  position: absolute;
  top: 126px;
  right: 0px;
  border-radius: 0 0 12px 0;
  padding-right: 6px;
}

#albumName {
  width: 100%;
  display: inline-block;
  font-weight: bolder;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.hoverColor:hover {
  color: #3cced0;
}
#autho {
  color: #a3a3ac;
}
</style>
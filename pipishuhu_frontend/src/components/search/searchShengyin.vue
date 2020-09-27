<template>
  <div id="container">
    <toptypeof></toptypeof>
    <p id="result">
      共
      <span id="number">{{myAudio.length}}</span> 个搜索记录
    </p>
    <div class="line"></div>

    <div id="album">
      <shengyin :item="item" v-for="item in pagelist" :key="item.id"></shengyin>
    </div>

    <div id="btnBox">
      <button class="btn" @click="pagenum" v-for="(item,index) in page" :key="index">{{index+1}}</button>
    </div>
  </div>
</template>  
 
<script>
import toptypeof from "./toptypeof.vue";
import shengyin from "./shengyin.vue";
export default {
  data: function () {
    return {
      list: [],
      mylist: [],
      userArr: [],
      myuser: [],
      audioAll: [],
      myAudio: [],
      shengyinList: [],
      pagelist: [],
      page: "",
    };
  },
  components: {
    toptypeof,
    shengyin,
  },
  created() {
    this.$http
      .get("http://localhost:7001/getUserInf", {})
      .then((res) => {
        // console.log(res.data)
        this.userArr = res.data;
        this.myuser = this.userArr.filter((el) => {
          return el.nickname.indexOf(`${this.$route.params.kw}`) != -1;
        });
        this.getAllAlbum();
      })
      .catch((err) => {});
  },
  methods: {
    // 取出全部专辑
    getAllAlbum() {
      this.$http
        .get("http://localhost:7001/getAllAlbum", {})
        .then((res) => {
          // console.log(res.data)
          this.list = res.data;

          // console.log(111);
          //给专辑添加所属用户名
          this.list.forEach((el1) => {
            this.userArr.forEach((el2) => {
              if (el1.u_id == el2.user_id) {
                el1.nickname = el2.nickname;
              }
            });
          });

          this.getAudio();

          //专辑名称有关键字
          this.mylist = this.list.filter((el) => {
            return el.album_name.indexOf(`${this.$route.params.kw}`) != -1;
          });

          //专辑发布者有关键字
          // this.mylist = this.mylist.concat(
          //   this.list.filter((el) => {
          //     return el.nickname.indexOf(`${this.$route.params.kw}`) != -1;
          //   })
          // );
        })
        .catch((err) => {
          // console.log("axios请求失败")
        });
    },

    getAudio() {
      this.$http
        .get("http://localhost:7001/getAudio", {})
        .then((res) => {
          this.audioAll = res.data;

          // console.log(this.list);
          // 给每条音频对象加上所属专辑名,专辑封面,专辑发布者,专辑id,专辑类别
          this.audioAll.forEach((el1) => {
            this.list.forEach((el2) => {
              if (el1.a_id == el2.album_id) {
                el1.albumName = el2.album_name;
                el1.albumUrl = el2.album_url;
                el1.albumNickname = el2.nickname;
                el1.albumKind = el2.kind;
                el1.albumId = el2.album_id;
              }
            });
          });

          // 音频名有关键字的音频
          this.myAudio = this.audioAll.filter((el) => {
            return el.audio_name.indexOf(`${this.$route.params.kw}`) != -1;
          });

          this.page = Math.ceil(this.myAudio.length / 5);
          this.pagenum();
        })
        .catch((err) => {
          alert("axios请求失败");
        });
    },
    // 分页
    pagenum(el) {
      let num = el ? el.target.innerHTML : 1;
      this.pagelist = this.myAudio.slice(5 * (num - 1), num * 5);
    },
  },
};
</script>

<style scoped>
#container {
  width: 800px;
}
p {
  padding: 10px 0;
}
#number {
  color: #3cced0;
}
#album {
  margin-top: 20px;
}

#btnBox {
  text-align: center;
}
.btn {
  width: 24px;
}

.line {
  height: 2px;
  background-color: rgb(224, 224, 224);
}
</style>
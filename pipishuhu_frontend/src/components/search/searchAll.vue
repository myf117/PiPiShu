<template>
  <div id="container">
    <div id="left">
      <div>
        <div v-if="mylist.length">
          <!-- 相关专辑 -->
          <p class="title">
            <span>
              <span>'{{this.$route.params.kw}}'</span> 相关的专辑
            </span>
            <span>更多</span>
          </p>
          <div id="album">
            <albumitem :el="item" v-for="item in mylist" :key="item.id"></albumitem>
          </div>
        </div>
        <div v-else>无相关专辑</div>
      </div>

      <div>
        <div v-if="myAudio.length">
          <!-- 相关声音 -->
          <p class="title">
            <span>
              <span>'{{this.$route.params.kw}}'</span> 相关的声音
            </span>
            <span>更多</span>
          </p>
          <div>
            <shengyin :item="item" v-for="item in myAudio" :key="item.id"></shengyin>
          </div>
        </div>
        <p v-else>无相关声音</p>
      </div>

      <div>
        <div v-if="myuser.length">
          <!-- 相关主播 -->
          <p class="title">
            <span>
              <span>'{{this.$route.params.kw}}'</span> 相关的主播
            </span>
            <span>更多</span>
          </p>
          <zhubo :user="myuser"></zhubo>
        </div>
        <p v-else>无相关主播</p>
      </div>
    </div>

    <div id="right">
      <searchrank :ranklist="rankAlbumList">
        <p>
          <i class="el-icon-reading"></i> 皮皮书最热合集
        </p>
      </searchrank>
      <!-- <searchrank :ranklist="rankZhuboList">
        <p>最多粉丝主播榜</p>
      </searchrank>-->
    </div>
  </div>
</template> 

<script>
import shengyin from "./shengyin.vue";
import zhubo from "./zhubo.vue";
import searchrank from "./searchrank.vue";

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
      rankAlbumList: [],
      rankZhuboList: [],
    };
  },
  components: {
    shengyin,
    zhubo,
    searchrank,
  },
  created() {
    this.getRankAlbumTen();
    this.$http
      .get("http://localhost:7001/getUserInf", {})
      .then((res) => {
        this.userArr = res.data;
        // console.log(this.userArr)

        this.myuser = this.userArr.filter((el) => {
          return el.nickname.indexOf(`${this.$route.params.kw}`) != -1;
        });
        this.myuser.forEach((el) => {
          el.follow;
        });

        this.getAllAlbum();
        this.getAudio();
      })
      .catch((err) => {});
  },
  methods: {
    // 取出全部专辑
    getAllAlbum() {
      this.$http
        .get("http://localhost:7001/getAllAlbum", {})
        .then((res) => {
          this.list = res.data;
          // console.log(this.list)

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

          // console.log(1111)
          //专辑发布者有关键字,有问题，代码无法接着向下执行
          // this.mylist = this.mylist.concat(
          //   this.list.filter((el) => {
          //     return el.nickname.indexOf(`${this.$route.params.kw}`) != -1;
          //   })
          // );
        })
        .catch((err) => {
          // console.log("axios请求失败取全");
        });
    },

    // 取出全部的音频
    // 添加音频的所属专辑，用户名，封面
    // 挑出有关键字的音频
    getAudio() {
      this.$http
        .get("http://localhost:7001/getAudio", {})
        .then((res) => {
          this.audioAll = res.data;

          // console.log(this.list);
          // 给每条音频对象加上所属专辑名和专辑封面,专辑发布者
          this.audioAll.forEach((el1) => {
            this.list.forEach((el2) => {
              if (el1.a_id == el2.album_id) {
                el1.albumName = el2.album_name;
                el1.albumUrl = el2.album_url;
                el1.albumNickname = el2.nickname;
              }
            });
          });

          // 音频名有关键字的音频
          this.myAudio = this.audioAll.filter((el) => {
            return el.audio_name.indexOf(`${this.$route.params.kw}`) != -1;
          });
          // console.log(this.myAudio)
        })
        .catch((err) => {
          // console.log("axios请求失败取字段音频");
        });
    },

    //取出播放量前10的专辑
    getRankAlbumTen() {
      this.$http
        .get("http://localhost:7001/getRankAlbumTen", {})
        .then((res) => {
          // console.log(res.data)
          this.rankAlbumList = res.data;
        })
        .catch((err) => {});
    },
  },
};
</script>

<style scoped>
#container {
  display: flex;
}
#left {
  width: 800px;
}
.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.el-icon-reading {
  color: red;
}

#album {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
#right {
  position: fixed;
  top: 180px;
  left: 1090px;
}

#right p {
  font-size: 20px;
  margin-bottom: 20px;
}
</style>
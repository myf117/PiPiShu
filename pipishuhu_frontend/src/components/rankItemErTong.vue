<template>
  <div class="rank-list">
    <div class="list-item" v-for="(item,index) in ranklist" :key="index">
      <span class="list-num">{{index+1}}</span>
      <img :src="item.album_url" />
      <div class="bofang-Icon"></div>
      <span class="list-right">
        <div class="list-album-name">{{item.album_name}}</div>
        <i class="list-kind">{{item.kind}}</i>
        <i class="list-nickname iconfont iconyonghu">{{item.nickname}}</i>
        <i class="list-album-amount">
          <span class="tubiao iconfont icontingge"></span>
          <span class="tubiao" v-if="item.album_amount.toString().length<5">{{item.album_amount}}</span>
          <span
            class="tubiao"
            v-else-if="item.album_amount.toString().length<9"
          >{{(item.album_amount/10000).toFixed(2)+"万"}}</span>
          <span
            class="tubiao"
            v-else-if="item.album_amount.toString().length>=9"
          >{{(item.album_amount/100000000).toFixed(2)+"亿"}}</span>
        </i>
        <div class="item-inf">{{item.intro}}</div>
        <div class="list-right-foot">
          <div class="latest-audio">{{item.latest_audio}}</div>

          <div class="detailed-album" @click="ToAlbumCon(item.album_id)">专辑详情</div>

          <div
            v-if="item.collect==0"
            class="album-not-collect"
            @click="addcollect(item.album_id)"
          >收藏</div>
          <div v-else class="album-collect" @click="delcollect(item.album_id)">已收藏</div>
        </div>
      </span>
    </div>
    <loginwindow @myloginF="myloginzz" v-if='login==1'></loginwindow>
  </div>
</template> 
<script>
import { log } from "util";
// import Loginwindow from "../views/LoginWindow.vue";
export default {
  data: function () {
    return {
      ranklist: [],
      kind: "儿童",
      // 用户收藏的专辑
      userAlbumID: [],
      // 所有专辑id
      albumID: [],
      id: 0,
      login:0
    };
  },

  created() {
    this.id = this.GetCookie("user_id");
    this.getAllAlbum(this.kind);
  },
  methods: {
    myloginzz:function(){
      this.login = 0
    },

    // 点击收藏判断用户是否存在
    addcollect: function (al_id) {
      console.log(al_id);
      this.judgeUser(this.id, al_id);
    },

    // 点击删除收藏
    delcollect: function (al_id) {
      console.log(al_id);
      this.delCollect11(this.id, al_id);
    },
    // 点击跳转详情
    ToAlbumCon: function (al_id) {
      let path = `/youshengintr/${al_id}`;
      if (path) {
        this.$router.push(path);
      }
    },

    // 获取用户登录信息
    getUser(id, albumID) {
      this.$http
        .get("http://127.0.0.1:7001/getAnuserInf", {
          params: {
            user_id: id,
          },
        })
        .then((res) => {
          console.log(res.data[0]);
          if (res.data[0]) {
            console.log("用户存在");
            // 获取用户收藏信息
            this.getUserCollect(id, albumID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取用户收藏信息
    getUserCollect(us_id, albumID) {
      this.$http
        .get("http://127.0.0.1:7001/getUserCollect", {
          params: {
            us_id: us_id,
            albumID: albumID.toString(),
          }, 
        })
        .then((res) => {
          // 判断专辑id是否是用户收藏
          for (let i = 0; i < this.ranklist.length; i++) {
            for (let j = 0; j < res.data.length; j++) {
              if (res.data[j].al_id == this.ranklist[i].album_id) {
                console.log(res.data[j].al_id);
                this.userAlbumID.push(res.data[j].al_id);
                // this.userAlbumID.push(this.res.data[j].al_id)
                // console.log(this.ranklist[i].album_id);
                this.ranklist[i].collect = 1;
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取缓存
    GetCookie: function (key) {
      let getCookie = document.cookie.replace(/[ ]/g, ""); //获取cookie，并且将获得的cookie格式化，去掉空格字符
      let arrCookie = getCookie.split(";"); //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
      let tips; //声明变量tips
      for (let i = 0; i < arrCookie.length; i++) {
        //使用for循环查找cookie中的tips变量
        let arr = arrCookie[i].split("="); //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
        if (key == arr[0]) {
          //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
          tips = arr[1]; //将cookie的值赋给变量tips
          break; //终止for循环遍历
        }
      }
      return tips;
    },

    // 根据kind得到专辑信息
    getAllAlbum(kind) {
      this.$http
        .get("http://localhost:7001/getAllAlbumByKind", {
          params: {
            kind: kind,
          },
        })
        .then((res) => {
          // 给数组加上collect属性
          res.data.forEach((album) => {
            album.collect = 0;
          });
          this.ranklist = res.data;
          for (let i = 0; i < this.ranklist.length; i++) {
            this.albumID[i] = this.ranklist[i].album_id;
          }
          this.getUser(this.id, this.albumID);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 点击判断用户是否登录
    judgeUser(id, al_id) {
      console.log(al_id);
      this.$http
        .get("http://127.0.0.1:7001/getAnuserInf", {
          params: {
            user_id: id,
          },
        })
        .then((res) => {
          if (res.data[0]) {
            this.addCollect11(id, al_id);
          } else {
            console.log("用户不存在");
            // 弹出登录框
            this.login=1;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 点击添加收藏
    addCollect11(us_id, al_id) {
      this.$http
        .post("http://127.0.0.1:7001/addCollect", {
          us_id: us_id,
          al_id: al_id,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data == 1) {
            this.getAllAlbum(this.kind);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击删除收藏
    delCollect11(us_id, al_id) {
      this.$http
        .get("http://127.0.0.1:7001/delCollect", {
          params: {
            us_id: us_id,
            al_id: al_id,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === 1) {
            this.getAllAlbum(this.kind);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>



<style scoped="scoped">
i {
  font-style: normal;
}
.rank-list {
  padding-top: 50px;
}
.list-item {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  height: 180px;
  display: flex;
  padding: 20px;
  border-bottom: 1px solid rgb(226, 225, 225);
}
.list-num {
  display: inline-block;
  height: 100%;
  line-height: 180px;
  font-size: 20px;
  color: #40404c;
  padding-right: 20px;
}
img {
  width: 140px;
  height: 140px;
  border-radius: 5px;
}
.bofang-Icon {
  display: none;
  width: 70px;
  height: 70px;
  border-radius: 5px;
  position: absolute;
  left: 87px;
  top: 55px;
  background-image: url("../assets/img/play2.png");
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.95;
}
.list-item:hover {
  cursor: pointer;
}
.list-item:hover .bofang-Icon {
  display: inline-block;
}
.list-item:hover .list-album-name {
  color: #6eccce;
}

.list-right {
  width: 890px;
  padding-left: 20px;
}
.list-right i {
  font-size: 12px;
  color: #a3a3ac;
  margin-right: 20px;
}
.list-album-name {
  font-size: 20px;
  color: #40404c;
  margin-bottom: 5px;
}

.tubiao {
  font-size: 10px;
  margin-right: 2px;
}

.item-inf {
  font-size: 14px;
  color: #72727b;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-right-foot {
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
  display: flex;
}
.latest-audio {
  width: 640px;
  font-size: 14px;
  color: #a3a3ac;
}
.detailed-album,
.album-not-collect,
.album-collect {
  width: 96px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  border-radius: 20px;
}
.detailed-album {
  background: #a3a3ac1a;
  color: #40404c;
  margin-right: 20px;
}

.album-not-collect {
  /* display:none; */
  background: #d2f2f3;
  color: #4e8deb;
}
.album-collect {
  /* display: none; */
  background: #a3a3ac1a;
  color: #a3a3ac;
}
</style>
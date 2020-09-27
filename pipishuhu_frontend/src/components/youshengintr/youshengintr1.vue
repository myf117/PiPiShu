<template>
  <div class="contanier" v-if="list[0]">
    <div class="title" >
      <a href @click="tomain"><i class="el-icon-s-home"></i>首页</a>>{{list[0].kind}}>{{list[0].album_name}}
    </div>
    <div class="contanier2">
      <div class="topbox">
        <div class="topbox-left">
          <img class="albimg" :src="list[0].album_url" alt />
          <img :src="afterimg" alt />
        </div>
        <div class="topbox-right">
          <div class="inf">
            <b>{{list[0].album_name}}</b>
            <p><i class="el-icon-headset"></i>
            <span class="tubiao" v-if="list[0].album_amount.toString().length<5">{{list[0].album_amount}}</span>
                  <span class="tubiao" v-else-if="list[0].album_amount.toString().length<9">{{(list[0].album_amount/10000).toFixed(2)}}万</span>
                  <span class="tubiao" v-else-if="list[0].album_amount.toString().length>=9">{{(list[0].album_amount/100000000).toFixed(2)}}亿</span>
            </p>
          </div>
          <div class="btn">
            <img src="../../assets/img/play1.png" />
            <el-button @click="addcollect(list[0].album_id)" v-if="collect==0" class="celbtn" round>收藏</el-button>
            <el-button @click="delcollect(list[0].album_id)" v-else  class="celbtn" round>已收藏</el-button>
          </div>
        </div>
      </div>
      <hr />
      <div class="bottombox">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="简介" name="1">
            <span>{{list[0].intro}}</span>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
     <loginwindow @myloginF="myloginzz" v-if='login==1'></loginwindow>
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$route.params.album_id);
    this.id = this.GetCookie("user_id");
    this.getoneAlbum();
  },
  data: function () {
    return {
      list: [],
      activeNames: ["1"],
      afterimg:
        "https://s1.xmcdn.com/yx/ximalaya-web-static/last/dist/images/cover-right_dd0ab25.png",
      // 用户收藏的专辑
      userAlbumID: [],
      // 用户登录id
      id: 0,
      // 收藏为1，未收藏为0
      collect:0,
      login:0
    };
  },
  methods: {
    tomain() {
      return this.$route.push("/");
    },

   myloginzz:function(){
      this.login = 0
    },

    // 获取专辑所有信息
    getoneAlbum() {
      this.$http
        .get("http://localhost:7001/getoneAlbum", {
          params: {
            album_id: this.$route.params.album_id,
          },
        })
        .then((res) => {
          this.list = res.data;
          this.getUser(this.id,this.list[0].album_id);
        })
        .catch((err) => {
          console.log(222);
        });
    },
    // 点击收藏判断用户是否存在
    addcollect: function (al_id) {
      this.judgeUser(this.id, al_id);
    },

    // 点击删除收藏
    delcollect: function (al_id) {
      this.delCollect11(this.id, al_id);
    },
    // 获取用户登录信息
    getUser(id,album_id) {
      this.$http
        .get("http://127.0.0.1:7001/getAnuserInf", {
          params: {
            user_id: id,
          },
        })
        .then((res) => {
          if (res.data[0]) {
            // console.log("用户存在");
            // 获取用户收藏信息
            this.getUserCollect(id,album_id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取用户收藏信息
    getUserCollect(us_id,album_id) {
      this.$http
        .get("http://127.0.0.1:7001/getUserCollect", {
          params: {
            us_id: us_id,
            albumID: album_id
          },
        })
        .then((res) => {
          // 判断专辑id是否是用户收藏
          // console.log("-------获取用户收藏--------");
          // console.log(res.data[0].al_id);
          if(res.data[0].al_id) {
            // console.log("用户收藏了此专辑");
            this.collect=1;
          }
          // for (let i = 0; i < this.ranklist.length; i++) {
          //   for (let j = 0; j < res.data.length; j++) {
          //     if (res.data[j].al_id == this.ranklist[i].album_id) {
          //       console.log(res.data[j].al_id);
          //       this.userAlbumID.push(res.data[j].al_id);
          //       this.ranklist[i].collect = 1;
          //     }
          //   }
          // }
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
            console.log("用户存在");
          } else {
            console.log("用户不存在");
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
            this.getoneAlbum();
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
            this.collect=0;
            this.getoneAlbum();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
a{
  text-decoration: none;
}
a:hover{
  color: #3cced0;
}
.title {
  margin: 10px 10px;
}
.contanier {
  width: 780px;
}
.contanier2 {
  margin: 40px 30px 0 30px;
}
.topbox {
  width: 719px;
  height: 202px;
  /* background-color: #ccc; */
}
.albimg {
  width: 177px;
  height: 177px;
  border-radius: 5px;
}
.topbox-left {
  width: 250px;
  height: 210px;
  float: left;
}
.topbox-right {
  width: 458px;
  height: 198px;
  float: right;
}
.inf b {
  font-size: 20px;
}

.inf {
  padding-top: 10px;
  padding-bottom: 7px;
}
.inf p{
  padding-top: 23px;
}
.btn {
  padding-top: 35px;
}
.btn img {
  width: 50px;
  height: 50px;
}
.celbtn {
  background-color: #3cced0;
  opacity: 0.8;
  float: right;
  margin-right: 10px;
  width: 100px;
}

.bottombox {
  max-height: 500px;
  /* min-width: 500px; */
  width: 719px;
  background-color: #ccc;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  overflow: hidden;
}
.btn img:hover{
  cursor: pointer;
}
</style>
<template>
  <div>
    <div class="head">
      <div v-if="userinf[0]">
        <img  class="headimg" :src="userinf[0].userimg" alt />
        <div class="headinf1">
          <p>{{userinf[0].nickname}}</p>
          <span>{{userinf[0].userintr}}</span>
        </div>
        <div class="headinf2">
          <button class="btn btn1" v-if="flag" @click="addfollow" type="primary" round>+关注</button>
          <button class="btn btn2" @click="delfollow" v-else  type="primary" round>已关注</button>
        </div>
      </div>
    </div>
    <div class="left">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="主页" name="first"></el-tab-pane>
        <el-tab-pane label="专辑" name="second"></el-tab-pane>
        <el-tab-pane label="关注" name="third"></el-tab-pane>
        <el-tab-pane label="粉丝" name="fourth"></el-tab-pane>
      </el-tabs>
      <router-view></router-view>
    </div>
    <foot></foot>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      activeName: "first",
      userinf: [],
      userAlbum:[],
      mystar:[],
      flag:true
    };
  },
  created() {
    this.getAnuserInf();
    this.activeName=this.getCookie("activename")
    this.getStar()
  },
  methods: {
    handleClick(el) {
      // console.log(el.label);
      let userId = this.$route.params.u_id;
      let path;
      let key = el.label;
      document.cookie = `activename=${el.name}`
      switch (key) {
        case "主页":
          path = `/zhubo/${userId}/userindex`;
          break;
        case "专辑":
          path =  `/zhubo/${userId}/userAlbum`; 
          break;
        case "关注":
          path =  `/zhubo/${userId}/userfollow`;
          break;
        case "粉丝":
          path =  `/zhubo/${userId}/userfans`;
          break;

        default:
          break;
      }
      if (path) {
        this.$router.push(path);
      }
    },
    getAnuserInf() {
      this.$http
        .get("http://localhost:7001/getAnuserInf", {
          params: {
            user_id: this.$route.params.u_id,
          },
        })
        .then((res) => {
          this.userinf = res.data;
        })
        .catch((err) => {
          console.log(222);
        });
    },
     // 获取缓存
    getCookie(key) {
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
    addfollow(){
      let userId = this.getCookie("user_id");
      if (userId) {
        this.$http
        .post("http://localhost:7001/addfollow", {
            ufans_id: userId,
            ustar_id:this.$route.params.u_id
        })
        .then((res) => {
            this.flag=false;
            this.$router.go(0)
        })
        .catch((err) => {
          console.log(222);
        });
      }else{
        alert("请先登录")
      }
    },
    delfollow(){
      let userId = this.getCookie("user_id");
       this.$http
        .post("http://localhost:7001/delfollow", {
            ufans_id: userId,
            ustar_id:this.$route.params.u_id
        })
        .then((res) => {
            this.flag=true;
            this.$router.go(0)
        })
        .catch((err) => {
          console.log(222);
        });
    },
    getStar(){
      let userId = this.getCookie("user_id");
      console.log(userId);
      let nowUserid=this.$route.params.u_id;
      console.log(nowUserid);
      this.$http
        .get("http://localhost:7001/getStar", {
          params: {
            ufans_id: userId,
          },
        })
        .then((res) => {
          this.mystar = res.data;
          for (let i = 0; i < this.mystar.length; i++) {
            if (this.mystar[i].ustar_id==nowUserid) {
               this.flag=false
            }
          }
        })
        .catch((err) => {
          console.log(222);
        });
    }
  },
};
</script>

<style scoped>
.head {
  width: 98.92vw;
  height: 300px;
  /* background-color: rosybrown; */
  background-image: url("https://css1.xmcdn.com/css/img/mycenter_bg/mycenter_bg_3.jpg");
  position: relative;
  
  
}
.headimg {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  position: absolute;
  top: 170px;
  left: 320px;
}
.headinf1 {
  position: absolute;
  top: 195px;
  left: 450px;
  font-size: 22px;
  /* font-weight: bold; */
  color: white;
  width: 700px;
  height: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}


.headinf2 {
  position: absolute;
  top: 200px;
  left: 1200px;
}
.left {
  /* position: absolute; */
  left: 320px;
  margin-top: 20px;
  margin-left: 300px;
  width: 65vw;
  height: 585px;
  display: block;
  /* position: relative; */
}

.btn{
  height: 40px;
  width: 100px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
.btn1{
  background-color:#3cced0;
}

</style>
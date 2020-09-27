<template>
  <div id="app">
    <div id="nav">
      <ul class="myul">
        <li>
          <router-link to="/">
            <img class="pipishuLogo" src="@/assets/img/pipishuLogo.png" />
          </router-link>
        </li>
        <li>
          <router-link to="/my">我的</router-link>
        </li>
        <li>
          <router-link to="/Download">APP下载</router-link>
        </li>
        <li>
          <router-link to>
            <input
              type="text"
              @keydown.enter="mysearchKeywords"
              class="mysearchC"
              v-model="mysearchnr"
            />
          </router-link>
          <el-button @click="mysearchKeywords" icon="el-icon-search" class="mysearchbutton"></el-button>
        </li>
        <li>
          <router-link to="/my">
            <img class="UserImg" :src="UserImg" />
          </router-link>
        </li>
        <li>
          <span class="shangchuan" @click="userLogin">上传作品</span>
          <!-- <span class="shangchuan">上传作品</span> -->
        </li>
      </ul>
    </div>
    <div class="kong"></div>
    <router-view />
    <player />
    <loginwindow @myloginF="myloginzz" v-if="login==1"></loginwindow>
  </div>
</template>
<script>
import UserImg from "@/assets/img/UserImg.png";
export default {
  data() {
    return {
      UserImg: UserImg,
      mysearchnr: "",
      login: 0,
    };
  },
  watch: {
    mysearchnr() {
      console.log(this.mysearchnr);
      this.mysearchnr = this.mysearchnr;
    },
  },
  methods: {
    mysearchKeywords() {
      console.log(this.mysearchnr);
      this.$router.push(`/search/${this.mysearchnr}`);
      this.$router.go(0);
    },
    getByKey(key) {
      let name = key + "=";
      let ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return null;
    },
    myloginzz() {
      this.login = 0;
    },
    userLogin() {
      if (this.getByKey("user_id")) {
        let path = "/uploading";
        this.$router.push(path);
      } else {
        this.login = 1;
      }
    },
    getmyuserimg() {
     this.$http
      .get("http://127.0.0.1:7001/getAnuserInf", {
        params: {
          user_id: this.getByKey("user_id"),
        },
      })
      .then((res) => {
        console.log(res.data);
        this.UserImg = res.data[0].userimg;
      });
  },
  },
  
  mounted() {
    if (document.cookie) {
      console.log(this.getByKey("user_id"));
      this.getmyuserimg();
    }
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

#nav {
  width: 100%;
  border-bottom: 2px solid rgb(218, 218, 218);
  background-color: #fff;
  box-shadow: 1px 5px 10px rgba(250, 250, 250, 1);
  position: fixed;
  top: 0;
  z-index: 2000;
  a {
    color: #2c3e50;
    font-size: 25px;
    text-decoration: none;
    &.router-link-exact-active {
      color: #3cced0;
    }
  }
}
.pipishuLogo {
  height: 30px;
}
.router-link-active {
  line-height: 30px;
}
#nav router-link {
  float: left;
}
.myul {
  min-width: 1200px;
  overflow: hidden;
  list-style: none;
  margin: 0 185px;
  height: 70px;
}

.myul li {
  float: left;
  padding-right: 40px;
  margin-top: 20px;
}
.mysearchC {
  width: 240px;
  height: 30px;
  border-radius: 17px;
  outline: medium;
  border: 1px solid #3cced0;
  padding-top: 0px;
  padding-left: 15px;
}
.kong {
  height: 72px;
}
.el-button {
  height: 34px !important;
  margin-left: -15px !important;
  border-radius: 0 17px 17px 0 !important;
  color: #fff !important;
  background-image: linear-gradient(90deg, #55d1d3 1%, #3cced0 99%) !important;
}
.UserImg {
  height: 40px;
  border-radius: 20px;
  margin-left: 100px;
}
.el-icon-search {
  position: relative;
  top: -2px;
}
.shangchuan {
  display: inline-block;
  font-size: 25px;
}
.shangchuan:hover {
  cursor: pointer;
}
</style>

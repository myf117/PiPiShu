<template>
  <div>
    <div class="leftbox">

          <div class="albinf"  v-for="item in userAlbum" :key="item.id" @click="changeAlbum(item)">
          <img :src="item.album_url" alt />
          <p>{{item.album_name}}</p>

       <!-- <div v-else>
          <div  class="kongde">
              <p>TA还没有专辑哦~</p>
        </div> -->

       </div>
    </div>

    <div class="rightbox">
      <p class="p1">
        <i class="el-icon-s-order"></i>TA的资料
      </p>
      <hr />
      <p class="p2" v-if="userinf[0]">
        <i class="el-icon-user"></i>
        {{userinf[0].nickname}}
      </p>
      <p v-if="1" class="el-icon-s-custom">fans：{{follower}}</p>
      <div class="userfollow">
        <br />
        <p class="p1">
          <i class="el-icon-circle-plus"></i>
          TA的关注({{hisStar.length}})
        </p>
        <hr />
        <div class="imgbox" >
          <img v-for="item in hisStar" :key="item.id" @click="toUserMain(item)" :src="item.userimg" alt />
        </div>
      </div>
    </div>

    <!-- <div class="bottombox">
      <el-tabs>
        <el-tab-pane label="TA的声音" name="first"></el-tab-pane>
      </el-tabs>
    </div> -->
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      userAlbum: [],
      userinf: [],
      follower: "",
      alluser: [],
      hisStar: [],
    };
  },
  created() {
    this.getUserAlbum();
    this.getAnuserInf();
    this.getfollow();
    this.getUserInf();
  },
  methods: {
    getUserAlbum() {
      console.log(this.$route.params.u_id);
      this.$http
        .get("http://localhost:7001/getUserAlbum", {
          params: {
            u_id: this.$route.params.u_id,
          },
        })
        .then((res) => {
          this.userAlbum = res.data;
        })
        .catch((err) => {
          console.log(222);
        });
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
    getfollow() {
      // console.log(this.list[0].u_id);
      this.$http
        .get("http://localhost:7001/getfollow", {
          params: {
            ustar_id: this.$route.params.u_id,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.follower = res.data.length;
        })
        .catch((err) => {
          console.log(222);
        });
    },
    getStar() {
      this.$http
        .get("http://localhost:7001/getStar", {
          params: {
            ufans_id: this.$route.params.u_id,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.star = res.data;
          console.log(this.star);
          for (let i = 0; i < this.star.length; i++) {
            for (let j = 0; j < this.alluser.length; j++) {
              if (this.star[i].ustar_id == this.alluser[j].user_id) {
                this.hisStar.push(this.alluser[j]);
              }
            }
          }
        })
        .catch((err) => {
          console.log(222);
        });
    },
    getUserInf() {
      this.$http
        .get("http://localhost:7001/getUserInf", {})
        .then((res) => {
          this.alluser = res.data;
          this.getStar();
        })
        .catch((err) => {
          console.log(222);
        });
    },
    toUserMain(item) {
      // console.log(item);
      let path = `/zhubo/${item.user_id}/userindex`;
      document.cookie = "activename=first";
      if (path) {
        this.$router.push(path);
        this.$router.go(0);
      }
    },
    changeAlbum(item) {
      // console.log(item.album_id);
      let path = `/youshengintr/${item.album_id}`;
      if (path) {
        this.$router.push(path);
        this.$router.go(0);
      }
    },
  },
};
</script>

<style scoped>
/* .kongde{
  width: 100%;
  height:150px ;
  text-align: center;
  line-height: 150px;
} */
.p1 {
  padding: 10px 0;
}
.p2 {
  padding-bottom: 5px;
}
.leftbox {
  width: 700px;
  /* height: 570px; */
  display: flex;
  flex-wrap: wrap;
  /* overflow: hidden; */
}
.albinf {
  margin: 5px 15px 9px;
  /* display: flex;
  flex-wrap: wrap */
}
.albinf:hover {
  cursor: pointer;
}
.albinf img {
  width: 140px;
  height: 140px;
  border-radius: 5px;
}
.rightbox {
  width: 250px;
  height: 300px;
  /* background-color: #ccc; */
  position: absolute;
  top: 455px;
  left: 1048px;
}
.bottombox {
  width: 670px;
  height: 640px;
  /* background-color: cadetblue; */
  margin-top: 10px;
}
.albinf p {
  /* display: inline-block; */
  width: 140px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.imgbox {
  width: 100%;
  display: flex;

}
.imgbox img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
}
</style>
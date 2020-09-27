<template>
  <div class="contanier"  v-if="userinf[0]">
    <p class="zhub"><i class="el-icon-user-solid"></i>专辑主播</p>
    <hr />
    <div class="topbox">
      <div class="user" @click="toUserMain(userinf)">
        <img class="headimg" :src="userinf[0].userimg" alt />
        <span>{{userinf[0].nickname}}</span>
      </div>
      <div class="userinf" v-if="1">
          <span><i class="el-icon-user"></i>粉丝数：{{follower}}</span>
          <span>专辑数：{{AlbumNum}}</span><br><br>
          <p class="userintr" v-if="userinf[0]">简介：{{userinf[0].userintr}}</p>
      </div>
    </div>
    <div class="bottombox">
      <div class="bottom1"><span class="span1" @click="toUserAlbum(userinf)"><i class="el-icon-video-play"></i>TA的专辑</span><span class="span2" @click="toUserAlbum(userinf)">更多</span></div>
      <hr>
      <br>
      <div class="showAlbum">
        <ul v-if="showAlbum">
          <li v-for="item in showAlbum" :key="item.id" class="showAlbumLi" @click="changeAlbum(item)">
            <img :src="item.album_url" alt="">
            <div class="liRight">
             <div class="lir">
                <span class="albumname">{{item.album_name}}</span><br>
              <i class="el-icon-headset"></i> <span  v-if="item.album_amount.toString().length<5">{{item.album_amount}}</span>
              <span  v-else-if="item.album_amount.toString().length<9">{{(item.album_amount/10000).toFixed(2)+"万"}}</span>
              <span  v-else-if="item.album_amount.toString().length>=9">{{(item.album_amount/100000000).toFixed(2)+"亿"}}</span>
             </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
import userAlbumVue from '../zhubo/userAlbum.vue';
export default {
  //   beforeCreated() {
  //       this.getoneAlbum()
  //   },
  created() {
    this.getoneAlbum();
  },
  data: function () {
    return {
      list: [],
      userinf: [],
      userAlbum:[],
      follower:"",
      AlbumNum:"",
      showAlbum:[]
    };
  },
  methods: {
    getoneAlbum() {
      this.$http
        .get("http://localhost:7001/getoneAlbum", {
          params: {
            album_id: this.$route.params.album_id,
          },
        })
        .then((res) => {
          this.list = res.data;
          //   console.log(this.list[0]);
          this.getAnuserInf();
          this.getfollow();
          this.getUserAlbum()
        })
        .catch((err) => {
          console.log(222);
        });
    },
    getAnuserInf() {
      this.$http
        .get("http://localhost:7001/getAnuserInf", {
          params: {
            user_id: this.list[0].u_id,
          },
        })
        .then((res) => {
          this.userinf = res.data;
        })
        .catch((err) => {
          console.log(222);
        });
    },
    getfollow(){
        // console.log(this.list[0].u_id);
        this.$http
        .get("http://localhost:7001/getfollow", {
          params: {
            ustar_id: this.list[0].u_id,
          },
        })
        .then((res) => {
          this.follower=res.data.length;
        })
        .catch((err) => {
          console.log(222);
        });
    },
    //根据u_id获得他所有专辑
    getUserAlbum(){
      console.log(this.list[0].u_id);
        this.$http
        .get("http://localhost:7001/getUserAlbum", {
          params: {
            u_id: this.list[0].u_id,
          },
        })
        .then((res) => {
          this.userAlbum=res.data
          this.showAlbum=this.userAlbum.slice(0,4)
          this.AlbumNum=(this.userAlbum).length
        })
        .catch((err) => {
          console.log(222);
        });
    },
    changeAlbum(item){
      let path=`/youshengintr/${item.album_id}`
      if (path) {
        this.$router.push(path);
        this.$router.go(0)
      }
    },
    //
     toUserMain(userinf){
       let path=`/zhubo/${userinf[0].user_id}/userindex`
       document.cookie="activename=first"
       if (path) {
        this.$router.push(path);
        this.$router.go(0)
      }
    },
    toUserAlbum(userinf){
      let path=`/zhubo/${userinf[0].user_id}/userAlbum`
      document.cookie="activename=second"
      if (path) {
        this.$router.push(path);
      }
    },
   
  },
};
</script>

<style scoped>
.zhub{
  padding: 10px 10px;
}
.contanier {
  width: 260px;
  
  /* background-color: #cccccc; */
 
}
.lir{
  padding-left: 10px;
  padding-top:10px ;
}
.headimg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  float: left;
}
.topbox span {
  padding-top: 13px;
  padding-left: 13px;
  float: left;
}
.userinf{
  font-size: 12px;
  padding-top: 55px;
}
.userintr{
  padding:10px 10px 14px 12px;
  max-height: 40px;
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
}
.bottom1{
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
.span1:hover{
  cursor: pointer;
  color: #3cced0;
}
.span2:hover{
  cursor: pointer;
  color: #3cced0;
}
.showAlbum{
  left: 0;
}
.showAlbum img{
  width: 60px;
  height: 60px;
}
.showAlbum li{
  list-style: none;
  margin-left: 7px;
  border-bottom:1px dashed;
  margin-bottom: 5px;
}
.liRight{
  width: 150px;
  height: 60px;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
}

.showAlbum li:hover{
  cursor: pointer;
}
.showAlbum li:hover .albumname{
  color: #3cced0;
}
.user:hover{
  color: #3cced0;
  cursor: pointer;
}

</style>
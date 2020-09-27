<template>
   <div>
       <div>
    <div>
      <div class="topbox">
        <span>TA共有<span class="yangshi">{{followLen}}</span>个粉丝</span>
        <!-- <div><i class="el-icon-search"></i><input @click="serchAlb" class="searchinp"  placeholder="请搜索专辑"></div> -->
      </div>
      <hr />
      <div class="albbox">
        <div class="AlbumLis" v-for="item in hisfans" :key="item.id" @click="toUserMain(item)">
          <img :src="item.userimg" alt />
          <div class="albinf">
            <b>{{item.nickname}}</b>
            <inf :myitem="item"></inf>
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>

   </div>
</template>

<script>
import inf from "./inf.vue"
export default {
    data:function () {
        return {
            alluser:[],
            hisfans:[],
            follower:[],
            followLen:"",
            starLen:"",
            star:[]
        }
    },
    components:{
      inf
    },
    created(){
        this.getUserInf()
    },
    methods:{
        getUserInf() {
      this.$http
        .get("http://localhost:7001/getUserInf", {})
        .then((res) => {
          this.alluser = res.data;
           this.getfollow(),
        this.getStar()
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
          this.star = res.data
          this.starLen=this.star.length
          
        })
        .catch((err) => {
          console.log(222);
        });
    },
    getfollow(){
        this.$http
        .get("http://localhost:7001/getfollow", {
          params: {
            ustar_id: this.$route.params.u_id,
          },
        })
        .then((res) => {
          this.follower=res.data;
          this.followLen=this.follower.length
          console.log(this.follower);
          for (let i = 0; i < this.follower.length; i++) {
            for (let j = 0; j < this.alluser.length; j++) {
              if (this.follower[i].ufans_id == this.alluser[j].user_id) {
                this.hisfans.push(this.alluser[j]);
              }
            }
          }
          
        })
        .catch((err) => {
          console.log(222);
        });
    },
     toUserMain(item){
       let path=`/zhubo/${item.user_id}/userindex`
       document.cookie="activename=first"
       if (path) {
        this.$router.push(path);
        this.$router.go(0)
      }
    },
    }
}
</script>

<style scoped>
.searchinp{
   width: 110px;
   height: 30px;
   border-radius: 25px;
   border: 1px solid;
  outline:none
 }
 .topbox{
   display: flex;
   justify-content: space-between;
   margin-bottom: 5px;
 }
 .AlbumLis{
   margin-left: 10px;
   margin: 13px 0;
 }
 .AlbumLis :hover{
   cursor: pointer;
 }
  .AlbumLis img{
   height: 70px;
   width: 70px;
   border-radius: 5px;
 }
 .albinf p{
   padding-top: 27px;
 }
 .albinf b:hover{
   color: #3cced0;
   cursor: pointer;
 }
 .albinf{
   display: inline-block;
   /* width: 50px; */
   height: 27px;
   padding:0 10px;
   line-height: 50px;
 }
 .albbox{
   overflow-y:auto; 
  overflow-x:auto; 
  width:100%; 
  height:500px;
 }
 .yangshi{
  color: #3cced0;
  padding: 0 2px;
  font-weight: bold;
}
</style>
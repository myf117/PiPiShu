<template>
  <div class="rankbox">
    <h3>最热主播榜</h3>
    <div class="rank" v-for="(item,index) in hotStar" :key="item.id" @click="toUserMain(item)">
      <i class="hot">{{index+1}}</i>
      <span>{{item.nickname}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      starlist: [],
      alluser:[],
      hotStar:[]
    };
  },
  created() {
    this.getUserInf();
  },
  methods: {
    getAllStar() {
      this.$http
        .get("http://localhost:7001/getAllStar", {})
        .then((res) => {
          this.starlist = res.data;
          console.log(this.starlist);
            for (let i = 0; i < this.starlist.length; i++) {
            for (let j = 0; j < this.alluser.length; j++) {
              if (this.starlist[i].ustar_id == this.alluser[j].user_id) {
                this.hotStar.push(this.alluser[j]);
              }
            }
          }
          this.hotStar=this.hotStar.slice(0,4)
        //   console.log(this.hotStar);
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
          this.getAllStar();
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
    }
   
  },
};
</script>

<style scoped>
.rankbox{
    width: 280px;
    height: 200px;
    position: absolute;
    left: 900px;
    top: 15px;
}
.rank{
    margin-top: 17px;
    width: 100%;
    height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.hot{
    display: inline-block;
    width: 30px;
    height:20px ;
    font-style: normal;
    margin-right: 10px;
    text-align: center;
}
.rank :hover{
    color: #3cced0;
    cursor: pointer;
}

.rank:nth-child(2) .hot{
  background-color: rgb(250, 0, 0);  
}

.rank:nth-child(3) .hot{
    background-color: rgb(250, 133, 0);;
}
.rank:nth-child(4) .hot{
  background-color: rgb(250, 204, 0);
}
</style>
<template>
  <div>
    <div class="topbox">
      <span>TA共有<span class="yangshi">{{albumLen}}</span>张专辑</span>
      <div>
        <i class="el-icon-search"></i>
        <input class="searchinp" v-model.lazy="keyword" placeholder="请搜索专辑" />
      </div>
    </div>
    <hr />
    <div class="albox">
      <div v-if="mylist.length==0">
        <div class="AlbumLis" v-for="item in userAlbum" :key="item.id"  @click="changeAlbum(item)">
          <img :src="item.album_url" >
          <div class="albinf">
            <b>{{item.album_name}}</b>
            <p>
              <i class="el-icon-headset"></i>
              <span
                v-if="item.album_amount.toString().length<5"
              >{{item.album_amount}}</span>
              <span
                v-else-if="item.album_amount.toString().length<9"
              >{{(item.album_amount/10000).toFixed(2)}}万</span>
              <span
                v-else-if="item.album_amount.toString().length>=9"
              >{{(item.album_amount/100000000).toFixed(2)}}亿</span>
            </p>
          </div>
          <hr />
        </div>
        
      </div>
      <div v-else>
        <div class="AlbumLis" v-for="item in mylist" :key="item.id">
          <img :src="item.album_url" alt />
          <div class="albinf">
            <b>{{item.album_name}}</b>
            <p>
              <i class="el-icon-headset"></i>
              <span
                v-if="item.album_amount.toString().length<5"
              >{{item.album_amount}}</span>
              <span
                v-else-if="item.album_amount.toString().length<9"
              >{{(item.album_amount/10000).toFixed(2)}}万</span>
              <span
                v-else-if="item.album_amount.toString().length>=9"
              >{{(item.album_amount/100000000).toFixed(2)}}亿</span>
            </p>
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      userAlbum: [],
      albumLen: "",
      keyword: "",
      mylist: [],
    };
  },
  created() {
    this.getUserAlbum();
  },
  watch: {
    keyword: function () {
      this.mylist = this.userAlbum.filter((item) => {
        return item.album_name.indexOf(this.keyword) != -1;
      });
    },
  },
  
  methods: {
    getUserAlbum() {
      this.$http
        .get("http://localhost:7001/getUserAlbum", {
          params: {
            u_id: this.$route.params.u_id,
          },
        })
        .then((res) => {
          this.userAlbum = res.data;
          this.albumLen = this.userAlbum.length;
        })
        .catch((err) => {
          console.log(222);
        });
    },
    changeAlbum(item){
      // console.log(item.album_id);
      let path=`/youshengintr/${item.album_id}`
      if (path) {
        this.$router.push(path);
        this.$router.go(0)
      }
    },
  },
};
</script>

<style scoped>
.searchinp {
  width: 110px;
  height: 30px;
  border-radius: 25px;
  border: 1px solid;
  outline: none;
}
.topbox {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.AlbumLis {
  margin-left: 10px;
  margin: 13px 0;
}
.AlbumLis:hover{
  cursor: pointer;
}
.AlbumLis img {
  height: 70px;
  width: 70px;
  border-radius: 5px;
}
.albinf p {
  padding-top: 27px;
}
.albinf b:hover {
  color: #3cced0;
  cursor: pointer;
}
.albinf {
  display: inline-block;
  /* width: 50px; */
  height: 50px;
  padding: 0 10px;
  /* line-height: 50px; */
}
.albox{
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
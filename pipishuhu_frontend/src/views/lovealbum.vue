<template>
  <div id="loveBox">
    <!-- 喜欢专辑列表 -->
    <div class="album">
      <div class="album-type">
        <span>猜你喜欢</span>
        <span @click="changePath">换一批</span>
      </div>

      <!-- 具体专辑 -->
      <!-- <albumitem :albumxinxi="mylist"></albumitem> -->
      <div id="albumBox">
        <albumitem :el="el" v-for="el in mylist" :key="el.id"></albumitem>
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  data: function () {
    return {
      list: [],
      mylist: [],
      userArr: [],
      i: 0,
    };
  },
  created() {
    this.$http
      .get("http://localhost:7001/getUserInf", {})
      .then((res) => {
        this.userArr = res.data;
        this.getAlbum("娱乐");
      }) 
      .catch((err) => {});
  },
  methods: {
    changePath() {
      this.i = this.i > this.list.length / 5 ? 0 : this.i + 5;
      this.mylist = this.list.slice(this.i, this.i + 5);
      console.log(this.list)
    },
    getAlbum(kind) {
      this.$http
        .get("http://localhost:7001/getAlbum", {
          params: {
            kind: kind,
          },
        }) 
        .then((res) => {
          this.list = res.data;
          
          this.list.forEach((el1) => {
            this.userArr.forEach((el2) => {
              if (el1.u_id == el2.user_id) {
                el1.nickname = el2.nickname;
              }
            });
          });

          this.mylist = this.list.slice(this.i, this.i + 5);
        })
        .catch((err) => {
          alert("axios请求失败");
        });
    },
  },
};
</script>
 
<style scoped>
#loveBox {
  margin-bottom: 30px;
  cursor: pointer;
}
.album {
  width: 800px;
}
.album-type {
  height: 40px;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  padding-left: 20px;
}

#albumBox {
  width: 100%;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.album-type span:first-child {
  font-size: 20px;
}
</style>
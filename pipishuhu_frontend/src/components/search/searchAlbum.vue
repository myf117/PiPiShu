<template>
  <div id="container">
    <toptypeof></toptypeof>
    <p>
      共
      <span id="number">{{mylist.length}}</span> 个搜索记录
    </p>
    <div class="line"></div>

    <div id="album">
      <albumitem :el="item" v-for="item in pagelist" :key="item.id"></albumitem>
    </div>

    <div id="btnBox">
      <button class="btn" @click="pagenum" v-for="(item,index) in page" :key="index">{{index+1}}</button>
    </div>
  </div>
</template> 
 
<script>
// import Bus from "../../Bus.js";
import toptypeof from "./toptypeof.vue";
export default {
  data: function () {
    return {
      mylist: [],
      userArr: [],
      myuser: [],
      list: [],
      page: "",
      pagelist: [],
    };
  },
  components: {
    toptypeof,
  },
  mounted() {
    // 取出用户信息
    this.$http
      .get("http://localhost:7001/getUserInf", {})
      .then((res) => {
        // console.log(res.data)
        this.userArr = res.data;
        this.myuser = this.userArr.filter((el) => {
          return el.nickname.indexOf(`${this.$route.params.kw}`) != -1;
        });
        this.getAllAlbum();
      })
      .catch((err) => {
        console.log(222);
      });
  },
  methods: {
    getAllAlbum() {
      this.$http
        .get("http://localhost:7001/getAllAlbum", {})
        .then((res) => {
          this.list = res.data;
          // console.log(this.list)

          //给专辑添加所属用户名
          this.list.forEach((el1) => {
            this.userArr.forEach((el2) => {
              if (el1.u_id == el2.user_id) {
                el1.nickname = el2.nickname;
              }
            });
          });
          // this.getAudio();

          //专辑名称有关键字
          this.mylist = this.list.filter((el) => {
            return el.album_name.indexOf(`${this.$route.params.kw}`) != -1;
          });
          
          //专辑发布者有关键字
          // this.mylist = this.mylist.concat(
          //   this.list.filter((el) => {
          //     return el.nickname.indexOf(`${this.$route.params.kw}`) != -1;
          //   })
          // );

          this.page = Math.ceil(this.mylist.length / 5);
          this.pagelist = this.mylist.slice(0, 5);
        })
        .catch((err) => {
          // console.log("axios请求失败取全");
        });
    },

    //分页查询
    //  1   5*0-5*1   5*(num-1)---5*num
    //  2   5*1-5*2
    pagenum(el) {
      // console.log(this.mylist);
      // console.log(el);
      let num = el ? el.target.innerHTML : 1;
      this.pagelist = this.mylist.slice(5 * (num - 1), num * 5);
    },
  },
};
</script>

<style scoped>
#container {
  width: 800px;
}
p {
  margin: 10px 0;
}
#number {
  color: #3cced0;
}
.line {
  height: 2px;
  background-color: rgb(224, 224, 224);
}
#album {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
}
#btnBox {
  text-align: center;
}
.btn {
  width: 24px;
}
</style>
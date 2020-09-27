<template>
  <div id="box" @click="changePath">
    <div class="album-type">
      <!-- 类别和关键字 -->
      <div class="albumKw">
        <h3>{{item.sort}}</h3>
        <div id="kw" @click="searchKw">
          <span v-for="(item,index) in item.kw" :key="index">{{item}}</span>
        </div>
      </div> 

      <span>更多</span>
    </div>

    <div id="album" @click="enterAlbum">
      <albumitem :el="el" v-for="el in list" :key="el.id"></albumitem>
    </div>
  </div>
</template>
  
<script>
export default {
  data: function () {
    return {
      list: [],
      userArr: [],
    };
  },
  props: ["listType", "item"],
  mounted() {
    this.$http
      .get("http://localhost:7001/getUserInf", {})
      .then((res) => {
        this.userArr = res.data;
        this.getAlbum(this.item.sort);
      })
      .catch((err) => {});
  },
  methods: {
    // 跳类别
    changePath(el) {
      // console.log(el.target.innerHTML)
      let path;
      switch (el.target.innerHTML) {
        case "有声书":
          path = "/youshengshu";
          break;
        default:
          break;
      }
      
      if (path) {
        this.$router.push(path);
      }
    },
    // 跳search
    searchKw(el) {
      console.log(el.target.innerHTML)
      let path;
      if (el.target.innerHTML.length < 10) {
        path = `/search/${el.target.innerHTML}`;
      }
      if (path) {
        this.$router.push(path);
      }
    },

    enterAlbum(el) {
      // console.log(this.item.sort, el.target);
      let path;
      switch (this.item.sort) {
        case "有声书":
          break;

        default:
          break;
      }
      if (path) {
        this.$router.push(path);
      }
    },

    // 根据类别取出专辑
    getAlbum(kind) {
      this.$http
        .get("http://localhost:7001/getAlbum", {
          params: {
            kind: kind,
          },
        })
        .then((res) => {
          this.list = res.data.splice(0, 10);

          // console.log(this.list)
          this.list.forEach((el1) => {
            this.userArr.forEach((el2) => {
              if (el1.u_id == el2.user_id) {
                el1.nickname = el2.nickname;
              }
            });
          });
        })
        .catch((err) => {
          alert("axios请求失败");
        });
    },
  },
};
</script>

<style scoped>
#box {
  width: 800px;
  margin-bottom: 5px;
  cursor: pointer;
}
.album-type {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.album-type > span:last-child {
  color: #72727b;
}
.albumKw {
  display: flex;
}
#kw span {
  font-size: 12px;
  margin: 0 14px;
}

#album {
  margin-bottom: 46px;
  width: 100%;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

</style>
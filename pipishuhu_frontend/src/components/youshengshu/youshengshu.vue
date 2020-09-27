<template>
  <div id="kindPage">
    <p></p>
    <p>全部分类 ></p>
    <img src="../../assets/img/allsort.png" alt />
    <h3>有声小说</h3>
    <div>
      <div id="albumBox">
        <albumitem :el="el" v-for="el in albumKind" :key="el.id"></albumitem>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      albumKind: "",
    };
  },
  components: {},
  created() {
    this.$http
      .get("http://localhost:7001/getRankAlbum", {
        params: {
          kind: "有声书",
        },
      })
      .then((res) => {
        // console.log(res.data);
        this.albumKind = res.data;
      })
      .catch((err) => {
        console.log("axios请求失败");
      });
  },
};
</script>

<style scoped>
#kindPage {
  width: 1120px;
  margin: 20px auto;
  padding: 0px;
}

#kindPage > img {
  margin: 20px 0;
  width: 100%;
}

#albumBox {
  margin-top: 10px;
  width: 800px;
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
}
</style>
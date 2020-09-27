<template>
  <div>
    <div class="box">
      <h3 @click="changePath">{{kind}}推荐榜</h3>
      <br />
      <ul>
        <li v-for="item in albnum1" :key="item.id" class="ol1" @click="ToAlbumintr(item)">
          <div class="box2">
            <i class="circle"></i>
            <span class="tr">
              <em class="triangle"></em>
            </span>
            <img class="img1" :src="item.album_url" alt />
            <img class="img2" src="../assets/img/play2.png" alt />
            <div class="album_inf">
              <b>{{item.album_name}}</b>
              <br />
              <span class="albintro">{{item.nickname}}</span>
            </div>
          </div>
        </li>
        <li v-for="(item,index) in albnum2" :key="item.id" class="ol2" @click="ToAlbumintr(item)">
          <span class="s1">{{index+4}} {{item.album_name}}</span>
          <!-- <span class="s2"> </span> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      albnum1: [],
      albnum2: [],
    };
  },
  props: ["kind"],
  created() {
    this.getRankAlbum();
  },
  methods: {
    getRankAlbum() {
      this.$http
        .get("http://localhost:7001/getRankAlbum", {
          params: {
            kind: this.kind,
          },
        })
        .then((res) => {
          // console.log(res.data);
          let list = res.data;
          list.sort(function () {
            return Math.random() - 0.5;
          });
          this.albnum1 = list.slice(0, 3);
          this.albnum2 = list.slice(3, 6);
        })
        .catch((err) => {
          console.log(222);
        });
    },
    //排序

    // handleckick(el){
    //   console.log(el.target.innerHTML);
    // },
    changePath(el) {
      console.log(el.target.innerHTML);
      var path;
      switch (el.target.innerHTML) {
        case "有声书飙升榜":
          path = "/youshengshu";
          break;
        default:
          break;
      }
      if (path) {
        this.$router.push(path);
      }
    },
    ToAlbumintr(item) {
      console.log(item);
      var path;
      var kind = item.kind;
      switch (kind) {
        case "有声书":
          path = `/youshengintr/${item.album_id}`;
          break;
        default:
          break;
      }
      if (path) {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style scoped>
.s1 {
  padding-left: 0px;
  padding-right: 14px;
  color: rgb(94, 94, 97);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 200px;
  display: inline-block;
}
.s2 {
  padding-left: 20px;
}
p {
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: #333;
  padding: 10px;
}
p:hover {
  cursor: pointer;
  color: #3cced0;
}
.box {
  height: 457px;
  width: 250px;
  margin-top: 12px;
  margin-bottom: 22px;
}
.ol1 {
  list-style: none;
  cursor: pointer;
}
.img1 {
  width: 80px;
  height: 80px;
  position: absolute;
  border-radius: 5px;
}
.img2 {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 25px;
  left: 22px;
  display: none;
}
.ol1:hover .img2 {
  display: block;
}
.ol1:hover .album_inf b {
  color: #3cced0;
}
.circle {
  width: 80px;
  height: 80px;
  background-color: black;
  border-radius: 50%;
  /* float: left; */
  position: absolute;
  left: 10px;
}
.album_inf {
  width: 100px;
  height: 80px;
  float: right;
  margin-right: 40px;
  padding-top: 20px;
}
ul {
  margin-bottom: 20px;
  padding-left: 3px;
  list-style: none;
}
li {
  margin-bottom: 12px;
}
.box2 {
  height: 90px;
  position: relative;
}
.box3 {
  height: 30px;
}
.ol2 {
  margin-left: 5px;
  margin-bottom: 12px;
}
b {
  width: 115px;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}
b:hover {
  color: #3cced0;
}
.triangle {
  /* color: rgb(252, 23, 51); */
  width: 0;
  height: 0;
  border-right: 16px solid transparent;
}
.tr {
  position: absolute;
  left: 0px;
  top: 16px;
  z-index: 2;
}
.albintro {
  display: inline-block;
  width: 150px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.ol2 span:hover {
  cursor: pointer;
  color: #3cced0;
}
.ol1:nth-child(1) .triangle {
  border-top: 16px solid rgb(250, 0, 0);
}

.ol1:nth-child(2) .triangle {
  border-top: 16px solid rgb(250, 133, 0);
}

.ol1:nth-child(3) .triangle {
  border-top: 16px solid rgb(250, 204, 0);
}
</style>
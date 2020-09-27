<template>
  <div class="rank-list">
    <div class="rank-con" v-for="(item,index) in kinds" :key="index">
      <div @click="Torankcon" class="title">
        <span class="title-left">{{item}}排行榜</span>
        <span class="title-right">
          <span class="yincang">{{item}}排行榜</span>
        </span>
      </div>
      <div class="rank-album">
        <rankItem :kind="item"></rankItem>
      </div>
    </div>
  </div>
</template>
<script>
import rankItem from "./rankItem.vue";
import { log } from 'util';
export default {
  data: function () {
    return {
      kinds: ["有声书", "相声评书", "音乐", "娱乐"],
    };
  },
  methods: {
    Torankcon(el) {
      console.log(el.target.innerHTML);
      let path;
      switch (el.target.innerHTML) {
        case "有声书排行榜":
          document.cookie = "kind=first";        
          console.log(document.cookie);
          path = "/rankcon/rankconItem";
          break;
        case "相声评书排行榜":
          document.cookie = "kind=second";
          path = "/rankcon/rankItemXiangSheng";
          break;
        case "音乐排行榜":
          document.cookie = "kind=fifth";
          path = "/rankcon/rankconItem";
          break;
        case "娱乐排行榜":
          document.cookie = "kind=sexth";
          path = "/rankcon/rankItemYuLe";
          break;
        default:
          break;
      }
      if (path) {
        this.$router.push(path);
      }
    },
  },
  components: {
    rankItem: rankItem,
  },
};
</script>

<style scoped="scoped">
.rank-list {
  min-width: 1115px;
  display: flex;
}
.rank-con {
  width: 240px;
  margin: 0 16px;
}
.title {
  width: 100%;
  margin: 5px 0 20px 0;
  position: relative;
}
.title-left {
  display: inline-block;
  font-size: 20px;
  height: 25px;
  padding: 0 8px;
  background-image: linear-gradient(#fff, #a8aeec);
}
.title-right {
  display: inline-block;
  width: 40px;
  height: 19px;
  margin: 3px 0;
  background-image: url("https://s1.xmcdn.com/yx/ximalaya-web-static/last/dist/images/all_bfd2513.png");
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  right: 0;
  top: 3px;
}
.title-right img {
  width: 40px;
  height: 19px;
  position: absolute;
  z-index:1000;
}
.yincang {
  position: absolute;
  font-size:10px;
  top: -5px;
  color: rgba(0,0,0,0);
}

.title-left:hover,
.title-right:hover {
  cursor: pointer;
}
</style>
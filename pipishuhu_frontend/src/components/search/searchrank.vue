<template>
  <div id="box" v-if="ranklist.length">
    <slot></slot>
    <div class="rankBox">
      <div class="rankitem" v-for="(item,index) in ranklist" :key="item.id">
        <div class="bothOrder">{{index+1}}</div>
        <span @click="enterAlbum(item)">{{item.album_name}}</span>
      </div>
    </div>
  </div>
</template>  
 
<script>
export default {
  props: {
    ranklist: {
      default: function () {
        return [];
      },
    },
  },
  methods: {
    enterAlbum(albumInf) {
      console.log(albumInf);
      // /专辑类别/专辑id
      let path;
      switch (albumInf.kind) {
        case "有声书":
          path = `/youshengintr/${albumInf.album_id}`;
          break;
        case "娱乐":
          path = `/yule/${albumInf.album_id}`;
          break;
        default:
          break;
      }
      if(path){
        this.$router.push(path);
      }
    },
  },
};
</script>

<style scoped>
#box {
  width: 220px;
}

.rankitem {
  margin-bottom: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.bothOrder {
  width: 20px;
  border-radius: 4px;
  margin-right: 10px;
  text-align: center;
  float: left;
}

.rankBox {
  cursor: pointer;
}

.rankBox .rankitem:nth-child(1) div {
  background-color: rgb(250, 0, 0);
  color: white;
}

.rankBox .rankitem:nth-child(2) div {
  background-color: rgb(250, 133, 0);
  color: white;
}

.rankBox .rankitem:nth-child(3) div {
  background-color: rgb(250, 204, 0);
  color: white;
}
</style>
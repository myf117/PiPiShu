<template>
  <div id="containerr">
    <div id="box">
      <div id="audioInf">
        <img :src="item.albumUrl" alt />
        <div>
          <div class="hoverColor audioName" @click="enterAudio(item)">{{item.audio_name}}</div>
          <div @click="enterAlbum(item.album_id)" class="hoverColor albumName">{{item.albumName}}</div>
          <p id="audioInf-bottom"><i class="el-icon-user"></i>{{item.albumNickname}}  <i class="el-icon-service"></i>{{item.amount}}</p>
        </div> 
      </div> 
      <span>{{item.time.slice(0,10)}}</span>
    </div>

    <div class="line"></div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  props:["item"],
  methods:{
    enterAudio(audioInf){  
      // console.log(audioInf)
      //   /专辑类别/专辑id/音频id
      let path
      switch (audioInf.albumKind) {
        case "有声书":
          path=`/youshengshu/${audioInf.albumId}/${audioInf.audio_id}`
          break;
      
        default:
          break; 
      }
      if(path){
        this.$router.push(path)
      }
    },
    enterAlbum(album_id,kind){
      // this.$router.push(`/youshengintr/${album_id}`)
    }
  }
};
</script>

<style scoped>
#containerr {
  margin-bottom: 20px;
  font-size: 14px;
}
#box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
#audioInf {
  display: flex;
  justify-content: space-between;
}
img {
  width: 80px;
  border-radius: 50%;
  margin-right: 16px;
}

.audioName {
  font-weight: bolder;
}
.hoverColor:hover {
  color: #3cced0;
}
.albumName {
  color: #a3a3ac;
  margin-top: 6px;
}
#audioInf-bottom {
  margin-top: 20px;
}
.line {
  width: 100%;
  height: 2px;
  background-color: rgb(236, 236, 236);
  margin-top: 20px;
}
</style>
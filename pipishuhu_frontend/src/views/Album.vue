<template>
  <div>
    <loginwindow @myloginF="myloginS" v-if="loginif"></loginwindow>
    <rotation></rotation>

    <div id="contentBox">
      <div id="middleListBox">
        <lovealbum></lovealbum>
        <starRank></starRank>
        <albumlist :item="item" v-for="item in type" :key="item.id"></albumlist>
      </div>

      <div class="rightbox">
        <albumRightRank
          class="albumRightRank"
          v-for="(item) in kindArr"
          :key="item.id"
          :kind="item"
        ></albumRightRank>
      </div>
      <ranking></ranking>
    </div>
       <foot class="foot"></foot>

    
  </div>
</template> 

<script>
import albumRightRank from "./albumRightRank.vue";
import Rotation from "./Rotation";
import LoginWindow from "./LoginWindow";

import albumlist from "./albumlist.vue";
import lovealbum from "./lovealbum.vue";
import ranking from "../components/ranking.vue";
import starRank from "./starRank.vue";


export default {
  data: function () {
    return {
      type: [
        {
          id: 1,
          sort: "有声书",
          kw: [
            "上龙快婿",
            "有声的紫荆",
            "盗墓笔记",
            "鬼吹灯",
            "十宗罪",
            "红楼梦",
            "雪中悍刀行",
          ],
        },
        {
          id: 2,
          sort: "相声评书",
          kw: [
            "郭德纲",
            "单天芳",
            "三国演义",
            "德云社",
            "郭德纲单口相声",
            "岳云鹏",
            "岳云鹏高清相声",
          ],
        },
        {
          id: 3,
          sort: "儿童",
          kw: [
            "米小圈上学记",
            "猴子警长探案集",
            "植物大战僵尸",
            "宝宝巴士",
            "儿童睡前故事",
            "神探迈克狐",
            "西游记",
          ],
        },
        {
          id: 4,
          sort: "头条",
          kw: [
            "有声的紫荆",
            "上龙快婿",
            "盗墓笔记",
            "鬼吹灯",
            "十宗罪",
            "红楼梦",
            "雪中悍刀行",
          ],
        },
        {
          id: 5,
          sort: "音乐",
          kw: [
            "有声的紫荆",
            "上龙快婿",
            "盗墓笔记",
            "鬼吹灯",
            "十宗罪",
            "红楼梦",
            "雪中悍刀行",
          ],
        },
        {
          id: 6,
          sort: "娱乐",
          kw: [
            "有声的紫荆",
            "上龙快婿",
            "盗墓笔记",
            "鬼吹灯",
            "十宗罪",
            "红楼梦",
            "雪中悍刀行",
          ],
        },
      ],
      kindArr: ["有声书", "相声评书", "儿童", "头条", "音乐", "娱乐"],
      loginif: false,
    };
  },

  components: {
    lovealbum: lovealbum,
    albumlist: albumlist,
    ranking: ranking,
    albumRightRank: albumRightRank,
    rotation: Rotation,
    starRank:starRank
  },

  methods:{
    myloginS(){
      this.loginif = false;
    }
  },
  mounted(){
    if(!document.cookie){
      this.loginif = true;
    }
  }
};
</script>

<style scoped>
  .rightbox{
    top:252px;
    position: absolute;
    left: 905px;
  }
#contentBox {
  width: 1120px;
  position: relative;
  margin: 0 auto;
}
#middleListBox {
  margin-left: 10px;
}

</style>
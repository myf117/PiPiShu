<template>
  <div class="rotation">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in myimg" :key="item.id">
        <img :src="item.src" class="medium" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myimg: [
        {
          src:
            "https://imagev2.xmcdn.com/group87/M05/47/2F/wKg5IV9EgnzBjnjnAAI8yesK4NY494.jpg!strip=1&quality=7&magick=webp&op_type=5&upload_type=cover&name=large_pop&device_type=ios",
          id: 1
        },
        {
          src:
            "https://imagev2.xmcdn.com/group82/M07/8D/55/wKg5Il8zZEySLkfpAAI_q5mpHjw651.jpg!strip=1&quality=7&magick=webp&op_type=5&upload_type=cover&name=large_pop&device_type=ios",
          id: 2
        },
        {
          src:
            "https://imagev2.xmcdn.com/group82/M06/D4/22/wKg5HF86JsCSlRi8AAI1pBczytE696.jpg!strip=1&quality=7&magick=webp&op_type=5&upload_type=cover&name=large_pop&device_type=ios",
          id: 3
        },
        {
          src:
            "https://imagev2.xmcdn.com/group82/M00/D3/FD/wKg5Il86KBTQw40GAAIaPiC332M994.jpg!strip=1&quality=7&magick=webp&op_type=5&upload_type=cover&name=large_pop&device_type=ios",
          id: 4
        },
        {
          src:
            "https://imagev2.xmcdn.com/group85/M05/78/B7/wKg5H19ImoqRk_gIAAHxEMMfbcU054.jpg!strip=1&quality=7&magick=webp&op_type=5&upload_type=cover&name=large_pop&device_type=ios",
          id: 5
        },
        {
          src:
            "https://imagev2.xmcdn.com/group85/M09/90/05/wKg5H18zY9rgEv5fAAIT6o4qte4419.jpg!strip=1&quality=7&magick=webp&op_type=5&upload_type=cover&name=large_pop&device_type=ios",
          id: 6
        }
      ],
    };
  },
};
</script>
<style>
.rotation{
  width: 1080px;
  margin: 0 auto;
}
.el-carousel__container{
  height: 216px !important;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.medium{
  width: 540px;
}
.login{
  position: absolute;
  display: none;
  width: 440px;
  height: 540px;
}
</style>
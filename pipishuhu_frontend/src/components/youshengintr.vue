<template>
    <div>
        <div class="box">
            <youshengintr1 class="youshengintr1"></youshengintr1>
            <youshengintr2 class="youshengintr2"></youshengintr2>
            <img class="imgurl" :src="imgurl" alt="" />
            <youshengintr3 class="youshengintr3"></youshengintr3>
        </div>
        <foot></foot>
    </div>
</template>

<script>
import youshengintr1 from "../components/youshengintr/youshengintr1";
import youshengintr2 from "../components/youshengintr/youshengintr2";
import youshengintr3 from "../components/youshengintr/youshengintr3";
export default {
    data: function() {
        return {
            imgurl:
                "https://s1.xmcdn.com/yx/ximalaya-web-static/last/dist/images/default-ad_a4a9be6.jpg",
        };
    },
    components: {
        youshengintr1,
        youshengintr2,
        youshengintr3,
    },
};
</script>

<style scoped>
.imgurl {
    width: 260px;
    height: 100px;
    position: absolute;
    top: 602px;
    left: 1032px;
}
.youshengintr1 {
    width: 780px;
    position: absolute;
    left: 200px;
}
.youshengintr2 {
    width: 260px;
    height: 528px;
    position: absolute;
    left: 1000px;
    margin-top: 69px;
    overflow: hidden;
    margin-left: 30px;
}
.box {
    width: 1500px;
    height: 968px;
    position: relative;
}
.youshengintr3 {
    position: absolute;
    width: 780px;
    top: 500px;
    left: 210px;
}
</style>

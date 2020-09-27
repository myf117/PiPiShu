<template>
<div class="infbox">
   <p><i class="el-icon-user-solid"></i>关注:{{starLen}}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <i class="el-icon-user"></i>粉丝：{{followLen}}</p>
</div>
</template>

<script>
export default {
    data:function () {
        return {
            starLen:"",
            followLen:""
        }
    },
    created(){
        this.getStar(),
        this.getfollow()
    },
    props:["myitem"],
    methods:{
        getStar() {
      this.$http
        .get("http://localhost:7001/getStar", {
          params: {
            ufans_id: this.myitem.user_id,
          },
        })
        .then((res) => {
          this.starLen=res.data.length       
        })
        .catch((err) => {
          console.log(222);
        });
    },
    getfollow(){
        this.$http
        .get("http://localhost:7001/getfollow", {
          params: {
            ustar_id: this.myitem.user_id,
          },
        })
        .then((res) => {
          this.followLen=res.data.length 
        })
        .catch((err) => {
          console.log(222);
        });
    },
    }
    
}
</script>

<style scoped>

</style>
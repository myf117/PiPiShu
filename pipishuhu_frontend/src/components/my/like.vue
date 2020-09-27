<template>
  <div>
    <div class="mylikeMK" v-for="item in mylikearr" :key="item.user_id">
      <img class="mylikeimg" :src="item.userimg" />
      <ul class="mylikeiUL">
        <li>
          <h2>{{item.nickname}}</h2>
        </li>
        <li class="myliketel">{{item.tel}}</li>
        <li class="mylikeuserintr">{{item.userintr}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mylikeuserarr: [],
      mylikeuserarr1: [],
      mylikearr: [],
    };
  },
  methods: {
    getByKey(key) {
      let name = key + "=";
      let ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return null;
    },
    getUserInf() {
      this.$http.get("http://127.0.0.1:7001/getUserInf", {}).then((res) => {
        console.log(res.data);
        this.mylikeuserarr = res.data;
        this.getStar();
      });
    },
    getStar() {
      console.log(this.getByKey("user_id"));
      this.$http
        .get("http://127.0.0.1:7001/getStar", {
          params: {
            ufans_id: this.getByKey("user_id"),
          },
        })
        .then((res) => {
          console.log(res.data);
          this.mylikeuserarr1 = res.data;
          for (let i = 0; i < this.mylikeuserarr1.length; i++) {
            for (let j = 0; j < this.mylikeuserarr.length; j++) {
              if (
                this.mylikeuserarr1[i].ustar_id == this.mylikeuserarr[j].user_id
              ) {
                this.mylikearr.push(this.mylikeuserarr[j]);
              }
            }
          }
        });
    },
  },
  mounted() {
    this.getUserInf();
  },
};
</script>
<style scoped>
.mylikeMK {
  margin-top: 20px;
  cursor: pointer;
  width: 900px;
  height: 180px;
  border-bottom: 1px solid rgb(226, 225, 225);
}
.mylikeimg {
  width: 144px;
  border-radius: 12px;
  position: relative;
}
.mylikeiUL {
  position: relative;
  bottom: 144px;
  list-style: none;
  left: 170px;
}
.myliketel {
  position: relative;
  top: 10px;
}
.mylikeuserintr {
  color: #a3a3ac;
  font-size: 14px;
  position: relative;
  top: 40px;
}
</style>
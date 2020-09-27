<template>
    <div>
    <div class="mysubscribedMK" v-for="item in mysubscribedAlbum" :key="item.album_id">
      <img class="mysubscribedimg" :src="item.album_url" />
      <ul class="mysubscribedUL">
        <li>
          <h2>{{item.album_name}}</h2>
        </li>
        <li>
          <span>
            <span class="fbt">
              <span>{{item.kind}}</span>
              <span v-if="item.album_amount.toString().length<5">{{item.album_amount}}</span>
              <span
                v-else-if="item.album_amount.toString().length<9"
              >{{(item.album_amount/10000).toFixed(2)+"万"}}</span>
              <span
                v-else-if="item.album_amount.toString().length>=9"
              >{{(item.album_amount/100000000).toFixed(2)+"亿"}}</span>
            </span>
          </span>
        </li>
        <li>
          <span class="mysubscribedintro">{{item.intro}}</span>
        </li>
        <li>
          <span class="mysubscribedaudio">{{item.latest_audio}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mysubscribedAlbum: [],
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
  },
  mounted() {
    console.log(this.getByKey("user_id"));
    this.$http
      .get("http://127.0.0.1:7001/getAllUserCollect", {
        params: {
          us_id: this.getByKey("user_id"),
        },
      })
      .then((res) => {
        console.log(res.data);
        let arr = [];
        for (let i = 0; i < res.data.length; i++) {
          arr[i] = res.data[i].al_id;
        }
        console.log(arr.toString());
        this.$http
          .get("http://127.0.0.1:7001/getAlbumByCollect", {
            params: {
              al_id:arr.toString()
            },
          })
          .then((res) => {
            console.log(res.data);
            this.mysubscribedAlbum = res.data;
          });
      });
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == "/my/subscribed") {
      
    }else{
      next();
    }
  },
};
</script>
<style scoped>
.mysubscribedMK {
  margin-top: 20px;
  cursor: pointer;
  width: 900px;
  height: 180px;
  border-bottom: 1px solid rgb(226, 225, 225);
}
.mysubscribedUL {
  position: relative;
  bottom: 144px;
  list-style: none;
  left: 170px;
}

.mysubscribedimg {
  width: 144px;
  border-radius: 12px;
  position: relative;
}
.fbt {
  color: #a3a3ac;
  position: relative;
  top: 5px;
}
.fbt span {
  font-size: 14px;
  margin-right: 20px;
}
.mysubscribedintro {
  position: relative;
  top: 10px;
}
.mysubscribedaudio {
  color: #a3a3ac;
  font-size: 14px;
  position: relative;
  top: 40px;
}
</style>
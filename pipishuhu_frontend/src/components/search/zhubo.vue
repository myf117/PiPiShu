<template>
  <div>
    <div id="userItem" v-for="item in user" :key="item.id">
      <div id="userTop">
        <div @click="tousermain(item.user_id)">
          <img id="userImg" :src="item.userimg" alt />
          <div id="userInf">
            <p class="hoverColor">{{item.nickname}}</p>
            <span>性别：{{item.sex}}</span>
          </div>
        </div>

        <div
          v-if="item.isfollow==1"
          id="delAttention"
          @click="delAttention(item.user_id,item.isfollow)"
        >已关注</div>
        <div
          v-if="item.isfollow==0"
          id="addAttention"
          @click="addattention(item.user_id,item.isfollow)"
        >关注</div>
      </div>
      <div id="line"></div>
    </div>
  </div>
</template>
 
<script>
import { log } from "util";
export default {
  data: function () {
    return {
      list: [],
      changeAttention: false,
      id: "",
      myuser: "",
    };
  },
  props: ["user"],
  created() {
    this.id = this.getByKey("user_id");
    if(this.id){
      this.getStar();
    }
  },
  methods: {
    // 取出用户的cookie具体值
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

    tousermain(user_id) {
      this.$router.push(`/zhubo/${user_id}/userindex`);
    },

    // 获取用户的关注信息
    getStar() {
      this.$http
        .get("http://localhost:7001/getStar", {
          params: {
            ufans_id: this.id,
          },
        })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < this.user.length; j++) {
              if (res.data[i].ustar_id === this.user[j].user_id) {
                this.user[j].isfollow = 1;
              }
            }
          }
        })
        .catch((err) => {
          console.log("axios请求失败");
        });
    },

    // 添加关注
    addattention(ustar_id, follow) {
      if (this.id) {
        this.$http
          .post("http://localhost:7001/addfollow", {
            ustar_id: ustar_id,
            ufans_id: this.id,
          })
          .then((res) => {
            console.log("添");
            if (res.data === 1) {
              follow = 1;
              this.$router.go(0)
            }
          })
          .catch((err) => {
            console.log("axios请求失败");
          });
      } else {
        // 未登录，弹出登录框
        alert("请登录");
      }
    },
    // 取消关注
    delAttention(ustar_id, follow) {
      this.$http
        .post("http://localhost:7001/delfollow", {
          ustar_id: ustar_id, //被关注者id
          ufans_id: this.id,
        })
        .then((res) => {
          if (res.data === 1) {
            follow = 0;
            this.$router.go(0)
          }
        })
        .catch((err) => {
          console.log("axios请求失败");
        });
    },
  },
};
</script>

<style scoped>
#userItem {
  margin-bottom: 20px;
  font-size: 14px;
  cursor: pointer;
}
#userTop {
  display: flex;
  justify-content: space-between;
}
#userImg {
  width: 60px;
  border-radius: 50%;
  margin-right: 16px;
}
#userInf {
  display: inline-block;
}

#addAttention {
  height: 20px;
  padding: 10px;
  color: #3cced0;
  border: 1px solid #3cced0;
}

#delAttention {
  height: 20px;
  padding: 10px;
  color: #c2c2c2;
  border: 1px solid #c2c2c2;
}
.hoverColor {
  font-weight: bolder;
}
.hoverColor:hover {
  color: #3cced0;
}
#line {
  width: 100%;
  height: 2px;
  background-color: rgb(236, 236, 236);
  margin-top: 20px;
}
</style>
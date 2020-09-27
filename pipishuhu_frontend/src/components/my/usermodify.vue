<template>
  <div id="usermodify">
    <div class="usermodifybt">
      <span>头像：</span>
      <br />
      <span>手机号：</span>
      <br />
      <span>昵称：</span>
      <br />
      <span>密码：</span>
      <br />
      <span>确认密码：</span>
    </div>
    <div class="usermodifyinput">
      <img class="usermodifyimg" :src="mysrc" :style="vv" />
      <br />
      <input type="file" id="choose" />
      <br />
      <button @click="axiosupload" class="usermodifysure">预览</button>
      <br />
      <input placeholder="11位手机号" v-model="usermodifytel" type="text" />
      <span :style="usermodifytelS">格式不正确</span>
      <br />
      <input v-model="usermodifyname" type="text" />
      <br />
      <input placeholder="包含大写、小写、数字" v-model="usermodifypas" type="text" />
      <span :style="usermodifypasS">格式不正确</span>
      <br />
      <input v-model="usermodifysurepas" type="text" />
      <br />
      <button @click="usermodifysure" class="usermodifysure">确认修改</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      myarr: [],
      mysrc: "",
      usermodifytel: "",
      usermodifyname: "",
      usermodifypas: "",
      usermodifysurepas: "",
      vv: "visibility:hidden",
      alertpd: false,
      usermodifytelS: "display:none",
      usermodifypasS: "display:none",
      YZusermodifytelS: false,
      YZusermodifypasS: false,
    };
  },
  watch: {
    usermodifytel() {
      let reg = /^1[3-9]\d{9}$/;
      if (reg.test(this.usermodifytel)) {
        this.YZusermodifytelS = true;
        this.usermodifytelS = "display:inline-block";
      }
    },
    usermodifypas() {
      let reg = /^.*(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.{6,}).*$/;
      if (reg.test(this.usermodifypas)) {
        this.YZusermodifypasS = true;
        this.usermodifypasS = "display:inline-block";
      }
    },
  },
  methods: {
    usermodifysure() {
      if (this.YZusermodifytelS && this.YZusermodifypasS) {
        if (
          (this.mysrc == "",
          this.usermodifytel == "",
          this.usermodifyname == "",
          this.usermodifypas == "",
          this.usermodifysurepas == "")
        ) {
          this.alertpd = true;
        }
        if (!this.usermodifytel) {
          this.usermodifytel = this.myarr[0].tel;
        }
        if (!this.mysrc) {
          this.mysrc = this.myarr[0].userimg;
        }
        if (!this.usermodifyname) {
          this.usermodifyname = this.myarr[0].nickname;
        }
        if (!this.usermodifypas) {
          this.usermodifypas = this.myarr[0].psw;
        }
        if (this.usermodifypas == this.usermodifysurepas) {
          this.$http
            .get("http://127.0.0.1:7001/modify", {
              params: {
                user_id: this.getByKey("user_id"),
                tel: this.usermodifytel,
                nickname: this.usermodifyname,
                userimg: this.mysrc,
                psw: this.usermodifypas,
              },
            })
            .then((res) => {
              console.log(res.data);
              if (res.data == 1) {
                alert("修改成功");
                this.$router.push("/my/subscribed");
              } else {
                alert("修改失败");
              }
            });
        } else if (this.alertpd) {
          (this.usermodifytel = ""),
            (this.mysrc = ""),
            (this.usermodifyname = ""),
            (this.usermodifypas = "");
          this.usermodifysurepas = "";
          alert("输入不能为空");
        } else {
          (this.usermodifytel = ""),
            (this.mysrc = ""),
            (this.usermodifyname = ""),
            (this.usermodifypas = "");
          this.usermodifysurepas = "";
          alert("两次密码不一致");
        }
      }else{
        alert("格式不正确")
      }
    },
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
    getuser() {
      this.$http
        .get("http://127.0.0.1:7001/getAnuserInf", {
          params: {
            user_id: this.getByKey("user_id"),
          },
        })
        .then((res) => {
          console.log(res.data);
          this.myarr = res.data;
        });
    },
    axiosupload() {
      let file = document.getElementById("choose").files[0];
      if (file) {
        let formData = new FormData();
        formData.append("uploadFile", file, file.name);
        const config = {
          headers: {
            "Content-Type":
              "multipart/form-data;boundary=" + new Date().getTime(),
          },
        };
        this.$http
          .post("http://127.0.0.1:7001/upload", formData, config)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              this.mysrc = res.data;
              this.vv = "";
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  mounted() {
    this.getuser();
  },
};
</script>
<style scoped>
#usermodify {
  background-color: #eee;
}
#usermodify input {
  outline-style: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 14px 14px;
  width: 320px;
  font-size: 24px;
}
#usermodify input:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}
.usermodifyimg {
  margin-top: 20px;
  margin-left: 90px;
  width: 144px;
  height: 144px;
}
.usermodifyinput {
  display: inline-block;
}
.usermodifyinput input {
  margin-bottom: 20px;
}
.usermodifybt {
  display: inline-block;
  font-size: 28px;
  position: relative;
  bottom: 60px;
  margin-left: 250px;
}
.usermodifybt span {
  display: inline-block;
  margin-top: 45px;
}
.usermodifysure {
  border-color: #3cced0;
  border-radius: 5px;
  background-color: #3cced0;
  width: 100px;
  height: 40px;
  cursor: pointer;
  font-size: 18px;
  color: #fff;
  margin-left: 20px;
  outline: none;
  margin-bottom: 20px;
}
</style>
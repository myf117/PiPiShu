<template>
	<div class="login-w">
		<div class="loginwindow">
			<span @click="closelogin"
				  class="el-icon-circle-close loginWindowClose"></span>
			<div class="loginwindow-top">
				<div class="button-box">
					<div id="btn"
						 class="deng"></div>
					<button @click="TZlogin"
							class="change-btn">登录</button>
					<button @click="TZregister"
							class="change-btn">注册</button>
				</div>
				<div class="loginMK input-group"
					 id="denglu"
					 v-if="loginMK">
					账号：
					<input @keydown.enter="login"
						   v-model="loginPhone"
						   type="text"
						   placeholder="请输入账号"
						   class="input-field" />
					<br />密码：
					<input @keydown.enter="login"
						   v-model="loginPas"
						   type="password"
						   placeholder="请输入密码"
						   class="input-field" />
					<br />
					<span>{{ts}}</span>
					<br />
					<button @click="login"
							class="submit-btn">登录</button>
				</div>
				<div v-else
					 class="RegisterMK input-group"
					 id="zhuce">
					<img :src="mysrc"
						 alt />
					<br />
					<input type="file"
						   id="choose" />
					<br />
					<button @click="axiosupload"
							class="submit-btn">预览</button>
					<br />电话：
					<input placeholder="11位手机号"
						   @keydown.enter="register"
						   type="text"
						   class="input-field"
						   v-model="RegisterPhone" />
					<br />昵称：
					<input @keydown.enter="register"
						   type="text"
						   placeholder="请输入昵称"
						   class="input-field"
						   v-model="Registername" />
					<br />密码：
					<input placeholder="包含大写、小写、数字"
						   @keydown.enter="register"
						   type="text"
						   class="input-field"
						   v-model="Registerpwd" />
					<br />
					<input @keydown.enter="register"
						   type="radio"
						   id="usersexMan"
						   class="check-text"
						   value="男"
						   v-model="usersex" />
					<label for="usersexMan"
						   class="check">男</label>
					<input @keydown.enter="register"
						   type="radio"
						   id="usersexWoman"
						   class="check-text"
						   value="女"
						   v-model="usersex" />
					<label for="usersexWoman"
						   class="check">女</label>
					<br />
					<span>{{Rts}}</span>
					<br />
					<button @click="register"
							class="submit-btn">注册</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				loginMK: true,
				loginPhone: "",
				loginPas: "",
				ts: "",
				Rts: "",
				mysrc: "",
				RegisterPhone: "",
				Registerpwd: "",
				Registername: "",
				usersexMan: true,
				usersexWoman: false,
				usersex: "",
				YZRegisterPhone: false,
				YZRegisterpwd: false,
			};
		},
		mounted() {
			if (this.GetCookie("user_id")) {
				console.log(1);
				this.$emit("myloginF");
			}
		},
		watch: {
			RegisterPhone() {
				let reg = /^1[3-9]\d{9}$/;
				if (reg.test(this.RegisterPhone)) {
					this.YZRegisterPhone = true;
				}
			},
			Registerpwd() {
				let reg = /^.*(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.{6,}).*$/;
				if (reg.test(this.Registerpwd)) {
					this.YZRegisterpwd = true;
				}
			},
		},
		methods: {
			closelogin() {
				this.$emit("myloginF");
			},
			TZlogin() {
				this.loginMK = true;
				btn.className = "deng";
			},
			TZregister() {
				this.loginMK = false;
				btn.className = "zhu";
			},
			login() {
				console.log(this.$http);
				this.$http
					.post("http://127.0.0.1:7001/login", {
						tel: this.loginPhone,
						pwd: this.loginPas,
					})
					.then((res) => {
						console.log(res.data);
						if (res.data.length < 1) {
							this.ts = "用户名或密码错误";
						} else {
							this.ts = "";
							document.cookie = `user=${res.data[0].tel}`;
							document.cookie = `user_id=${res.data[0].user_id}`;
							console.log(document.cookie);
							this.$router.go(0);
							this.$emit("myloginF");
						}
					});
			},
			GetCookie: function (key) {
				let getCookie = document.cookie.replace(/[ ]/g, ""); //获取cookie，并且将获得的cookie格式化，去掉空格字符
				let arrCookie = getCookie.split(";"); //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
				let tips; //声明变量tips
				for (let i = 0; i < arrCookie.length; i++) {
					//使用for循环查找cookie中的tips变量
					let arr = arrCookie[i].split("="); //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
					if (key == arr[0]) {
						//匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
						tips = arr[1]; //将cookie的值赋给变量tips
						break; //终止for循环遍历
					}
				}
				return tips;
			},
			register() {
				if (
					this.mysrc == "" ||
					this.RegisterPhone == "" ||
					this.Registerpwd == "" ||
					this.Registername == "" ||
					this.usersex == ""
				) {
					alert("输入有误");
				} else {
					if (this.YZRegisterPhone && this.YZRegisterpwd) {
						console.log(this.YZRegisterPhone, this.YZRegisterpwd);
						this.$http
							.post("http://127.0.0.1:7001/regist", {
								tel: this.RegisterPhone,
								pwd: this.Registerpwd,
								nickname: this.Registername,
								userimg: this.mysrc,
								sex: this.usersex,
							})
							.then((res) => {
								console.log(res.data);
								if (res.data.length < 1) {
									this.Rts = "用户名或密码错误";
								} else {
									this.Rts = "";
									this.$emit("myloginF");
									alert("注册成功");
									this.$router.go(0);
									console.log(document.cookie, 1);
								}
							});
					} else {
						alert("输入格式有误");
					}
				}
			},
			axiosupload() {
				let file = document.getElementById("choose").files[0];
				if (file) {
					let formData = new FormData();
					formData.append("uploadFile", file, file.name);
					const config = {
						headers: {
							"Content-Type":
								"multipart/form-data;boundary=" +
								new Date().getTime(),
						},
					};
					this.$http
						.post("http://127.0.0.1:7001/upload", formData, config)
						.then((res) => {
							this.mysrc = res.data;
							console.log(res.data);
						})
						.catch((e) => {
							console.log(e);
						});
				}
			},
		},
	};
</script>
<style>
	.login-w {
		width: 100%;
		height: 100%;
		background-color: rgba(127, 127, 127, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 3000;
	}
	.loginwindow {
		border-radius: 25px;
		width: 380px;
		height: 480px;
		position: relative;
		margin: 6% auto;
		background-color: #fff;
		margin-top: 80px;
	}

	.loginMK input {
		margin-top: 30px;
		height: 30px;
	}
	.RegisterMK input {
		/* margin-top: 20px; */
		height: 30px;
	}

	.loginWindowClose {
		font-size: 30px;
		position: relative;
		left: 88%;
		top: 20px;
		cursor: pointer;
	}
	.RegisterMK img {
		width: 40px;
	}
	.button-box {
		width: 220px;
		margin: 35px auto;
		position: relative;
		box-shadow: 0 0 20px 9px #24ccff1f;
		border-radius: 30px;
	}
	.change-btn {
		left: 6px;
		padding: 10px 35px;
		cursor: pointer;
		background: transparent;
		border: 0;
		outline: none;
		position: relative;
	}
	.deng {
		top: 0;
		left: 0;
		position: absolute;
		width: 110px;
		height: 100%;
		background: linear-gradient(to right, #6cf0d3, #4ae8eb);
		border-radius: 30px;
		transition: 0.5s;
	}
	.zhu {
		top: 0;
		left: 110px;
		position: absolute;
		width: 110px;
		height: 100%;
		background: linear-gradient(to right, #6cf0d3, #4ae8eb);
		border-radius: 30px;
		transition: 0.5s;
	}
	.input-group {
		top: 150px;
		position: absolute;
		width: 280px;
		transition: 0.5s;
	}
	.input-field {
		border-left: 0;
		border-right: 0;
		border-top: 0;
		border-bottom: 1px solid #999;
		outline: none;
		background: transparent;
	}
	.submit-btn {
		width: 85%;
		padding: 10px 30px;
		cursor: pointer;
		display: block;
		margin: auto;
		background: linear-gradient(to right, #6cf0d3, #4ae8eb);
		border: 0;
		outline: none;
		border-radius: 30px;
		letter-spacing: 20px;
		text-indent: 20px;
	}
	.submit-btn:active {
		opacity: 0.5;
	}
	.check {
		margin: 0px 30px 0px 0;
	}
	#denglu {
		position: absolute;
		left: 50px;
	}
	#zhuce {
		position: absolute;
		top: 120px;
		left: 50px;
	}
</style>
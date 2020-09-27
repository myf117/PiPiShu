<template>
	<div>

		<el-tabs v-model="activeName">

			<el-tab-pane label="声音"
						 name="first">
				<div>
					<ol v-if="audioList">
						<li class="audioLi"
							v-for="(item) in pageAudio"
							:key="item.id"
							@click="addAudio()">
							<i id="iii"
							   class="el-icon-caret-right">

							</i>
							<span class="audioN">{{item.audio_name}}</span>
							<div class="audioA">
								<i class="el-icon-headset"></i>
								<span class="tubiao"
									  v-if="item.amount.toString().length<5">{{item.amount}}</span>
								<span class="tubiao"
									  v-else-if="item.amount.toString().length<9">{{(item.amount/10000).toFixed(2)}}万</span>
								<span class="tubiao"
									  v-else-if="item.amount.toString().length>=9">{{(item.amount/100000000).toFixed(2)}}亿</span>
							</div>
							<span class="audioT">{{changetime(item.time)}}</span>
						</li>
					</ol>
				</div>
			</el-tab-pane>
			<el-tab-pane label="评价"
						 name="second"></el-tab-pane>
		</el-tabs>

		<div class="chagebtn">
			<div class="btnbox"
				 v-for="(item,index) in page"
				 :key="item.id"
				 @click="getPageAudio">
				<button type="button">{{index+1}}</button>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		created() {
			this.getSomeAudio();
			this.getPageAudio();
		},
		data() {
			return {
				activeName: "first",
				audioList: [],
				mytime: "",
				pagenum: "",
				pageAudio: [],
				page: "",
			};
		},
		methods: {
			//获取这个专辑全部的audio
			getSomeAudio() {
				// console.log(el.target.innerHTML);
				// let pagenum=el.target.innerHTML
				this.$http
					.get("http://localhost:7001/getSomeAudio", {
						params: {
							a_id: this.$route.params.album_id,
						},
					})
					.then((res) => {
						this.audioList = res.data;
						this.page = Math.ceil(this.audioList.length / 10);
					})
					.catch((err) => {
						console.log(222);
					});
			},
			//分页获取这个专辑的audio
			getPageAudio(el) {
				let pagenum;
				if (el) {
					pagenum = el.target.innerHTML;
				} else {
					pagenum = 1;
				}
				// let pagenum=(el.target.innerHTML)||1
				this.$http
					.get("http://localhost:7001/getPageAudio", {
						params: {
							a_id: this.$route.params.album_id,
							pagenum: pagenum,
						},
					})
					.then((res) => {
						this.pageAudio = res.data;
						console.log(this.pageAudio);
					})
					.catch((err) => {
						console.log(222);
					});
			},

			//封装时间格式函数
			changetime(time) {
				//微博发表的时间打包成一个时间对象
				var sinaDt = new Date(time);
				var nowDt = new Date();
				//相差毫秒
				var absDt = nowDt - sinaDt;
				var hours = sinaDt.getHours();
				var minutes = sinaDt.getMinutes();
				var date = sinaDt.getDate();
				var month = sinaDt.getMonth();
				if (absDt < 0) {
					return "未知时间";
				} else if (0 <= absDt && absDt < 1000 * 60) {
					return "刚刚";
				} else if (1000 * 60 <= absDt && absDt < 1000 * 60 * 60) {
					var minutes = new Date(absDt).getMinutes;
					return `${minutes}分钟前`;
				} else if (1000 * 60 * 60 <= absDt && absDt < 1000 * 60 * 60 * 24) {
					//把今天的0点和新浪时间比较  要么返回hm 要么返回mdhm
					return `今天${hours}:${minutes}`;
				} else if (1000 * 60 * 60 * 24 <= absDt) {
					return `${month}-${date} ${hours}:${minutes}`;
				}
			},
			addAudio() {
				console.log(this.pageAudio);

				this.$store.state.songs.push({
					id:
						this.$store.state.songs[this.$store.state.songs.length - 1]
							.id + 1,
					name: this.pageAudio[0].audio_name,
					src: this.pageAudio[0].audio_url,
				});
				console.log("添加到播放列表");
				console.log(this.$store.state.songs);
			},
		},
	};
</script>
    
<style scoped>
	.audioLi {
		/* list-style: none; */
		/* margin-left: -32px; */
		border-bottom: 1px solid rgb(195, 172, 172);
		margin-bottom: 15px;
		margin-top: 15px;
		color: rgb(106, 64, 115);
	}
	.audioLi:hover .audioN {
		color: #3cced0;
	}
	.audioLi:hover {
		cursor: pointer;
	}
	.audioLi:hover #iii {
		display: inline-block;
	}
	.audioT {
		float: right;
	}
	.audioA {
		position: absolute;
		display: inline-block;
		width: 500px;
		/* margin-left: 50px; */
		right: -300px;
		/* float: right; */
	}

	#iii {
		display: none;
	}

	.chagebtn {
		position: absolute;
		top: 410px;
		left: 300px;
	}
	.btnbox button {
		width: 30px;
		height: 30px;
		background-color: #3cced0;
		opacity: 0.8;
		border: none;
		display: inline-block;
		margin-left: 5px;
	}
	.btnbox button:hover {
		cursor: pointer;
		opacity: 0.2;
	}
	.btnbox {
		display: inline-block;
	}
</style>
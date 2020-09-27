<template>
	<div class="disk"
		 :class="{ disk__playing: true }">
		<div class="disk_cover" />
	</div>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	import { player } from "../../play.js";
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {},
		data() {
			//这里存放数据
			return {
				stopMatrix: "",
			};
		},
		//监听属性 类似于data概念
		computed: {
			...mapState(["isPlaying", "coverUrl"]),
		},
		//监控data中的数据变化
		watch: {
			isPlaying(val) {
				if (!val) {
					this.stopMatrix = window.getComputedStyle(
						this.$refs.cover
					).transform;
				} else {
					const matrix = this.stopMatrix;
					this.stopMatrix = "";

					const match = matrix.match(/^matrix\(([^,]+),([^,]+)/);
					const [, sin, cos] = match || [0, 0, 0];
					const deg = ((Math.atan2(cos, sin) / 2 / Math.PI) * 360) % 360;

					const style = [...document.styleSheets];
					style.forEach((style) => {
						const rules = [...style.cssRules];
						rules.forEach((rule) => {
							if (
								rule.type === rule.KEYFRAMES_RULE &&
								rule.name === "rotate"
							) {
								rule.cssRules[0].style.transform = `rotate(${deg}deg)`;
								rule.cssRules[1].style.transform = `rotate(${
									deg + 360
								}deg)`;
							}
						});
					});
				}
			},
		},
		//方法集合
		methods: {
			...mapMutations(["togglePlay", "changeCover"]),
			async handleChange() {
				const target = this.$refs.file;
				const files = target.files || [];

				if (files.length) {
					for (let i = 0; i < array.length; i++) {
						await player.append(files[i]);
					}
				}
				target.value = "";
			},
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {
			// player.onReady.listen(() => {
			//     this.changeCover();
			// });
			// player.onChanged.listen(() => {
			//     this.changeCover();
			// });
			// player.onPlay.listen(() => {
			//     this.togglePlay(true);
			// });
			// player.onPause.listen(() => {
			//     this.togglePlay(false);
			// });
		},
	};
</script>
<style lang="scss" scoped>
	.disk {
		position: relative;
		width: 100px;
		height: 100px;
		border-radius: 100%;
		overflow: hidden;
		transform: translateY(-50%) scale(0.88);
		transform: all 0.6 ease;
		z-index: 100;
	}
	.disk input {
		display: none;
	}
	.disk_cover {
		position: absolute;
		top: -0px;
		left: -0px;
		right: -0px;
		bottom: -0px;
		background-image: url("https://imagev2.xmcdn.com/group16/M02/5D/54/wKgDbFcpubOAcFbpAAFgmIO_2l8844.jpg!strip=1&quality=7&magick=webp&op_type=3&columns=290&rows=290");
		background: radial-gradient(circle, #444 0%, #333 100%);
		background-size: cover;
		background-position: center;
	}
	.disk_cover::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -8px;
		margin-top: -8px;
		width: 16px;
		height: 16px;
		border-radius: 100%;
		background: linear-gradient(45deg, white, #dffeff);
		box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);
	}
	.disk__playing {
		// transform: translateY(-50%);
		box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.1),
			0 20px 20px -10px rgba(29, 95, 171, 0.3);
	}
	.disk__playing .disk_cover {
		animation: route infinite 6s linear;
	}
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>

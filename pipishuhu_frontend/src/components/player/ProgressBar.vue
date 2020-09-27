<template>
	<div class="progress"
		 :class="{ progress__playing: true }">
		<h2 class="progress_title">
			{{ $store.state.songs[$store.state.currentIndex].name }}
		</h2>
		<p class="progress_text">{{ position }} / {{ duration }}</p>
		<div class="progress_line">
			<span :style="{ width: progress }"></span>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import { player } from "../../play.js";
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {},
		data() {
			//这里存放数据
			return {
				name: "",
				position: 0,
				duration: 0.001,
				progress: "",
			};
		},
		//监听属性 类似于data概念
		computed: {
			...mapState(["isPlaying"]),
		},
		filters: {
			formatName(val) {
				return val.replace(/\.mp3$/, "");
			},
			formatType(val) {
				const min = Math.floor(val / 60);
				const sec = Math.floor(val % 60);
				return `${min}:${sec < 10 ? "0" : ""}${sec}`;
			},
		},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {
			const draw = () => {
				requestAnimationFrame(draw);
				const progress = `${(progress * 100).toFixed(2)}%`;
				this.position = player.position;
				this.duration = player.duration;
				this.name = player.current.file ? player.current.file.name : "";
			};
			draw();
		},
		beforeCreate() {}, //生命周期 - 创建之前
		beforeMount() {}, //生命周期 - 挂载之前
		beforeUpdate() {}, //生命周期 - 更新之前
		updated() {}, //生命周期 - 更新之后
		beforeDestroy() {}, //生命周期 - 销毁之前
		destroyed() {}, //生命周期 - 销毁完成
		activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
	};
</script>
<style lang="scss" scoped>
	.progress {
		padding-left: 166px;
		padding-right: 24px;
		height: 100%;
		border-radius: 6px 6px 0 0;
		background-color: rgba(255, 255, 255, 0.9);
		transition: all 0.6s ease;
		z-index: 9s;
	}
	.progress__playing {
		transform: translateY(-100%);
	}
	.progress_title {
		color: #0d7778;
		padding-top: 6px;
		font-size: 12px;
		font-weight: bold;
		font-family: "华文细黑";
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-break: break-all;
	}
	.progress_text {
		padding-top: 2px;
		padding-left: 2px;
		font-size: 12px;
		font-weight: bold;
		color: #ccc;
		transform: scale(0.6);
		transform-origin: left top;
	}
	.progress_line {
		height: 3px;
		border-radius: 3px;
		overflow: hidden;
		background-color: #ddd;
	}
	.progress_line span {
		display: block;
		height: 100%;
		background-color: #3cced0;
	}
</style>

<template>
	<div class="playlist">
		<h3>歌曲列表</h3>
		<ul v-for="(song, index) in this.$store.state.songs"
			:key="song.id">
			<li @click="playMusic(index)"
				:class="[song.id == $store.state.currentIndex ? $store.state.activeClass : '']">
				{{ song.id + 1 + "、" + song.name }}
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	import { player } from "../../play.js";
	export default {
		//import引入的组件需要注入到对象中才能使用
		data() {
			//这里存放数据
			return {};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			playMusic(id) {
				console.log("id:" + id);
				console.log("src:" + this.$store.state.currentSrc);
				if (this.$store.state.currentIndex !== id) {
					this.$store.state.currentIndex = id;
					this.$store.state.currentSrc = this.$store.state.songs[
						this.$store.state.currentIndex
					].src;
					audio.load();
					audio.play();
				}
			},
		},
	};
</script>
<style lang="scss" scoped>
	.playlist {
		width: 300px;
		height: 300px;
		border-radius: 6px;
		background-color: rgba(255, 255, 255, 0.9);
		z-index: 20;
		color: #0d7778;
	}
	.playlist h3 {
		position: relative;
		padding: 20px;
	}
	.playlist ul {
		position: relative;
		padding-left: 20px;
	}
	.playlist ul li {
		cursor: pointer;
		list-style-type: none;
		width: 260px;
		height: 30px;
		line-height: 30px;
		border-radius: 2px;
		padding-left: 10px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
	}
	.active {
		background-color: #3cced040;
	}
</style>

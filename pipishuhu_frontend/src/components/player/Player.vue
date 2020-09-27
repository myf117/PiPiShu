+<template>
    <div class="player">
        <div class="player_disk">
            <disk />
        </div>
        <div class="player_control">
            <control :showlist="showlist" @listchanged="changelist($event)" />
        </div>
        <div class="player_progress">
            <progress-bar />
        </div>
        <div v-show="showlist" class="player_playlist">
            <playlist />
        </div>
    </div>
</template>

<script>
import Disk from "./Disk.vue";
import Control from "./Control.vue";
import ProgressBar from "./ProgressBar.vue";
import Playlist from "./Playlist.vue";

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        Disk,
        Control,
        ProgressBar,
        Playlist,
    },
    data() {
        return {
            showlist: false,
        };
    },
    methods: {
        changelist(msg) {
            this.showlist = msg;
        },
    },
};
</script>
<style lang="scss" scoped>
.player {
    position: fixed;
    left: 10px;
    bottom: 25px;
    display: flex;
    width: 400px;
    height: 50px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12), 0px 20px 20px rgba(29, 95, 171, 0.3);
}
.player_disk {
    flex: 1.2;
    padding-left: 40px;
}
.player_control {
    flex: 2;
    padding: 24px 0;
    padding-right: 24px;
}
.player_progress {
    position: absolute;
    left: 18px;
    right: 18px;
    top: 0px;
    bottom: 0px;
}
.player_playlist {
    position: absolute;
    left: 400px;
    top: -250px;
}
</style>

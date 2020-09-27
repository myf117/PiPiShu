<template>
    <div v-cloak>
        <p
            class="list-item"
            @click="getItemID(item.album_id)"
            v-for="(item, index) in ranklist"
            :key="index"
        >
            <img :src="item.album_url" v-if="index < 3" />
            <span>
                <div class="list-num" v-if="index >= 3">{{ index + 1 }}</div>
                <div class="list-album-name">{{ item.album_name }}</div>
                <div class="list-nickname" v-if="index < 3">{{ item.nickname }}</div>
            </span>
        </p>
    </div>
</template>
<script>
import { log } from "util";
export default {
    data: function() {
        return {
            ranklist: [],
        };
    },
    props: ["kind"],
    created() {
        // console.log(this.kind);
        // 请求前3条
        this.$http
            .get(" http://localhost:7001/getRankAlbum", {
                params: {
                    kind: this.kind,
                },
            })
            .then(res => {
                // console.log(res.data);
                this.ranklist = res.data;
                // console.log(this.ranklist);
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        getItemID(al_id) {
            let path = `/youshengintr/${al_id}`;
            if (path) {
                this.$router.push(path);
            }
        },
    },
};
</script>

<style scoped="scoped">
p {
    padding: 10px 0;
    display: flex;
}
img {
    width: 60px;
    height: 60px;
    border-radius: 3px;
}
.list-item {
    padding-left: 8px;
    margin: 3px 0;
}
.list-item:nth-child(odd) {
    background: #f9f9fa;
}
.list-item:hover {
    cursor: pointer;
}
.list-item:hover img {
    opacity: 0.8;
    filter: none;
}
.list-item:hover .list-num,
.list-item:hover .list-album-name {
    color: #3cced0;
}
.list-item span {
    display: flex;
    flex-wrap: wrap;
    max-width: 165px;
}
.list-album-name {
    width: 130px;
    font-size: 14px;
    color: #40404c;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.list-nickname {
    font-size: 12px;
    color: #a3a3ac;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.list-num {
    font-size: 14px;
    color: #a3a3ac;
}
.list-item span div {
    padding: 7px 0px 2px 7px;
    /* margin: 10px 0 2px 7px; */
}
</style>

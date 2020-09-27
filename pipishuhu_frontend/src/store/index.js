import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        songs: [
            {
                id: 0,
                name: "《夜色钢琴曲》杨花落尽子规啼",
                src:
                    "https://aod.cos.tx.xmcdn.com/group86/M03/1E/B8/wKg5IF72vT7Qx6XGABAl5XXVSS8817.m4a",
            },
            {
                id: 1,
                name: "中国古典纯音乐 — 禅意静心",
                src:
                    "https://aod.cos.tx.xmcdn.com/group86/M0B/DB/93/wKg5IF9RtvuS1q8WAG-blbRvKdk225.m4a",
            },
            {
                id: 2,
                name: "我是小学生米小圈",
                src:
                    "https://aod.cos.tx.xmcdn.com/group21/M07/E1/9A/wKgJKFhaF1LB6La5ABf44Sux-Uw565.m4a",
            },
            {
                id: 3,
                name: "5分钟心理学",
                src:
                    "https://aod.cos.tx.xmcdn.com/storages/2dbf-audiofreehighqps/40/5A/CMCoOSADKmhgACYGgABSGL4_.m4a",
            },
        ],
        currentIndex: 0,
        currentSrc:
            "https://aod.cos.tx.xmcdn.com/group86/M03/1E/B8/wKg5IF72vT7Qx6XGABAl5XXVSS8817.m4a",
        activeClass: "active",
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {},
});

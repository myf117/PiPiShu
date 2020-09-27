"use strict";

const Controller = require("egg").Controller;

class CollectController extends Controller {
    //添加
    async addCollect() {
        let us_id=this.ctx.request.body.us_id;
        let al_id=this.ctx.request.body.al_id;
        let r = await this.ctx.service.collectService.addCollect(us_id,al_id);
        this.ctx.response.body = r;
    }
    //删除
    async delCollect() {
        let us_id=this.ctx.request.query.us_id;
        let al_id=this.ctx.request.query.al_id;
        let r = await this.ctx.service.collectService.delCollect(us_id,al_id);
        this.ctx.response.body = r;
    }
    // 排行榜获取用户收藏专辑id
    async getUserCollect() {
        const { ctx } = this;
        let us_id = this.ctx.request.query.us_id;
        let albumID=this.ctx.request.query.albumID;
        ctx.body = await this.ctx.service.collectService.getUserCollect(us_id,albumID);
    }
   //  获取用户收藏所有专辑id
   async getAllUserCollect() {
        const { ctx } = this;
        let us_id = this.ctx.request.query.us_id;
        ctx.body = await this.ctx.service.collectService.getAllUserCollect(us_id);
    }
}

module.exports = CollectController;

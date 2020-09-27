"use strict";

let Service = require("egg").Service;

class CollectService extends Service {
     //添加
     async addCollect(us_id,al_id) {
        let sql = "insert into collect(us_id,al_id)values(?,?)";
        let r = await this.ctx.app.mysql.query(sql, [us_id,al_id]);
        return r.affectedRows;
    }
    //删除
    async delCollect(us_id,al_id) {
        let sql = "delete from collect where us_id=? and al_id=?";
        let result = await this.ctx.app.mysql.query(sql, [us_id,al_id]);
        console.log(us_id);
        console.log(al_id);
        return result.affectedRows;
    }
    // 排行榜获取用户收藏专辑id
    async getUserCollect (us_id,albumID) {
        let sql = `select * from collect where us_id=${us_id} and al_id in(${albumID})`;
        let r = await this.ctx.app.mysql.query(sql);
        return r;
    }
    //  获取用户收藏所有专辑id
    async getAllUserCollect (us_id) {
        let sql = `select * from collect where us_id=?`;
        let r = await this.ctx.app.mysql.query(sql,[us_id]);
        return r;
    }
}
module.exports = CollectService;

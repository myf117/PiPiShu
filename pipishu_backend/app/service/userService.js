"use strict";

let Service = require("egg").Service;

class UserService extends Service {
    //注册
    async regist(tel, pwd, nickname, sex, userimg) {
        let sql = "insert into user(tel,psw,nickname,sex,userimg)values(?,?,?,?,?)";
        let r = await this.ctx.app.mysql.query(sql, [tel, pwd, nickname, sex, userimg]);
        return r;
    }
    //登录
    async login(tel, pwd) {
        let sql =
            "select user_id, tel, nickname, psw, sex, userimg, userintr from user where tel=? and psw=?";
        let list = await this.ctx.app.mysql.query(sql, [tel, pwd]);
        console.log(list);
        return list;
    }
    //注销
    async logout(参数) {
        let sql = "数据库sql命令";
        let r = await this.ctx.app.mysql.query(sql, [参数]);
        return r;
    }
    // 获取用户信息
    async getUserInf() {
        let sql = "select * from user";
        let r = await this.ctx.app.mysql.query(sql);
        return r;
    }

    //根据id取出用户信息
    async getAnuserInf(user_id) {
        let sql = "select * from user where user_id=?";
        let list = await this.ctx.app.mysql.query(sql, [user_id]);
        return list;
    }
    // 修改信息
    async modify(user_id, tel, nickname, userimg, psw) {
        let sql = "update user set tel=?, nickname=? , userimg=? , psw=? where user_id=?";
        let list = await this.ctx.app.mysql.query(sql, [tel, nickname, userimg, psw, user_id]);
        return list.affectedRows;
    }
}
module.exports = UserService;

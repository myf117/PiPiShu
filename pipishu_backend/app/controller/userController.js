"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
    //注册
    async regist() {
        let tel = this.ctx.request.body.tel;
        let pwd = this.ctx.request.body.pwd;
        let nickname = this.ctx.request.body.nickname;
        let sex = this.ctx.request.body.sex;
        let userimg = this.ctx.request.body.userimg;
        let r = await this.ctx.service.userService.regist(tel, pwd, nickname, sex, userimg);
        this.ctx.response.body = r;
    }
    //登录
    async login() {
        let tel = this.ctx.request.body.tel;
        let pwd = this.ctx.request.body.pwd;
        let list = await this.ctx.service.userService.login(tel, pwd);
        console.log("1");
        this.ctx.response.body = list;
    }
    //注销
    async logout() {
        let r = await this.ctx.service.userService.logout(参数);
        this.ctx.response.body = r;
    }
    // 获取用户信息
    async getUserInf() {
        const { ctx } = this;
        ctx.body = await this.ctx.service.userService.getUserInf();
    }
    // 根据用户id获取用户信息
    async getAnuserInf() {
        const { ctx } = this;
        let user_id = this.ctx.request.query.user_id;
        ctx.body = await this.ctx.service.userService.getAnuserInf(user_id);
    }
    // 修改信息
    async modify() {
        const { ctx } = this;
        let user_id = this.ctx.request.query.user_id;
        let tel = this.ctx.request.query.tel;
        let nickname = this.ctx.request.query.nickname;
        let userimg = this.ctx.request.query.userimg;
        let psw = this.ctx.request.query.psw;
        ctx.body = await this.ctx.service.userService.modify(user_id, tel, nickname, userimg, psw);
    }
}

module.exports = UserController;

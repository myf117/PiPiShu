"use strict";

let Service = require("egg").Service;
const fs = require("fs");
const path = require("path");
class AudioService extends Service {
    // 获取所有音频
    async getAudio() {
        let sql = "select * from audio";
        let list = await this.ctx.app.mysql.query(sql);
        return list;
    }

    // 根据专辑id驱逐对应audio
    async getSomeAudio(a_id) {
        let sql = "select * from audio where a_id=?";
        let list = await this.ctx.app.mysql.query(sql, [a_id]);
        return list;
    }

    //根据专辑id取出分页专辑里的audio
    async getPageAudio(a_id, pagenum) {
        let sql = `select * from audio where a_id=? limit ${(pagenum - 1) * 10},10 `;
        let list = await this.ctx.app.mysql.query(sql, [a_id]);
        console.log(list);
        return list;
    }

    //上传音频
    async uploadAudio() {
        const file = this.ctx.request.files[0];
        const toFileName = "/public/upload/" + Date.now() + file.filename;
        let to = path.dirname(__dirname) + toFileName;
        //file.filepath是上传的临时文件
        //把临时文件写入到文件to
        await fs.copyFileSync(file.filepath, to);
        //删除临时文件
        await fs.unlinkSync(file.filepath);
        //上传文件的网络访问 url
        const newUrl = "http://localhost:7001" + toFileName;

        // 上传到数据库
        let name = this.ctx.request.body.name;
        let time = this.ctx.request.body.time;
        let a_id = this.ctx.request.body.a_id;

        console.log("----" + name + "----");
        const sql = "insert into audio(audio_name, time, a_id,audio_url)values(?, ?, ?, ?)";
        let r = await this.ctx.app.mysql.query(sql, [name, time, a_id, newUrl]);

        //返回文件的网络访问 url
        if (r.affectedRows == 1) {
            return newUrl;
        } else {
            return "http://localhost:7001/public/upload/1596701073311false-.png";
        }
    }
}

module.exports = AudioService;

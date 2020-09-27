const Controller = require("egg").Controller;
class AlbumController extends Controller {
    // async getRankAlbum() {
    //     const { ctx } = this;
    //     let kind=this.ctx.request.query.kind;
    //     ctx.body = await this.ctx.service.albumService.getRankAlbum(kind)
    // }
    // async getAllAlbumByKind() {
    //     const { ctx } = this;
    //     let kind=this.ctx.request.query.kind;
    //     ctx.body = await this.ctx.service.albumService.getAllAlbumByKind(kind)
    // }
    // 获取全部专辑
    async getAllAlbum() {
        const { ctx } = this;
        ctx.body = await this.ctx.service.albumService.getAllAlbum();
    }
    // 根据类别 获取专辑
    async getAlbum() {
        const { ctx } = this;
        let kind = this.ctx.request.query.kind;
        ctx.body = await this.ctx.service.albumService.getAlbum(kind);
    }
    // 根据类别 获取播放量前十的 专辑和上传者
    async getRankAlbum() {
        const { ctx } = this;
        let kind = this.ctx.request.query.kind;
        ctx.body = await this.ctx.service.albumService.getRankAlbum(kind);
    }
    // 根据类别 获取播放量前百的 专辑和上传者
    async getAllAlbumByKind() {
        const { ctx } = this;
        let kind = this.ctx.request.query.kind;
        ctx.body = await this.ctx.service.albumService.getAllAlbumByKind(kind);
    }
    // 获取某用户上传专辑
    async getUserAlbum() {
        const { ctx } = this;
        let u_id = this.ctx.request.query.u_id;
        ctx.body = await this.ctx.service.albumService.getUserAlbum(u_id);
    }
    // 根据专辑id获取专辑
    async getoneAlbum() {
        const { ctx } = this;
        let album_id = this.ctx.request.query.album_id;
        ctx.body = await this.ctx.service.albumService.getoneAlbum(album_id);
    }

    async getAlbumByKind() {
        const { ctx } = this;
        let kind = this.ctx.request.query.kind;
        ctx.body = await this.ctx.service.albumService.getAlbumByKind(kind);
    }
    // 按播放量取出前10的专辑
    async getRankAlbumTen() {
        const { ctx } = this;
        ctx.body = await this.ctx.service.albumService.getRankAlbumTen();
    }

    //根据用户收藏id取出专辑信息
    async getAlbumByCollect() {
        const { ctx } = this;
        let al_id = this.ctx.request.query.al_id;
        // console.log(al_id);
        ctx.body = await this.ctx.service.albumService.getAlbumByCollect(al_id);
    }

    //修改专辑最新音频
    async changeAlbumLatest() {
        const { ctx } = this;
        let al_id = this.ctx.request.body.al_id;
        let latest_audio = this.ctx.request.body.latest_audio;
        ctx.body = await this.ctx.service.albumService.changeAlbumLatest(latest_audio, al_id);
    }
}
module.exports = AlbumController;

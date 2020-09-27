module.exports = app => {
    const { router, controller } = app;
    //用户相关路由
    // 注册
    router.post("/regist", controller.userController.regist);
    // 登录
    router.post("/login", controller.userController.login);
    // 获取图片
    router.post("/upload", controller.uploadController.upload);
    // 注销
    // router.post("/logout", controller.userController.logout);
    //// 修改个人信息
    router.get("/modify", controller.userController.modify);
    //CR// 获取用户信息
    router.get("/getUserInf", controller.userController.getUserInf);
    // 根据用户id获取用户信息
    router.get("/getAnuserInf", controller.userController.getAnuserInf);

    //专辑相关路由
    // 获取全部专辑
    router.get("/getAllAlbum", controller.albumController.getAllAlbum);
    // 根据类别 获取专辑
    router.get("/getAlbum", controller.albumController.getAlbum);
    // 根据类别 获取播放量前十的 专辑和上传者
    router.get("/getRankAlbum", controller.albumController.getRankAlbum);
    // 根据类别 获取播放量前百的 专辑和上传者
    router.get("/getAllAlbumByKind", controller.albumController.getAllAlbumByKind);
    // 获取某用户上传专辑
    router.get("/getUserAlbum", controller.albumController.getUserAlbum);
    // 根据专辑id获取专辑
    router.get("/getoneAlbum", controller.albumController.getoneAlbum);
    // 取出播放量最多的前10位专辑
    router.get("/getRankAlbumTen", controller.albumController.getRankAlbumTen);
    // 根据用户收藏id取出专辑信息
    router.get("/getAlbumByCollect", controller.albumController.getAlbumByCollect);
    // 修改专辑最新音频
    router.post("/changeAlbumLatest", controller.albumController.changeAlbumLatest);

    //音频相关路由
    // 获取所有音频
    router.get("/getAudio", controller.audioController.getAudio);

    //根据专辑id取出对应audio
    router.get("/getSomeAudio", controller.audioController.getSomeAudio);

    //根据专辑id取出分页专辑里的audio
    router.get("/getPageAudio", controller.audioController.getPageAudio);

    //HJX//上传音频
    router.post("/uploadAudio", controller.audioController.uploadAudio);

    //收藏相关路由
    // 添加收藏
    router.post("/addCollect", controller.collectController.addCollect);
    // 删除
    router.get("/delCollect", controller.collectController.delCollect);
    // 排行榜获取用户收藏专辑id
    router.get("/getUserCollect", controller.collectController.getUserCollect);
    // 获取用户收藏所有专辑id
    router.get("/getAllUserCollect", controller.collectController.getAllUserCollect);

    //关注相关路由
    // 关注
    router.post("/addfollow", controller.followController.addfollow);
    // 取消关注
    router.post("/delfollow", controller.followController.delfollow);
    // 获取粉丝
    router.get("/getfollow", controller.followController.getfollow);

    // 获取关注者
    router.get("/getStar", controller.followController.getStar);
    //获取所有被关注者id(不限次数)
    router.get("/getAllStar", controller.followController.getAllStar);

    router.get("/getAlbumByKind", controller.albumController.getAlbumByKind);
};

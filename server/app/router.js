"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt } = app;
  const baseRouter = app.config.baseRouter; // /api/v1
  // 前台 /web
  router.post(baseRouter + "/admin/login", controller.admin.adminLogin);
  router.post(baseRouter + "/admin/logout", controller.admin.adminLogout);

  router.resources(
    "categories",
    baseRouter + "/categories",
    jwt,
    controller.categories
  ); // 分类
  router.resources("tags", baseRouter + "/tags", jwt, controller.tags); // 标签

  router.put(
    baseRouter + "/tags/status/:id",
    jwt,
    controller.tags.updateStatus
  );
  router.resources("about", baseRouter + "/about", jwt, controller.about); // 关于
  router.resources("user", baseRouter + "/user", jwt, controller.user); // 用户管理
  router.resources(
    "home",
    baseRouter + "/config/home",
    jwt,
    controller.config.home
  ); // 网页配置-首页配置
  router.resources("hf", baseRouter + "/config/hf", jwt, controller.config.hf); // 网页配置-Header/Footer配置
};

// model -> router -> controller -> service -> model
// 数据库 mySql mongodb  模型 Model
// user
// name sex age job

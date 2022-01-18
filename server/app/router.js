"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  const baseRouter = app.config.baseRouter; // /api/v1
  // router.get('/admin/list', controller.admin.list);
  router.post(baseRouter + "/admin/login", controller.admin.adminLogin);
  // router.delete('/admin/remove/:id', controller.admin.remove);
};

// model -> router -> controller -> service -> model
// 数据库 mySql mongodb  模型 Model
// user
// name sex age job

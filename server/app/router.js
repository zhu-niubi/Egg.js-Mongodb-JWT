'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/admin/list', controller.admin.list);
  router.post('/admin/login', controller.admin.adminLogin);
  router.delete('/admin/remove/:id', controller.admin.remove);


};


// model -> router -> controller -> service -> model
// 数据库 mySql mongodb  模型 Model
// user
// name sex age job
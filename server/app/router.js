'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/:id', controller.home.index);
  router.get('/news', controller.news.list);
  router.resources('posts', '/api/posts', controller.posts);
};


// model -> router -> controller -> service -> model
// 数据库 mySql mongodb  模型 Model
// user
// name sex age job
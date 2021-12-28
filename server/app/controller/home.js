'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx,app,config } = this;
    console.log('config------',config.news);
    ctx.body = 'hello world';
  }
}

module.exports = HomeController;

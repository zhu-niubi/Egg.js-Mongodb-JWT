"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app, config } = this;
    ctx.body = "hello world";
    console.log("config.env------", config.env);
  }
}

module.exports = HomeController;

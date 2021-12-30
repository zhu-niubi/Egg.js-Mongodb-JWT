"use strict";

const Controller = require("egg").Controller;

class PostsController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      username: {
        type: "email",
      },
      password: {
        type: "password",
        compare: "re-password",
      },
    };
  }
  async index() {
    const { ctx } = this;
    ctx.body = ctx.queries.name;
  }

  async show() {
    const { ctx } = this;
    ctx.body = ctx.params.id;
  }

  async create() {
    const { ctx } = this;
    console.log(ctx.request.body);
    ctx.validate(this.createRule);
    ctx.body = ctx.request.body;
  }

  async file() {
    const { ctx } = this;
    const files = ctx.request.files;
    for (const file of files) {
      console.log("----", file);
    }
   
  }

  // new = async () => {};

  // create = async () => {};

  // show = async () => {};

  // edit = async () => {};

  // update = async () => {};

  // destroy = async () => {};
}

module.exports = PostsController;

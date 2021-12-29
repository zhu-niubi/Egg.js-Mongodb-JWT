"use strict";

const Controller = require("egg").Controller;

class PostsController extends Controller {
  constructor(ctx){
    super(ctx);
    this.createRule = {
      username: {
        type: 'email',
      },
      password: {
        type: 'password',
        compare: 're-password',
      },
    };
  }
  async index() {
    const { ctx } = this;
    console.log('api');
    ctx.body = ctx.query.name;
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


  // new = async () => {};

  // create = async () => {};

  // show = async () => {};

  // edit = async () => {};

  // update = async () => {};

  // destroy = async () => {};
}

module.exports = PostsController;

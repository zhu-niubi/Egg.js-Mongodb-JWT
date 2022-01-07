"use strict";

const Controller = require("egg").Controller;

class AdminController extends Controller {
  constructor(ctx) {
    super(ctx);
    // this.createRule = {
    //   username: {
    //     type: "email",
    //   },
    //   password: {
    //     type: "password",
    //     compare: "re-password",
    //   },
    // };
  }

  
  async list() {
    const { ctx,service } = this;
    const res = await service.admin.list();
    ctx.body = res;
  }

  async adminLogin() {
    const { ctx,service } = this;
    const body = ctx.request.body;
    const res = await service.admin.adminLogin(body);
    ctx.body = res;
  }

  async remove() {
    const { ctx,service } = this;
    const {id} = ctx.params;
    const res = await service.admin.remove(id);
    ctx.body = res;
  }
  


}

module.exports = AdminController;

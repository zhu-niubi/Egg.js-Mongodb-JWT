const Service = require("egg").Service;

class AdminService extends Service {
  async list() {
    const { ctx } = this;
    const res = await ctx.model.Admin.find();
    return res;
  }
  async adminLogin(body) {
    const { ctx } = this;
    const res = await ctx.model.Admin.create(body);
    return res;
  }
  async remove(id) {
    const { ctx } = this;
    const res = await ctx.model.Admin.deleteOne({ _id: id });
    return res;
  }
}

module.exports = AdminService;

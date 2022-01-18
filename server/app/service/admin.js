const Service = require("egg").Service;

class AdminService extends Service {
  async list() {
    const { ctx } = this;
    const res = await ctx.model.Admin.find();
    return res;
  }
  async adminLogin(params) {
    const { ctx, app } = this;

    const oldUser = await ctx.model.Admin.findOne({
      userName: params.userName,
    });

    if (!oldUser) {
      return {
        msg: "用户不存在",
      };
    }

    const isMatch = await ctx.helper.comparePassword(
      params.password,
      oldUser.password
    );
    if (!isMatch) {
      return {
        msg: "用户名或密码错误",
      };
    }

    const token = app.jwt.sign({ ...oldUser }, app.config.jwt.secret, {
      expiresIn: "1h",
    });

    ctx.cookies.set("token", token, {
      maxAge: 86400000,
      httpOnly: true,
    });

    return {
      data: {
        token,
        userName: oldUser.userName,
      },
      msg: "登录成功",
    };
  }
  async remove(id) {
    const { ctx } = this;
    const res = await ctx.model.Admin.deleteOne({ _id: id });
    return res;
  }
}

module.exports = AdminService;

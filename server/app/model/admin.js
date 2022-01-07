module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AdminSchema = new Schema(
    {
      userName: { type: String },
      password: { type: String },
    },
    {
      collection: "admin",
      versionKey: false,
    }
  );

  return mongoose.model("Admin", AdminSchema);
};

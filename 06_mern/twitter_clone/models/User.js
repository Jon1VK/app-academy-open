const db = require('../config/db');

const userSchema = new db.Schema(
  {
    handle: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = db.model('User', userSchema);

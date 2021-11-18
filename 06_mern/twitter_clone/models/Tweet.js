const db = require('../config/db');

const tweetSchema = new db.Schema(
  {
    user: {
      type: db.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = db.model('Tweet', tweetSchema);

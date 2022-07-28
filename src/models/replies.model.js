const { Schema, model } = require("mongoose");

const replySchema = new Schema(
  {
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comments",
      required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
    reply: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reply = model("Replies", replySchema);

module.exports = Reply;

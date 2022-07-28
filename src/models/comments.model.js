const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
    comment: {
      type: String,
      trim: true,
    },
    replies: [
      {
        reply: {
          type: String, lowercase: true, trim: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: 'Users',
        },
      }
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comments", commentSchema);

module.exports = Comment;

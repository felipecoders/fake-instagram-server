const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
      type: [Schema.Types.ObjectId]
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Post", PostSchema);

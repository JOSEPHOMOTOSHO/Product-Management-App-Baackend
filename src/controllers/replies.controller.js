
const Comment = require("../models/comments.model")
const Reply = require("../models/replies.model")
const User =  require("../models/users.model")
const {sendMail} = require("../../utils")


exports.createReply = async (req,res) => {
const {commentId} = req.params;
const {replyBody} = req.body;
const comment = await Comment.findOne({ _id: commentId}).populate('user replies');
const user = await User.findOne({email:req.email})

if(!comment){
    return res.status(400).json({message:"Comment doesn't exist"})
}
const reply = new Reply({
    comment:commentId,
    user:req.user,
    reply:replyBody,
})
await reply.save()

comment.replies.push({ reply:replyBody,user:req.user})
comment.save()

 const data = {
    to: comment.user.email,
    text: `${user.userName} replied  on your comment with: \n ${replyBody}`,
    subject: 'Reply',
    };
    await sendMail(data.to,data.text,data.subject,);
    return res.status(201).json({message:"Replied successfully",reply})
}









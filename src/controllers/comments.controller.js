const Product = require("../models/products.model")
const Comment = require("../models/comments.model")
const User =  require("../models/users.model")
const {sendMail} = require("../../utils")

exports.createComment = async (req, res) => {
  try{
    const productId = req.params.productId;
    console.log("red")
      const { 
        commentBody
      } = req.body;
      const product = await Product.findOne({ _id: productId }).populate('user');
      const user = await User.findOne({email:req.email})
      if (!product) return res.status(400).json({message:"Product not found", error: error.message})
  
      const comment = new Comment({
        product:productId,
        user:req.user,
        comment:commentBody
      })
      await comment.save()
      product.comments.push(comment._id)
      await product.save()
      const data = {
            to: product.user.email,
            text: `${user.userName} commented  on your product with: \n ${commentBody}`,
            subject: 'Comment',
          };
          await sendMail(data.to,data.text,data.subject,);
          return res.status(201).json({message:"Comment saved successfully",comment})
      }catch(err){
        throw new Error(err.message)
      }
}

  
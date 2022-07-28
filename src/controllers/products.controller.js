const Product = require("../models/products.model");
const User = require("../models/users.model")
const {uploadFile, downloadFile} = require("../../aws-s3")
const {uploadToFireStore} = require("../../firebase.config")

exports.createProduct = async (req, res) => {
    try{
        const { name, radius, address, location, price } = req.body;
        const image = req.file
       console.log(image)
          let uploadImage = null;
          if (image) {
            uploadImage = await uploadFile(image)
          }
          
      
          const product = new Product()
          product.name = name;
          product.radius = radius;
          product.address = address;
          product.image = uploadImage;
          product.price = price
          product.location = {
            type: 'Point',
            coordinates: location
          };
          product.user = req.user
          await product.save();
        
          uploadToFireStore({
            id:product._id.toString(),
            address,
            image:uploadImage,
            name,
            price,
            radius,
            user:req.user
          })
        return res.status(201).json({message:'Product successfully Created',product})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:'An error occured', error: error.message})
    }
};


exports.getProducts = async (req,res) => {
       try{
        const user = await User.findOne({email:req.email})
        console.log(user)
        const products = await Product.aggregate(
          [
              { $geoNear: {
                near: {type: 'Point', coordinates: user.location.coordinates},
                distanceField: "distance",
              }},
              { $redact: {
                $cond: {
                  if: { $lt: [ "$distance", "$radius" ] },
                  then: '$$KEEP',
                  else: '$$PRUNE'
                  }
              }},
          ])
          await Product.populate(products, { path: 'user', select: 'email' });
         return res.status(200).json({message:'These are available products around your area',products})   
    
       }catch(err){
        console.log(err.message)
        throw new Error(err)
       }
}

exports.getSingleProduct = async (req,res) => {
  const {productId} = req.params
  try{
    const product = await Product.findById(productId).populate({path:'comments',populate:{path:'user'} }).populate('user')
    return res.status(200).json({message:'product retrieved successfully',product})   
  }catch(err){
   console.log(err.message)
   throw new Error(err)
  }
}

exports.getProductImage = (req,res)=>{
  const {key} = req.params
  const loadFile = downloadFile(key)
  loadFile.pipe(res)
}
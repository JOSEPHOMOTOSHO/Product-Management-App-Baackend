const mongoose = require('mongoose')
const { Schema, model} = require('mongoose')

const LocationSchema = new Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index:"2dsphere",
      required: true,
      default: []
    }
})

const ProductSchema = new Schema(
  {
    name: {
      trim: true,
      type: String,
      required: [true, "Please enter product name"],
    },
    price: {
      trim: true,
      type: String,
      required: [true, 'Please enter cost of product'],
    },

    radius: {
      type: Number,
    },

    address: {
        trim: true,
        type: String,
        lowercase: true,
    },

    image: {
      trim: true,
      type: String,
      default:
      "https://res.cloudinary.com/apicompany/image/upload/v1658937736/tradedepot_igpuga.jpg",
      required: [true, 'Please add an image'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
    }],
    location:LocationSchema
  },
  { timestamps: true }
);


const Product = model('Products', ProductSchema);
module.exports = Product;

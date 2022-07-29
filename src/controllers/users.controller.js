const User = require("../models/users.model");
const jwt = require('jsonwebtoken');

exports.createUser  = async (req,res) =>  {
    try{
        const {location, email, address, password, state } = req.body
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:'User already exists'})
        }

        const newUser = new User(req.body)
        newUser.location = {
            type:"Point",
            coordinates:location
        }
        await newUser.save()

        res.status(201).json({message:'user successfully Created', user:newUser})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:'An error occured', error: error.message})
    }
    
}

exports.login =  async (req,res) => {
    try{
        const {email, password} = req.body
        if (!email || !password) {
            throw new Error("Please provide a valid email and passoword")
          }
        // Check if the user exists and password correct
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
           throw new Error("Invalid Username or password")
          }
        const signedToken = jwt.sign({
            id: user._id,
            email: user.email,
        }, process.env.JWT_SECRET, {expiresIn:'1d'});

        res.cookie('access-cookie', signedToken, {
            maxAge: 1000 * 60 * 60,
            httpOnly: false,
        });
        res.status(200).json({ user, signedToken });
    }catch(error){
        console.log(error)
        return res.status(500).json({message:'An error occured', error:error.message})
    }
}

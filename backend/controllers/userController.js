import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';


// @desc Auth user & get token
// POST /api/users/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body

   const user = await User.findOne({ email: email })


   if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
   } else {
       res.status(401)
       throw new Error('Invalid email or password')
   }

})

// @desc Register a new user
// POST /api/users/
//@access Public

const registerUser = asyncHandler(async (req, res) => {
   const { name ,email, password } = req.body

   const userExist = await User.findOne({ email: email })

    if(userExist) {
        res.status(400) 
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @desc get user profile
// GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
    
    //This will getz user
    const user = await User.findById(req.user._id)


    if(user) {
        res.json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User is not found')
    }
   
 })

// @desc Update user profile
// PUT /api/users/profile
//@access Private

const UpdateUserProfile = asyncHandler(async (req, res) => {
    
    //This will getz user
    const user = await User.findById(req.user._id)


    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })


    } else {
        res.status(404)
        throw new Error('User is not found')
    }
   
 })


export {
    authUser, registerUser, getUserProfile, UpdateUserProfile
}
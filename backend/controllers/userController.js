import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc of auth user & get token
//@route get/api/user/login
//@access public
const authUser = asyncHandler(async (req, res) => {
    const {email,password}=req.body;
    
const user=await User.findOne({email});


if(user && (await user.matchPassword(password))){
generateToken(res,user._id);

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email:user.email,
        isAdmin:user.isAdmin
    });
}else{
    res.status(401);
    throw new Error('Invalid email or password');
}

 // res.send('auth user');
});

//@desc Register user 
//@route post/api/user
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} =req.body;

    const userExists=await User.findOne({email});

    if(userExists){
      res.status(400);
      throw new Error('User already exists');
    }

    const user=await User.create({
      name,
      email,
      password
    });

    if(user){
      generateToken(res,user._id);

      res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
      });
    }else{
      res.status(400);
      throw new Error('Invalid user data');
    }
  });

  //@desc of logout user/clear cookie
//@route post/api/user/logout
//@access private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '',{
    httpOnly: true,
    expires:new Date(0)
  });
    res.status(200).json({ message:'Logged out successfully'});
  });

  //@desc get user user profile
//@route get/api/user/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
    const user=await User.findById(req.user._id);

    if(user){
      res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
      });
    }else{
      res.status(404);
      throw new Error('user not found');
    }
  });

  //@desc update user profile
//@route put/api/user/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile');
  });

  //@desc get user by ID
//@route get/api/user/:id
// @access private/Admin
const getUserByID = asyncHandler(async (req, res) => {
    res.send('get user by id');
  });

   //@desc get users
//@route get/api/user/profile
// @access private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
  });

   //@desc Delete users
//@route DELETE/api/user/:id
// @access private/Admin
const deleteUsers = asyncHandler(async (req, res) => {
    res.send('delete users');
  });

   //@desc update users
//@route PUT/api/user/:id
// @access private/Admin
const updateUsers = asyncHandler(async (req, res) => {
    res.send('update users');
  });

  export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUserByID,
    getUsers,
    deleteUsers,
    updateUsers
  };
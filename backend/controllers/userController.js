import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
//@desc of auth user & get token
//@route get/api/user/auth
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    //set jwt as HTTP-o nly cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      //30 days
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.send("auth user");
});

//@desc Register user
//@route post/api/user
//@access public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

//@desc of logout user/clear cookie
//@route post/api/user/logout
//@access private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

//@desc get user user profile
//@route get/api/user/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

//@desc update user profile
//@route put/api/user/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

//@desc get user by ID
//@route get/api/user/:id
// @access private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

//@desc get users
//@route get/api/user/profile
// @access private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

//@desc Delete users
//@route DELETE/api/user/:id
// @access private/Admin
const deleteUsers = asyncHandler(async (req, res) => {
  res.send("delete users");
});

//@desc update users
//@route PUT/api/user/:id
// @access private/Admin
const updateUsers = asyncHandler(async (req, res) => {
  res.send("update users");
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
  updateUsers,
};

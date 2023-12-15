import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";
//import asyncHandler from "../middleware/asyncHandler.js";
//import Product from "../models/productModel.js";
//import products from '../data/products.js';

// router.get(
//     '/', asyncHandler (async (req,res)=>{
//     const products=await Product.find({});
//     throw new Error('Some error');
//     res.json(products);
// })
// );

// router.get(
//     '/:id',
//      asyncHandler(async(req,res) =>{
//     const product = await Product.findById(req.params.id);

//     if(product){
//      return res.json(product);
//     }
//     res.status(404);
//    throw new Error ('Resource not found');
// })
// );

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct);
export default router;

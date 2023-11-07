import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc create new order
//@route POST/api/orders
//@access private
const addOrderItems = asyncHandler(async (req, res) => {
  res.send('add order items');
});

//@desc Get logged in user orders
//@route get/api/order/myorders
//@access private
const getMyOrders = asyncHandler(async (req, res) => {
    res.send('get my orders');
  });

  //@desc Get order by Id
//@route get/api/order/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
    res.send('get order by Id');
  });

  //@desc update order to paid
//@route get/api/orderss/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('update order to paid');
  });

  //@desc update order to delivered
//@route get/api/orderss/:id/deliver
//@access private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to delivered');
  });

  //@desc Get all orders
//@route get/api/orders/
//@access private/Admin
const getOrders = asyncHandler(async (req, res) => {
    res.send('get all orders');
  });

  export{
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
   };
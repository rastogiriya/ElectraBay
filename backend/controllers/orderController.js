import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc create new order
//@route POST/api/orders
//@access private
const addOrderItems = asyncHandler(async (req, res) => {
 const{
    OrderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
 }=req.body;

 if(OrderItems && OrderItems.length===0){
    res.status(400);
    throw new Error('No order Items');
 }else{
    const order=new Order({
        OrderItems:OrderItems.map((x)=>({
            ...x,
            product:x._id,
            _id:undefined
        })),
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });
    const createOrder=await order.save();
    
    res.status(201).json(createOrder);
 }
});

//@desc Get logged in user orders
//@route get/api/order/myorders
//@access private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders=await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  });

  //@desc Get order by Id
//@route get/api/order/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
    const order=await Order.findById(req.params.id).populate('user','name email');

    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error('order not found');
    }
  });

  //@desc update order to paid
//@route get/api/orderss/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('update order to paid');
  });

  //@desc update order to delivered
//@route get/api/orders/:id/deliver
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
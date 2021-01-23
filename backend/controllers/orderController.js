import { raw } from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


// @desc Add Order Items 
// @route Put /api/orders
//@access Private

const addOrderItems = asyncHandler (async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, textPrice, shippingPrice, totalPrice } = req.body

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems,
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice, 
            totalPrice,
        })

        // save to db 

        const createOrder = await order.save()

        res.status(201).json(createOrder)
    }
})

//@desc Order by ID
//@route Get /api/orders/:id
//@access Private

const getOrderById = asyncHandler (async (req, res) => {
    //Find order by id and user 
    const order = await Order.findById(req.params.id).populate('user', 'name email') // Add a user and email to id:user

    //Check if order exist 
    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }


})

//@desc Update order to paid
//@route Get /api/orders/:id/pay
//@access Private

const updateOrderToPaid = asyncHandler (async (req, res) => {
    //Find order by id and user 
    const order = await Order.findById(req.params.id) // Add a user and email to id:user

    //Check if order exist and add send data
    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
            
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }


})

//@desc Get logged in user orders
//@route Get /api/orders/myorders
//@access Private

const getMyOrders = asyncHandler (async (req, res) => {
    //Find order by id and user 
    const orders = await Order.find({user: req.user._id}) // Add a user and email to id:user

    res.json(orders)

})



export { addOrderItems,getOrderById, updateOrderToPaid, getMyOrders }



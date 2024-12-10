const User = require('../models/userModel'); // Assuming you have a user model
const Product = require('../Models/productModel'); // Assuming you have a product model
const OrderModel = require('../Models/orderModels');
const Order = require('../Models/orderModels');

const createOrder = async (req, res) => {
  try {
    // console.log(req);
    const { userId, items, totalPrice } = req.body;

    // Fetch user by email
    const user = await User.findOne({ email: userId  });
    if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      
      // Validate and prepare items
      const preparedItems = await Promise.all(
        items.map(async (item) => {
          const product = await Product.findById(item._id); // Validate product exists
          if (!product) {
            console.log("user not found")
          throw new Error(`Product not found for ID: ${item.productId}`);
        }
        return {
          product: product._id,
          quantity: item.qty,
        };
      })
    );

    // Create the order
    // console.log(preparedItems)
    // console.log(userId)
    const newOrder = new Order({
      user: user,
      items: preparedItems,
      totalPrice,
    });
    // console.log(newOrder)
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
    try {
      console.log("here")
      const orders = await OrderModel
        .find()
        .populate("user", "firstName lastName email")
        .populate("items.product", "name price");
  
        // console.log(orders);
      res.status(200).send(orders);
    } catch (err) {
      res.status(500).send({ message: "Error fetching orders", error: err.message });
    }
  };

module.exports = { createOrder, getAllOrders };

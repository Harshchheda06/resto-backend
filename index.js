const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("./config/db");

const userRoutes = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");
const orderRoutes = require("./Routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => res.send("Server is running"));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/orders", orderRoutes);


app.listen(PORT, () => console.log("Server is running at port: " + PORT));

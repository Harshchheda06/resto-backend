const productModel = require("../Models/productModel");

const uploadProduct = async (req, res) => {
  const data = new productModel(req.body);
  data.save()
    .then(() => res.send({ message: "Uploaded successfully" }))
    .catch((err) => res.status(500).send(err.message));
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


module.exports = { uploadProduct, getProducts };

const userModel = require("../Models/userModel");

const signUp = async (req, res) => {
  const { email } = req.body;
  userModel.findOne({ email }, (err, result) => {
    if (result) {
      res.send({ message: "Email id is already registered", alert: false });
    } else {
      const data = userModel(req.body);
      data.save()
        .then(() => res.send({ message: "Successfully signed up", alert: true }))
        .catch((err) => res.status(500).send(err.message));
    }
  });
};

const login = (req, res) => {
  const { email } = req.body;
  userModel.findOne({ email }, (err, result) => {
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      res.send({ message: "Login is successful", alert: true, data: dataSend });
    } else {
      res.send({ message: "Email not found, please sign up", alert: false });
    }
  });
};

module.exports = { signUp, login };

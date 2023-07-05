const User = require('../model/User')
const OEM_Specs = require('../model/OEM_Spec');
const UserAuthModel = require('../model/userAuth');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const createToken = (id) => {
  return jwt.sign({ id }, 'secret');
}
module.exports.dealer_post = async (req, res) => {
  try {
    const { model, image, fuel, price, colors, mileage, seats, ratings, brandName, vehicleType } = req.body;
    const userData = {
      "image": req.body.image,
      "model": req.body.model,
      "year": Number(req.body.year),
      "price": Number(req.body.price),
      "mileage": Number(req.body.mileage),
      "power": Number(req.body.power),
      "maxSpeed": Number(req.body.maxSpeed),
      "colors": req.body.colors,
      "Km": Number(req.body.Km),
      "Scratches": Number(req.body.Scratches),
      "accidents": Number(req.body.accidents),
      "previousBuyers": Number(req.body.previousBuyers),
      "registrationPlace": req.body.registrationPlace
    };
    const result = await User.create(userData)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports.service_post = async (req, res) => {
  try {
    const { model, image, fuel, price, colors, mileage, seats, ratings, brandName, vehicleType } = req.body;
    const OEM_SpecsData = new OEM_Specs({
      model, image, fuel, price, colors, mileage, seats, ratings, brandName, vehicleType,
      "id": Number(req.body.id)
    });
    await OEM_SpecsData.save();
  }
  catch (error) {
    res.send(error);
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserAuthModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {
      sameSite: 'lax',
      httpOnly: true,
      secure: false,
    });
    res.send(user._id);
  }
  catch (error) {
    res.json({ error: error.message });
  }
}
const signup = async (email, password) => {
  try {
    const existUser = await UserAuthModel.findOne({ email });
    if (existUser) {
      throw Error("User already exists");
    }
    const newUser = new UserAuthModel({
      email,
      password
    });
    newUser.password = bcrypt.hashSync(password, 10);
    const result = await newUser.save();
    return result;
  }
  catch (error) {
    throw error;
  }
}
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await signup(email, password);
    res.cookie('jwt', createToken(result._id), {
      sameSite: 'lax',
      httpOnly: true,
      secure: false,
    });
    res.send(result)
  }
  catch (error) {
    res.json({ error: error.message })
  }
}

module.exports.dealer_list = async (req, res) => {
  try {
    const list = await OEM_Specs.find();
    res.json(list);
  }
  catch (err) {
    res.send(err)
  }
}

module.exports.customer_list = async (req, res) => {
  try {
    const list = await User.find();
    res.json(list);
  }
  catch (err) {
    res.send(err)
  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.send('logged out');
}

module.exports.loggedIn = (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) {
    res.json(false);
    return;
  }
  jwt.verify(token, 'secret', (err, decodedToken) => {
    if (err) {
      res.json(false);
    }
    else {
      res.json(true);
    }
  })
}
const userModel = require("../model/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  create: async function (req, res, next) {
    try {
      const docu = new userModel({
        email: req.body.email,
        password: req.body.password,
      });
      const docu2 = await docu.save();
      res.status(200).json({ docu2: docu2, message: "you sign-up correctly" });
    } catch (e) {
      if ((e.code = 11000)) {
        res.status(400).json({message:"The Email already exist"});
      }

      next(e);
    }
  },

  getAll: async function (req, res, next) {
    const user = await userModel.find();
    res.status(200).json(user);
  },

  login: async function (req, res, next) {
    try {
      const user = await userModel.findOne({ email: req.body.email });

      if (!user) {
        res.json({ message: "incorrect email or password" });
        return;
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ userId: user._id }, "movies", {
          expiresIn: "1h",
        });
        res.status(200).json({token,message:"Autorized"});
      } else {
        res.json({ message: "incorrect email or password" });
        return;
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};

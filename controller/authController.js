const Auth = require("../model/authModel");
const Order = require("../model/OrderModel");
const bcrypt = require("bcryptjs");
const { createAccToken, createRefToken } = require("../util/token");
const jwt = require("jsonwebtoken");
const sendMail = require("../middleware/mail");

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, mobile, password } = req.body;

      const passHash = await bcrypt.hash(password, 10);

      const newUser = await Auth({
        name,
        email,
        mobile,
        password: passHash,
      });

      // const user = await Auth(req.body)
      await newUser.save();

      // let subject = "Cake-Bash - User Registration";
      // let content = `<div>
      //               <h1>Hello, ${name} to Cake-Bash Application.</h1>
      //               <h5>Your mail is ${email} is successfully Registered.. your Password is ${password} </h5>
      //               <p>Welcome to Cake-Bash Team..</p>
      //          </div>`;

      // let mailResp = sendMail(email, subject, content);

      res.status(200).json({ msg: "User registered successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const extUser = await Auth.findOne({ email });
      if (!extUser)
        return res.status(400).json({ msg: "user doesn't exists." });

      const isMatch = await bcrypt.compare(password, extUser.password);
      if (!isMatch)
        return res.status(400).json({ msg: "password doesn't match " });

      // res.json({ data: extUser })
      const accessToken = createAccToken({ id: extUser._id });
      const refreshToken = createRefToken({ id: extUser._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        signed: true,
        path: `/api/v1/auth/refreshToken`,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
      //athentication to user is login
      res.json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", { path: `/api/v1/auth/refreshToken` });
      return res.status(200).json({ msg: "Successfully Logout" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const ref = req.signedCookies.refreshToken;
      //res.json({ ref })
      if (!ref)
        return res.status(400).json({ msg: "Session Expired.. Login Again.." });

      jwt.verify(ref, process.env.REF_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Invalid Auth..Login Again.." });
        const accessToken = createAccToken({ id: user.id });
        res.json({ accessToken }); // varified access token
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfo: async (req, res) => {
    try {
      // res.json({ data: req.user })
      const data = await Auth.findById({ _id: req.params.id }) //.select use to select the data if - it will drop
      res.json({ data });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
    //   const id = req.body;

    //   console.log("......>>", id);
      const data = await Auth.find();
    //   const filterUsers = data.filter((item) => item.role !== "superadmin");
      return res.status(200).json({
        users: data,
        length: data.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  employeecreate: async (req, res) => {
    try {
      const { name, email, mobile, designation, course, gender } = req.body;

      console.log(">>>>>", req.body);
      const newUser = await Auth({
        name,
        email,
        mobile,
        designation,
        course,
        gender,
      });
      await newUser.save();

      res.status(200).json({ msg: "User created successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  employeeedit: async (req, res) => {
    try {
      let id = req.params.id;
      let { name, email, mobile, designation, course, gender } = req.body;
      console.log("iddd", id);
      await Auth.findByIdAndUpdate(
        { _id: id },
        { name, email, mobile, designation, course, gender }
      );

      //   await data.save();

      return res.status(200).json({ msg: "User edited successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  profileUpdate: async (req, res) => {
    try {
      let id = req.params.id;
      let { name, image, email, mobile } = req.body;
      await Auth.findOneAndUpdate(
        { _id: id },
        {
          name,
          image,
          email,
          mobile,
        }
      );
      return res.status(200).json({ msg: "User Profile Updated" });
      //res.json(req.body)
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = authController;

// const Auth = require("../model/authModel");
// const Order = require('../model/orderModel')
// const bcrypt = require("bcryptjs");
// const { createAccToken, createRefToken } = require("../util/token");
// const jwt = require("jsonwebtoken");

// const authController = {
//   register: async (req, res) => {
//     try {
//       const { name, email, mobile, password } = req.body;

//       const passHash = await bcrypt.hash(password, 10);

//       const newUser = await Auth({
//         name,
//         email,
//         mobile,
//         password: passHash,
//       });

//       //const user = await Auth(req.body);
//       await newUser.save();
//       res.status(200).json({ msg: "user registered successfully" });
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   login: async (req, res) => {
//     try {
//       const { email, password } = req.body;

//       const extUser = await Auth.findOne({ email });
//       if (!extUser) return res.status(400).json({ msg: "user doesnt exist" });

//       const isMatch = await bcrypt.compare(password, extUser.password);
//       if (!isMatch)
//         return res.status(400).json({ msg: "password doesnt match" });
//       //res.json({data : extUser })
//       const accessToken = createAccToken({ id: extUser._id });
//       const refreshToken = createRefToken({ id: extUser._id });

//       res.cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         signed: true,
//         path: `/api/v1/auth/refreshToken`,
//         maxAge: 1 * 24 * 60 * 60 * 1000,
//       });
//       res.json({ accessToken });
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   logout: async (req, res) => {
//     try {
//       res.clearCookie("refreshToken", { path: `/api/v1/auth/refreshToken` });
//       return res.status(200).json({ msg: "successfully Logout" });
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   refreshToken: async (req, res) => {
//     try {
//       const ref = req.signedCookies.refreshToken;
//       //res.json({ref})
//       if (!ref)
//         return res.status(400).json({ msg: "Session Expired.. login Again.." });

//       jwt.verify(ref, process.env.REF_TOKEN_SECRET, (err, user) => {
//         if (err)
//           return res.status(400).json({ msg: "Invalid Auth.. Login again.." });
//         const accessToken = createAccToken({ id: user.id });
//         res.json({ accessToken });
//       });
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   resetPassword: async (req, res) => {
//     try {
//       let { email, password } = req.body;

//       let extUser = await Auth.findOne({ email });
//       if (!extUser) return res.status(400).json({ msg: "user doesnt exist" });

//       let newPass = bcrypt.hash(password, 10);

//       await Auth.findByIdAndUpdate(
//         { id: extUser.id },
//         {
//           password: newPass,
//         }
//       );

//       return res.status(200).json({ msg: "password updated successfully" });
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   getUserInfo: async (req, res) => {
//     try {
//       //    res.json({data : req.user})
//       const data = await Auth.findById({ _id: req.user.id }).select(
//         "-password"
//       );
//       res.json({ user: data });
//     } catch (error) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   addToCart: async (req, res) => {
//     try {
//       const user = await Auth.findById({ _id: req.user.id });
//       if (!user) return res.status(400).json({ msg: "User doesnt exists" });

//       await Auth.findOneAndUpdate(
//         { _id: req.user.id },
//         {
//           cart: req.body.cart,
//         }
//       );
//       return res.status(200).json({ msg: "Product added to cart" });
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   getOrders: async (req, res) => {
//     try {
//         const orders = await Order.findById({_id: req.user.id})
//         return res.status(200).json({
//             orders: orders,
//             length: orders.length
//         })
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
// };

// module.exports = authController;
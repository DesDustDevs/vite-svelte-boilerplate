const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/User");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const secretKey = "DummyTask";
const mySql = require("mysql");

mongoose.connect(process.env.MONGO_URI).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("Connection Error" + err);
  }
);

// if mySql database than use this connection snippet

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.DATABASE,
});

// ***  //

app.post("/api/register", function (req, res) {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists",
      });
    } else {
      const newUser = new User({
        confirmPassword: req.body.confirmPassword,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("There was an error", err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              newUser.password = hash;
              newUser.save().then((user) => {
                res.json(user);
              });
            }
          });
        }
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  let errors = {};

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          email: user.email,
          password: user.password,
        };

        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) console.error("There is some error in token", err);
            else {
              res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            }
          }
        );
        const accessToken = jwt.sign(payload, "secret", { expiresIn: 36000 });
        const refreshToken = jwt.sign(payload, "secret", { expiresIn: 360000 });
        res.cookie("refreshToken", refreshToken, {
          maxAge: 2 * 60 * 60 * 1000 * 1000,
        });
        console.log("coming");
        res.send({ accessToken: accessToken, user: user.payload });
      } else {
        errors.password = "Incorrect Password";
        return res.status(400).json(errors);
      }
    });
  });
});

// open ethereal email in browser and create a account there add you own credentials and you will start getting mails in the messages of the ethereal
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "heber.blanda@ethereal.email",
    pass: "CDGBtjS4A3E2TbUa8U",
  },
});

app.post("/api/forget-password", (req, res) => {
  const { email } = req.body;

  console.log(req.body);

  const user = User.find({ email });

  if (!user) {
    console.log("user found");
    return res.status(404).json({ error: "User not found" });
  }

  const tempPassword = Math.random().toString(36).slice(-8);
  console.log(tempPassword);

  user.password = tempPassword;

  // Send an email with the new password
  const mailOptions = {
    from: "heber.blanda@ethereal.email",
    to: email,
    subject: "Password Reset",
    text: `Your new password is: ${tempPassword}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Here it came", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    console.log("Email sent: " + info.response);

    res.status(200).json({
      message: "Password reset email sent successfully",
      tempPassword,
    });
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

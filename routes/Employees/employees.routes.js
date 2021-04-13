const { createEmployee, verifyEmployeeByEmail } = require('./employees.controller');
const { verifyEmployeesRefreshToken } = require('./employees.service');

const router = require('express').Router();
const pool = require('../../db/db.js');
const middlewares = require("../../Middlewares/middlewares.js");
const jwt = require("jsonwebtoken");
const e = require('express');

router.get("/syncdata", middlewares.authenticate, (req, res) => {
  return res.status(200).json({ message: "success", data: "Data Sync Completed!" });
});

router.post('/login', verifyEmployeeByEmail);

// Protected route, can only be accessed when user is logged-in
router.post("/protected", middlewares.authenticate, (req, res) => {
  return res.status(200).json({ message: "success", data: "Protected content!" });
});

// Creates a new accessToken using the given refreshToken;
router.post("/refresh", (req, res) => {
  const refreshToken = req.body.token;
  verifyEmployeesRefreshToken(refreshToken, (err, results) => {
    if (err) {
      return res.status(200).json({ message: "unsuccess", data: 'Error fetching token' });
    }
    if (!results) {
      return res.status(401).json({ message: 'unsuccess', data: "Refresh token not found, login again" });
    }
    // const result = compareSync(body.password, results.password);
    if (results) {
      let tokenArry = [];
      results.map((el, index) => {
        tokenArry.push(el.refreshtoken);
      });
      if (!refreshToken || !tokenArry.includes(refreshToken)) {
        return res.status(401).json({ message: 'unsuccess', data: "Refresh token not found, login again" });
      } else {
        // If the refresh token is valid, create a new accessToken and return it.
        jwt.verify(refreshToken, "refresh", (err, user) => {
          if (!err) {
            const accessToken = jwt.sign({ username: user.name }, "access", {
              expiresIn: "1h"
            });
            return res.status(201).json({ message: 'success', accessToken });
          } else {
            return res.status(401).json({
              message: 'unsuccess',
              data: "Invalid refresh token"
            });
          }
        });
      }
    } else {
      return res.status(401).json({ message: 'unsuccess', data: "Refresh token not found, login again" });
    }
  });
});


// Add New Emplotyees
router.post("/employee/create", createEmployee);

module.exports = router;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var userController = {
  signUp: function signUp(req, res, next) {
    var user = {
      id: _userModel["default"].length - 1,
      createdOn: new Date().toString(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      jobRole: req.body.jobRole,
      department: req.body.department,
      address: req.body.address,
      password: _bcrypt["default"].hash(req.body.password, 10, function (err, hash) {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: err
          });
        }

        var user = {
          id: parseInt(req.body.id, 10),
          createdOn: new Date().toString(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          gender: req.body.gender,
          jobRole: req.body.jobRole,
          department: req.body.department,
          address: req.body.address,
          password: hash
        };

        var alreadyUser = _userModel["default"].find(function (user) {
          return user.email === req.body.email;
        }) || _userModel["default"].find(function (user) {
          return user.id === parseInt(req.body.id, 10);
        });

        if (alreadyUser) {
          return res.status(422).json({
            status: 422,
            message: 'You already have an account'
          });
        }

        var done = _userModel["default"].push(user);

        if (done) {
          var token = _jsonwebtoken["default"].sign({
            id: user.id,
            createdOn: user.createdOn,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            jobRole: user.jobRole,
            department: user.department,
            address: user.address
          }, process.env.JWT_KEY, {
            expiresIn: '1h'
          });

          return res.status(201).json({
            status: 201,
            message: 'User created successfully',
            token: token
          });
        }
      })
    };
  },
  signIn: function signIn(req, res, next) {
    var userAuth = {
      email: req.body.email,
      password: req.body.password
    };

    var alreadyUser = _userModel["default"].find(function (user) {
      return user.email === userAuth.email;
    });

    if (alreadyUser) {
      _bcrypt["default"].compare(userAuth.password, alreadyUser.password, function (err, result) {
        if (err) {
          console.log(err);
          return res.status(401).json({
            status: 401,
            message: 'Auth failed'
          });
        }

        if (result) {
          var token = _jsonwebtoken["default"].sign({
            id: alreadyUser.id,
            createdOn: alreadyUser.createdOn,
            firstName: alreadyUser.firstName,
            lastName: alreadyUser.lastName,
            email: alreadyUser.email,
            gender: alreadyUser.gender,
            jobRole: alreadyUser.jobRole,
            department: alreadyUser.department,
            address: alreadyUser.address
          }, process.env.JWT_KEY, {
            expiresIn: '1h'
          });

          return res.status(200).json({
            status: 200,
            message: 'User is successfully logged in',
            token: token
          });
        }

        return res.status(401).json({
          status: 401,
          message: 'Wrong password'
        });
      });
    } else {
      return res.status(401).json({
        status: 401,
        message: 'Auth failed'
      });
    }
  }
};
var _default = userController;
exports["default"] = _default;
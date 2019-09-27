"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var _default = function _default(req, res, next) {
  try {
    // Split the Bear from request header
    var token = req.headers.authorization.split(' ')[1];

    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_KEY);

    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: 'Authentication failed'
    });
  }
};

exports["default"] = _default;
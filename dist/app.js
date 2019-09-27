"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _articleRoutes = _interopRequireDefault(require("./routes/articleRoutes"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _commentRoutes = _interopRequireDefault(require("./routes/commentRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
app.use(_express["default"].json());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // Ensure that I prevent CORS errors
// eslint-disable-next-line consistent-return

app.use(function (req, res, next) {
  // Provide access to any domain
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});
app.use(_userRoutes["default"]);
app.use(_articleRoutes["default"]);
app.use(_commentRoutes["default"]);
app.use(function (req, res, next) {
  var error = new Error('Not found');
  error.status = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.message
  });
});
app.listen(port, function () {
  console.log("Server is running on (http://127.0.0.1:".concat(port, ")"));
});
var _default = app;
exports["default"] = _default;
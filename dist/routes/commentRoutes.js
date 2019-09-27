"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _commentController = _interopRequireDefault(require("../controllers/commentController"));

var _authMiddleware = _interopRequireDefault(require("../middlewares/authMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/api/v1/articles/:id/comments', _authMiddleware["default"], _commentController["default"].postComment);
var _default = router;
exports["default"] = _default;
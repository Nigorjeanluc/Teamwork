"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _articleController = _interopRequireDefault(require("../controllers/articleController"));

var _authMiddleware = _interopRequireDefault(require("../middlewares/authMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/api/v1/articles', _articleController["default"].getAllArticles);
router.post('/api/v1/articles', _authMiddleware["default"], _articleController["default"].postArticle);
router.get('/api/v1/articles/:id', _articleController["default"].getArticle);
router["delete"]('/api/v1/articles/:id', _authMiddleware["default"], _articleController["default"].deleteArticle);
router.patch('/api/v1/articles/:id', _authMiddleware["default"], _articleController["default"].patchArticle);
var _default = router;
exports["default"] = _default;
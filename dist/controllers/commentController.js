"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _articleModel = _interopRequireDefault(require("../models/articleModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var commentController = {
  postComment: function postComment(req, res) {
    var articleId = parseInt(req.params.id, 10);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _articleModel["default"][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var article = _step.value;

        if (article.id === articleId) {
          var comment = {
            id: articleId,
            articleId: parseInt(req.params.id, 10),
            createdOn: new Date().toLocaleString(),
            // eslint-disable-next-line max-len
            articleTitle: article.title,
            // eslint-disable-next-line max-len
            article: article.article,
            authorId: parseInt(req.body.authorId, 10),
            comments: req.body.comment
          };
          article.comments.push(comment);
          res.status(201).json({
            status: 201,
            message: 'Your comment was successfully created',
            data: comment
          });
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
};
var _default = commentController;
exports["default"] = _default;
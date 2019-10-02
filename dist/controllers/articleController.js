"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _articleModel = _interopRequireDefault(require("../models/articleModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var articleController = {
  getAllArticles: function getAllArticles(req, res) {
    res.status(200).json({
      status: 200,
      message: 'Retrieved all articles',
      data: _articleModel["default"]
    });
  },
  getArticle: function getArticle(req, res) {
    var matchArticle = _articleModel["default"].find(function (article) {
      return article.id === parseInt(req.params.id, 10);
    });

    if (matchArticle) {
      return res.status(200).json({
        status: 200,
        message: 'Fetched article successfully',
        data: matchArticle
      });
    }

    res.sendStatus(404);
  },
  deleteArticle: function deleteArticle(req, res) {
    var id = parseInt(req.params.id, 10); // eslint-disable-next-line no-shadow

    var article = _articleModel["default"].find(function (article) {
      return article.id === id;
    });

    if (article) {
      _articleModel["default"].splice(_articleModel["default"].indexOf(article), 1);

      return res.status(204).json({
        status: 204,
        message: 'article successfully deleted'
      });
    }

    res.sendStatus(404);
  },
  postArticle: function postArticle(req, res) {
    var article = {
      id: parseInt(req.body.id, 10),
      createdOn: Date(new Date()),
      title: req.body.title,
      article: req.body.article,
      authorId: parseInt(req.body.authorId, 10),
      comments: req.body.comments
    };

    _articleModel["default"].push(article);

    res.status(201).json({
      status: 201,
      message: 'article created successfully',
      data: article
    });
  },
  patchArticle: function patchArticle(req, res) {
    var id = parseInt(req.params.id, 10);
    var updatedArticle = req.body;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _articleModel["default"][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var article = _step.value;

        if (article.id === id) {
          article.title = updatedArticle.title || article.title;
          article.article = updatedArticle.article || article.article;
          return res.status(200).json({
            status: 200,
            message: 'Article edited successfully',
            data: article
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

    res.status(404).json({
      status: 404,
      message: 'No found with the given id'
    });
  }
};
var _default = articleController;
exports["default"] = _default;
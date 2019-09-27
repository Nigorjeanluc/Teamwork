"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _commentModel = _interopRequireDefault(require("./commentModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var articles = [{
  id: 1,
  createdOn: 'now',
  title: 'Title For The Article One',
  article: 'Title For The Article One Title For The Article One Title For The Article One',
  authorId: 'Author One',
  comments: []
}, {
  id: 2,
  createdOn: 'in the future',
  title: 'Title For The Article Two',
  article: 'Title For The Article One Title For The Article One Title For The Article Two',
  authorId: 'Author Two',
  comments: []
}];
var _default = articles;
exports["default"] = _default;
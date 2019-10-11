"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_dotenv["default"].config();

var user = {
  id: 1200,
  createdOn: new Date().toDateString,
  firstName: 'Jean Jaures',
  lastName: 'SIBOMANA',
  email: 'jaures@gmail.com',
  gender: 'Male',
  jobRole: 'CEO',
  department: 'Leadership',
  address: 'KG 54 Kibagabaga',
  password: _bcrypt["default"].hashSync('123456789', 10)
};
var article = {
  id: 8,
  createdOn: new Date().toString(),
  title: 'Title One',
  article: 'Article contents. Article contents. Article contents. Article contents.',
  authorId: 54,
  comments: [{
    id: 1,
    authorId: 2,
    comment: 'Nothing but G thing. Nothing but G thing. Nothing but G thing.'
  }] // eslint-disable-next-line newline-per-chained-call

};

var token = _jsonwebtoken["default"].sign({
  id: user.id,
  access: 'auth'
}, process.env.JWT_KEY, {
  expiresIn: '1h'
}).toString();

_chai["default"].use(_chaiHttp["default"]);

describe('Article Controller', function () {
  it('GET /api/v1/feeds', function () {
    _chai["default"].request(_app["default"]).get('/api/v1/feeds').set('Authorization', "Bear ".concat(token)).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(200);
    }); // expect({ id: 1 }).to.be.an('object');
    // eslint-disable-next-line no-unused-expressions
    // expect([2, 3]).to.be.empty;
    // expect(1).to.equals(1);

  });
  it('POST /api/v1/articles', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/articles').send(article).set('Authorization', "Bear ".concat(token)).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(201);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.message).to.be.a('string');
    });
  });
  it("GET /api/v1/articles/".concat(article.id), function () {
    _chai["default"].request(_app["default"]).get("/api/v1/articles/".concat(article.id)).set('Authorization', "Bear ".concat(token)).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(200);
    }); // expect({ id: 1 }).to.be.an('object');
    // eslint-disable-next-line no-unused-expressions
    // expect([2, 3]).to.be.empty;
    // expect(1).to.equals(1);

  });
  it("POST /api/v1/articles/".concat(article.id, "/comments"), function () {
    _chai["default"].request(_app["default"]).post("/api/v1/articles/".concat(article.id, "/comments")).send({
      id: article.comments.length + 1,
      articleId: 1,
      createdOn: new Date().toLocaleString(),
      // eslint-disable-next-line max-len
      articleTitle: article.title,
      // eslint-disable-next-line max-len
      article: article.article,
      authorId: 10,
      comments: 'New comment. New comment. New comment. New comment. New comment.'
    }).set('Authorization', "Bear ".concat(token)).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(201);
    }); // expect({ id: 1 }).to.be.an('object');
    // eslint-disable-next-line no-unused-expressions
    // expect([2, 3]).to.be.empty;
    // expect(1).to.equals(1);

  });
  it("PATCH /api/v1/articles/".concat(article.id), function () {
    _chai["default"].request(_app["default"]).patch("/api/v1/articles/".concat(article.id)).send({
      title: 'Title Two',
      article: 'Nothing but Dev thing'
    }).set('Authorization', "Bear ".concat(token)).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(200);
    }); // expect({ id: 1 }).to.be.an('object');
    // eslint-disable-next-line no-unused-expressions
    // expect([2, 3]).to.be.empty;
    // expect(1).to.equals(1);

  });
  it("DELETE /api/v1/articles/".concat(article.id), function () {
    _chai["default"].request(_app["default"])["delete"]("/api/v1/articles/".concat(article.id)).set('Authorization', "Bear ".concat(token)).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(204);
    }); // expect({ id: 1 }).to.be.an('object');
    // eslint-disable-next-line no-unused-expressions
    // expect([2, 3]).to.be.empty;
    // expect(1).to.equals(1);

  });
});
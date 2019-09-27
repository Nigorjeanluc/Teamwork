"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import app from '../app';
_chai["default"].use(_chaiHttp["default"]);

describe('Article Controller', function () {
  it('GET /api/v1/articles', function () {
    _chai["default"].request(_app["default"]).get('/api/v1/articles').end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(200);
    }); // expect({ id: 1 }).to.be.an('object');
    // eslint-disable-next-line no-unused-expressions
    // expect([2, 3]).to.be.empty;
    // expect(1).to.equals(1);

  });
  it('POST /api/v1/articles', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/articles').send({
      id: 1,
      createdOn: 'in the future',
      title: 'Title One',
      article: 'Article contents. Article contents. Article contents. Article contents.',
      authorId: 'Jay Jay',
      comments: [{
        id: 1,
        authorId: 2,
        comment: 'Nothing but G thing. Nothing but G thing. Nothing but G thing.'
      }]
    }).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(401);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.message).to.be.a('string'); // expect(res.body.data).not.to.be.empty;
      // expect(res.body.data[1].id).equals(2);
    });
  });
});
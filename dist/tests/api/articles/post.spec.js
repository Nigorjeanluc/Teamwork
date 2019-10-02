"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

describe('Article Controller', function () {
  it('POST /api/v1/articles', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/articles').end(function (err, res) {
      expect(res.status).to.equals(201);
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('array');
      expect(res.body.data).not.to.be.empty;
      expect(res.body.data[1].id).equals(2);
    });
  });
});
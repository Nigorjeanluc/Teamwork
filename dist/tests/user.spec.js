"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

_chai["default"].use(_chaiHttp["default"]);

describe('User Controller', function () {
  it('POST /api/v1/auth/signup', function () {
    _chai["default"].request(_app["default"]).get('api/v1/auth/signup/').send(user).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(201);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.token).to.be.a('string');
    });
  });
  it('POST /api/v1/auth/signin', function () {
    _chai["default"].request(_app["default"]).get('api/v1/auth/signin/').send({
      email: user.email,
      password: "".concat(user.password)
    }).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(404);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.token).to.be.a('string');
      console.log(res.body.token);
    });
  });
});
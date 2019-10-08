import chai, { expect } from "chai";
import chaiHTTP from "chai-http";
import User from "../v2/models/userClass";
import app from "../app";
import func from "../v2/helpers/functions";

const user = new User(
  "Jean Jaures",
  "SIBOMANA",
  `${func.randomString(6)}@gmail.com`,
  "Male",
  "Learning Facilitator",
  "Department",
  "KG 54 Kibagabaga",
  "123456789"
);

const invalidUser = new User(
  "",
  "SIBOMANA",
  `${func.randomString(6)}@gmail.com`,
  "Male",
  "Learning Facilitator",
  "Department",
  "KG 54 Kibagabaga",
  "123456789"
);

chai.use(chaiHTTP);

describe("POST /api/v1/auth/signup", () => {
  it("if user enter invalid firstname", () => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equals(422);
        expect(res.body).to.be.an("object");
        expect(res.body.error).to.be.a("string");
      });
  });
  it("POST /api/v1/auth/signup", () => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equals(201);
        expect(res.body).to.be.an("object");
        expect(res.body.token).to.be.a("string");
      });
  });
});

describe("User Controller", () => {
  it("POST /api/v1/auth/signin", () => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send({ email: user.email, password: `${user.password}` })
      .end((err, res) => {
        expect(res.status).to.equals(200);
        expect(res.body).to.be.an("object");
        expect(res.body.token).to.be.a("string");
      });
  });
});

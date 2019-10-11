import chai, { expect } from "chai";
import chaiHTTP from "chai-http";
import User from "../models/userClass";
import app from "../../app";
import func from "../helpers/functions";
import pool from "../models/dbConnect";
import allqueries from "../models/allqueries";

const user = new User(
    "Jean Jaures",
    "SIBOMANA",
    `${func.randomString(6)}@gmail.com`,
    "Male",
    "Facilitator",
    "Department",
    "KG 54 Kibagabaga",
    "123456789"
);

const invalidUser = new User("", "", "", "", "", "", "", "");

chai.use(chaiHTTP);

describe("POST /api/v2/auth/signup", () => {
    it("should check if user enter invalid field", () => {
        chai
            .request(app)
            .post("/api/v2/auth/signup")
            .send(invalidUser)
            .end((err, res) => {
                expect(res.status).to.equals(422);
                expect(res.body).to.have.property("status");
                expect(res.body).to.have.property("error");
                expect(res.body).to.be.an("object");
                expect(res.body.error).to.be.a("string");
            });
    });
    it("should ensure that user with valid ", () => {
        chai
            .request(app)
            .post("/api/v2/auth/signup")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equals(201);
                expect(res.body).to.be.an("object");
                expect(res.body.data).to.be.an("object");
                expect(res.body.data.token).to.be.a("string");
                expect(res.body).to.have.property("status");
                expect(res.body).to.have.property("data");
                expect(res.body.data).to.have.property("token");
            });
    });
});

describe("POST /api/v2/auth/signin", () => {
    it("should sign in user with valid credentials", () => {
        chai
            .request(app)
            .post("/api/v2/auth/signin")
            .send({ email: user.email, password: `${user.password}` })
            .end((err, res) => {
                expect(res.status).to.equals(200);
                expect(res.body).to.be.an("object");
                expect(res.body.data).to.be.an("object");
                expect(res.body.data.token).to.be.a("string");
                expect(res.body).to.have.property("status");
                expect(res.body).to.have.property("data");
                expect(res.body.data).to.have.property("token");
            });
    });

    it("should not sign in user with invalid credentials but stored in the db", () => {
        chai
            .request(app)
            .post("/api/v2/auth/signin")
            .send({ email: user.email, password: `gjghjgj${user.password}454` })
            .end((err, res) => {
                expect(res.status).to.be.equals(401);
                expect(res.body).to.be.an("object");
                expect(res.body.error).to.be.a("string");
                expect(res.body).to.have.property("status");
                expect(res.body).to.have.property("error");
            });
    });
    it("should not sign in user with valid but not stored in the db", () => {
        chai
            .request(app)
            .post("/api/v2/auth/signin")
            .send({ email: `jauresgmail.com`, password: `${user.password}` })
            .end((err, res) => {
                expect(res.status).to.equals(422);
                expect(res.body).to.be.an("object");
                expect(res.body.error).to.be.a("string");
                expect(res.body).to.have.property("status");
                expect(res.body).to.have.property("error");
            });
    });
});
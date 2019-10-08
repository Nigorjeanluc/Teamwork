import chai, { expect } from "chai";
import chaiHTTP from "chai-http";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import app from "../app";
import Article from "../models/articleClass";
import articles from "../models/articleModel";

dotenv.config();

const user = {
  id: 1200,
  createdOn: new Date().toDateString,
  firstName: "Jean Jaures",
  lastName: "SIBOMANA",
  email: "jaures@gmail.com",
  gender: "Male",
  jobRole: "CEO",
  department: "Leadership",
  address: "KG 54 Kibagabaga",
  password: bcrypt.hashSync("123456789", 10)
};

const article = new Article(
  "Title One",
  "Article contents. Article contents. Article contents. Article contents.",
  "Fashion",
  1200
);

articles.push(article);

const token = jwt
  .sign({ id: user.id, access: "auth" }, process.env.JWT_KEY, {
    expiresIn: "1h"
  })
  .toString();

chai.use(chaiHTTP);

describe("Article Controller", () => {
  it("GET /api/v1/feeds", () => {
    chai
      .request(app)
      .get("/api/v1/feeds")
      .set("Authorization", `Bear ${token}`)
      .end((err, res) => {
        expect(res.status).to.equals(200);
      });
  });

  it("POST /api/v1/articles", () => {
    chai
      .request(app)
      .post("/api/v1/articles")
      .send(article)
      .set("Authorization", `Bear ${token}`)
      .end((err, res) => {
        expect(res.status).to.equals(201);
        expect(res.body).to.be.an("object");
        expect(res.body.message).to.be.a("string");
      });
  });

  it(`GET /api/v1/articles/${article.id}`, () => {
    chai
      .request(app)
      .get(`/api/v1/articles/${article.id}`)
      .set("Authorization", `Bear ${token}`)
      .end((err, res) => {
        expect(res.status).to.equals(200);
      });
  });

  it(`POST /api/v1/articles/${article.id}/comments`, () => {
    chai
      .request(app)
      .post(`/api/v1/articles/${article.id}/comments`)
      .send({
        id: article.comments.length + 1,
        articleId: 1,
        createdOn: new Date().toLocaleString(),
        articleTitle: article.title,
        article: article.article,
        authorId: 10,
        comments:
          "New comment. New comment. New comment. New comment. New comment."
      })
      .set("Authorization", `Bear ${token}`)
      .end((err, res) => {
        expect(res.status).to.equals(201);
      });
  });

  it(`PATCH /api/v1/articles/${article.id}`, () => {
    chai
      .request(app)
      .patch(`/api/v1/articles/${article.id}`)
      .send({ title: "Title Two", article: "Nothing but Dev thing" })
      .set("Authorization", `Bear ${token}`)
      .end((err, res) => {
        expect(res.status).to.equals(200);
      });
  });

  it(`DELETE /api/v1/articles/${article.id}`, () => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${article.id}`)
      .set("Authorization", `Bear ${token}`)
      .end((err, res) => {
        expect(res.status).to.equals(204);
      });
  });
});

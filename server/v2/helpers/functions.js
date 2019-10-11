import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../models/dbConnect";

dotenv.config();

class func {
  static randomString(length) {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static idFinder(items, id) {
    items.find(item => item.id === id);
  }

  static emailFinder(items, email) {
    items.find(item => item.email === email);
  }

  static idIncrementor(arr) {
    arr.length + 1;
  }

static toInteger(id) {
    return parseInt(id, 10);
  }
  static jwtSign(id, email) {
    const done = jwt.sign(
      {
        id,
        email
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h"
      }
    );

    return done;
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static comparePassword(password, matchPassword) {
    return bcrypt.compareSync(password, matchPassword);
  }

  static async execQuery(query) {
    (async () => {
      await pool.query(query);
    })().catch(error => process.stdout.write(`${error}\n`));
  }
}

export default func;

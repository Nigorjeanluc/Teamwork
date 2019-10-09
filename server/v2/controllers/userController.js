import User from "../models/userClass";
import func from "../helpers/functions";
import userFunc from "../models/userModel";
import pool from "../models/dbConnect";
import allqueries from "../models/allqueries";

class UserController {
  static async signUp (req, res) {
    const user = new User(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.gender,
      req.body.jobRole,
      req.body.department,
      req.body.address,
      req.body.password
    );
    
    await pool.query(allqueries.insertEmployee, [
      user.firstName,
      user.lastName,
      user.email,
      user.gender,
      user.jobRole,
      user.department,
      user.address,
      user.isAdmin,
      func.hashPassword(req.body.password),
      user.createdOn
    ]).then((result) => {
      const message = "User created successfully";
      const token = func.jwtSign(result.rows[0].id, result.rows[0].email);
      return res.status(201).json({
          status: 201,
          message,
          data: {
              token,
          }
      });
    }).catch(err => {
      console.log('query error', e.message, e.stack);
      const message = "Query error";
      return res.status(201).json({
          status: 201,
          message,
          error: err.message
      });
    });
  }
  static async signIn (req, res) {
    const userAuth = {
      email: req.body.email,
      password: req.body.password
    };

    await pool.query(allqueries.getAnEmployee, [
      userAuth.email
    ]).then((result) => {
      if (result.rows[0].id) {
        const message = "User is successfully logged in";
        const token = func.jwtSign(result.rows[0].id, result.rows[0].email);
        return res.status(200).json({
            status: 200,
            message,
            data: {
                token,
            }
        });
      } else {
        return res.status(401).json({
          status: 401,
          error: "Auth failed"
        });
      }
    }).catch(err => {
      console.log('query error', e.message, e.stack);
      const message = "Query error";
      return res.status(201).json({
          status: 201,
          message,
          error: err.message
      });
    });
  }
};

export default UserController;

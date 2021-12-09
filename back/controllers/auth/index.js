import mongoose from 'mongoose';
import {usersModel} from '../../models/users'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appConfig from "../../config/env";
const authController = {};

authController.loginAction = async (req, res) =>{
    usersModel
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0].id
            },
            appConfig.jwt_key,
            {
              expiresIn: appConfig.jwt_expiration
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            userData: {
              fullname: user[0].firstName + ' ' + user[0].lastName,
              email: user[0].email,
              image: user[0].image
            }
          });
        }
        res.status(400).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

export default authController;
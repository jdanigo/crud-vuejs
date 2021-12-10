import mongoose from 'mongoose';
import {usersModel} from '../../models/users'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const usersController = {};

usersController.getAction = async (req, res) =>{
    const {id} = req.params;
    try {
        let user = await usersModel.findById(id);
        if (!user) {
          return res
            .status(400)
            .json({ message: "User not found" });
        }
        return res.json({data: user});
      } catch (error) {
        return res
          .status(500)
          .json({ message: error.toString() });
      }
}

usersController.getAllAction = async (req, res) => {
    try {
        let users = await usersModel.find();
        return res.json({data: users});
      } catch (error) {
        return res
          .status(500)
          .json({ message: error.toString() });
      }
}

usersController.createAction = async (req, res)=>{
    usersModel
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          console.log(hash);
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
           const newUser = await usersModel.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              image: req.body.image,
              email: req.body.email,
              phone: req.body.phone,
              password: hash
            });
            let { password, __v, ...user } = newUser.toObject();
            return res.status(201).json({ data: user, message: 'User Created Successfully' });
          }
        });
      }
    });
}

usersController.updateAction = async (req, res)=>{
    const {id} = req.params;
    const {password} = req.body;
    if(password != undefined){
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    try {
        let user = await usersModel.findById(id);
        if (!user) {
          return res
            .status(400)
            .json({ message: "User not found" });
        }
        Object.assign(user, req.body);
        await user.save();
        return res.json({data: user, message: "User Updated Successfully"});
      } catch (error) {
        return res.status(500).json({ message: error.toString() });
      }
}

usersController.deleteAction = async (req, res) => {
  const {id} = req.params;
  try {
    let user = await usersModel.findByIdAndRemove(id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found" });
    }
    return res.json({ message: "User deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
}

export default usersController;
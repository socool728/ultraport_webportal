import asyncHandler from 'express-async-handler';
import _ from 'lodash';
import User from '../models/user.js';

import {
  validateSignInUser,
  validateSignUpUser
} from '../validations/user.js';

import {
  userAuthenticateSuccessResponse,
} from '../response_models/user.js';
import { USER_ROLES } from '../utils/constants.js';

const userExists = asyncHandler(async (email) => {
  try {
    const user = await User.findOne({ email });
    if (user) return user;
    return false;
  } catch (error) {
    return false;
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const validation = validateSignInUser(req.body);
    const { error } = validation;
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await userExists(req.body.email);

    if (!user) {
      return res.status(500).send({
        message: `User not found with provided email adddress. Please try with correct one.`,
      });
    }

    if (user && (await user.matchPassword(req.body.password))) {
      res.status(200).send(userAuthenticateSuccessResponse(user));
    } else {
      return res.status(500).send({
        message: `Invalid email address or password.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(
      `An error occurred during processing the request. More details: ${error}`
    );
  }
});


// @desc  User SignUp
// @route  POST /api/users
// @access Public

const register = asyncHandler(async (req, res) => {
  try {
    const validation = validateSignUpUser(req.body);
    const { error } = validation;
    if (error)
      return res.status(400).send({ message: error.details[0].message });


    const { role } = req.body;
    const isUserExists = await userExists(req.body.email);
    if (isUserExists)
      return res.status(500).send({
        message: `Email address already taken. Please try with another one.`,
      });
    const user = new User({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      role,
      parentId: req.body.parentId,
    });

    const newUser = await user.save();
    if (newUser) {
      res.status(201).send(userAuthenticateSuccessResponse(newUser));
    } else {
      res.status(500);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(
      `An error occurred during processing the request. More details: ${error}`
    );
  }
});



// @desc   Delete user profile
// @route  DELETE /api/users/:id
// @access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.status(200).send({ message: 'User successfully deleted.' });
    }else{
      res.status(500).send({ message: req });
    }
  } catch (error) {
    res.status(500);
    throw new Error(
      `Internal Server Error. Unable to delete user due to this following errors: ${error}`
    );
  }
});

// @desc   Get user List
// @route  GET /api/users
// @access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  try {
    
    const getAdmin = await User.findOne({_id:req.params.id});
    let users = []
    if(getAdmin.role == "superadmin" && getAdmin.parentId == "1"){
      users = await User.find({parentId: {$ne : "1"}}).sort({ created: -1 });
    }else {
      users = await User.find({parentId:req.params.id}).sort({ created: -1 });
    }
    if (users) {
      res.status(200).send({ users });
    } else {
      res.status(500);
      throw new Error(
        `Internal Server Error. Unable to retrieve users. Please try again later.`
      );
    }
  } catch (error) {
    res.status(500);
    throw new Error(
      `Internal Server Error. Unable to retrieve users due to this following errors: ${error}`
    );
  }
});

const editUser = asyncHandler(async (req, res) => {
  try {
      const users = User.findByIdAndUpdate(req.params.id, {
          name: req.body.name,
          email: req.body.email,
          role: req.body.role,
      })
      .then(user => {
          if(!user) {
              return res.status(500).send({
                  message: "User not found."
              });
          }
          res.status(201).send({ message: 'User successfully edited.' });
      }).catch(error => {
        res.status(500);
        throw new Error(
          `Internal Server Error. Unable to retrieve users due to this following errors: ${error}`
        );
      });
} catch (error) {
    res.status(500);
    throw new Error(
      `Internal Server Error. Unable to delete user due to this following errors: ${error}`
    );
  }
});

export {
  login,
  deleteUser,
  register,
  getUsers,
  editUser,
};

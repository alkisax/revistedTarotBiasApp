// https://github.com/mkarampatsis/coding-factory7-nodejs/blob/main/usersApp/controllers/auth.controller.js
// https://fullstackopen.com/en/part4/token_authentication
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const User = require('../models/user.models')
const authService = require('../services/auth.service')
const userDAO = require('../daos/user.dao')

const FRONTEND_URL = process.env.FRONTEND_URL
exports.login = async (req,res) => {
  try {

    const username = req.body.username
    const password = req.body.password

    if (!username) {
      logger.warn("Login attempt missing username");
      return res.status(400).json({
        status: false,
        message: "Username is required"
      });
    }
    
    if (!password) {
      logger.warn("Login attempt missing password");
      return res.status(400).json({
        status: false,
        message: "Password is required"
      });
    }

    // Step 1: Find the user by username
    const user = await userDAO.findUserByUsername(req.body.username);

    if(!user){
      logger.warn(`Failed login attempt - user not found: ${username}`);
      return res.status(401).json({
        status: false,
        message: 'Invalid username or password or user not found'
      })
    }

    // Step 2: Check the password
    const isMatch = await authService.verifyPassword (password, user.hashedPassword)

    if(!isMatch){
      logger.warn(`Failed login attempt - incorrect password for user: ${username}`);
      return res.status(401).json({
        status: false,
        message: 'Invalid username or password'
      })
    }

    // Step 3: Generate the token
    const token = authService.generateAccessToken(user)
    logger.info(`User ${user.username} logged in successfully`);

    // Step 4: Return the token and user info
    res.status(200).json({
      status: true,
      data: {
        token: token,
        user: {
          username: user.username,
          email: user.email,
          roles: user.roles,
          id: user._id
        }
      }
    })

  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(400).json({
      status: false,
      data: error.message
    })
  }
}


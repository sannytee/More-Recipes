import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import { Users } from '../models';
import account from '../helper/account';

export default {
  /**
   * Enables Users to signup for account
   * @param {Object}  req
   * @param {Object} res
   * @returns  {JSON} Returns success or failure message
   */
  signup(req, res) {
    // Gets username email and password from body
    const { username, email } = req.body;
    let { password } = req.body;
    if (password) {
      password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    // Create User with provided info
    account.createUser(req, res, Users, username, password, email);
  },
  /**
   * Enables Users to signin into account
   * @param {Object}  req
   * @param {Object} res
   * @returns  {JSON} Returns success or failure message
   */
  signIn(req, res) {
    const { Op } = Sequelize;
    if(!req.body.username || !req.body.email){
      return res.status(400).send({
        message: 'Username or  email required'
      });
    }
    if(!req.body.password) {
      return res.status(400).send({
        message: 'password required',
      });
    }
    account.signInUser(req, res, Users, bcrypt, jwt, Op);
  }
};


import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../models';
import account from '../helper/account';

export default {
  /**
   * Enables Users to signup for account
   * @param {*}  req
   * @param {*} res
   * @returns  {send} Returns success or failure message
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
};


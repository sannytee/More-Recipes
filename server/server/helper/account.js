/**
 * @class account
 */
export default class account {
  /**
   * Create a new User
   * @param {object} req
   * @param {object} res
   * @param {object} model
   * @param {string} username
   * @param {*} password
   * @param {string} email
   * @returns  {JSON} Returns success or failure message
   */
  static createUser(req, res, model, username, password, email) {
    model
      .create({
        username,
        email,
        password,
      })
      .then((user) => {
        res.status(201).send({
          success: true,
          message: 'Account created',
          username: user.username,
          id: user.id
        });
      })
      .catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError' || 'SequelizeValidationError') {
          return res.status(400).send({
            error: err.errors[0].message
          });
        }
        return res.status(400).send({
          message: err
        });
      });
  }

  /**
   * Allows a user to sign in
   * @param {object} req
   * @param {object} res
   * @param {object} model
   * @param {object} bcrypt
   * @param {object} jwt
   * @param {object} Op
   * @returns  {JSON} Returns success or failure message
   */
  static signInUser(req, res, model, bcrypt, jwt, Op) {
    model
      .findOne({
        where: {
          [Op.or]: [
            { email: req.body.email },
            { username: req.body.username }
          ]
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            error: 'User not found'
          });
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = { id: user.id };
          const token = jwt.sign(payload, 'andelabootcampproject', {
            expiresIn: '2h' // expires in 2 hours
          });

          // Return the information including token as JSON Value
          res.status(200).send({
            success: true,
            message: 'Token Generated. Signin successful!',
            userId: user.id,
            token,
          });
        } else {
          res.status(400).send({
            error: 'Incorrect Login details'
          });
        }
      })
      .catch(err => res.status(400).send({
        error: err
      }));
  }
}

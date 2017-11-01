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
      .catch(err => res.status(400).send({
        message: err
      }));
  }
}

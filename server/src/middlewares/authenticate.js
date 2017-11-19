import jwt from 'jsonwebtoken';

require('dotenv').config();

export default {
  verifyUser(req, res, next) {
    const token = req.headers.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'Session has expired'
          });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'You are not authorized'
      });
    }
  }
};


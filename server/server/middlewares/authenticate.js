import jwt from 'jsonwebtoken';

export default {
  verifyUser(req, res, next) {
    const token = req.headers.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, 'andelabootcampproject', (err, decoded) => {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'Invalid token'
          });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Token not Provided'
      });
    }
  }
};


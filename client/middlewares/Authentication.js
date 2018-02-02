import jwt from 'jsonwebtoken';

const authenticateUser = () => {
  const token = localStorage.getItem('token');
  const key = process.env.SECRET;
  if (token === null) {
    localStorage.clear();
    return false;
  }
  if (token.trim() === '') {
    localStorage.clear();
    return false;
  }

  if (token) {
    jwt.verify(token, key, (error) => {
      if (error) {
        return false;
      }
    });
  }
};

export default authenticateUser;


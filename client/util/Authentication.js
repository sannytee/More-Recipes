import jwt from 'jsonwebtoken';

const authenticateUser = () => {
  const token = localStorage.getItem('token');
  const decodeToken = jwt.decode(token);
  if (decodeToken === null) {
    localStorage.clear();
    return false;
  }

  if (decodeToken.exp * 1000 < (new Date().getTime())) {
    localStorage.clear();
    return false;
  }

  return true;
};

export default authenticateUser;


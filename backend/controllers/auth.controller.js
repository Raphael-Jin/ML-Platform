const njwt = require('njwt');
const repo = require('../db/user.repo.js');
const bcrypt = require('bcrypt');

const {
  APP_SECRET = 'secret' } = process.env;

const encodeToken = (tokenData) => {
  return njwt.create(tokenData, APP_SECRET).compact();
}

const decodeToken = (token) => {
  return njwt.verify(token, APP_SECRET).setExpiration(new Date().getTime() + 604800000).body; //1 week
}

module.exports = {
  authMiddleware: async function (req, res, next) {
    const token = req.header('Access-Token');
    if (!token) {
      return next();
    }
  
    try {
      const decoded = decodeToken(token);
      const { userId } = decoded;
      const user = await repo.getUserById(userId)
      if (user) {
        req.userId = userId;
      }
    } catch (e) {
      return next();
    }
    next();
  },

  authenticated: function (req, res, next){
    if (req.userId) {
      return next();
    }
  
    res.status(401);
    res.json({ error: 'User not authenticated' });
  },

  login: async function (req, res) {
    const { username, password } = req.body;
  
  
    const user = await repo.getUserByUsername(username)
  
    if (!user) {
      returnInvalidCredentials(res)
    }
  
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const accessToken = encodeToken({ userId: user.id });
        return res.json({ accessToken });
      } else {
        return returnInvalidCredentials(res);
      }
    });
  }


} 



const returnInvalidCredentials = (res) => {
  res.status(401);
  return res.json({ error: 'Invalid username or password' });

}
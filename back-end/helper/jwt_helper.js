const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const { saveRefreshToken, RefreshToken } = require('../Models/RefreshTokenSchema');

module.exports = {
  signAccessToken: (insertId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        insertId
      }
      const secret = process.env.ACCESS_TOKEN_SECRET
      const options = {
        expiresIn: "1h",
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError())
        }
        resolve(token)
      })
    })
  },

  verifyAccessToken: (req, res, next) => {
    if (!req.headers['authorization']) {
      return res.json({ error: 'Unauthorized' });
    }

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorize' : err.message
        return res.json({ error: message });
      }
      req.payload = payload;
      next();
    });
  },

  signRefreshToken: (insertId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        insertId,
      };
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: '1m',
      };
      JWT.sign(payload, secret, options, async (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
         try {
           await saveRefreshToken(insertId,token);
           console.log(Date.now()); 
          resolve(token);
         } catch (error) {
         reject(createError.InternalServerError());
         }
        resolve(token)
      });
    });
  },


  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return reject(createError.Unauthorized('Token has expired'));
          }
          return reject(createError.Unauthorized('Invalid token'));
        }
        resolve(payload);
      });
    });
  },
  

  signRePassToken: (email) => {
    return new Promise((resolve, reject) => {
      const payload = {
        email
      }
      const secret = process.env.REPASS_TOKEN_SECRET
      const options = {
        expiresIn: "15m",
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError())
        }
        resolve(token)
      })
    })
  },


  verifyRepassToken: (token => {
    return new Promise((resolve, reject) => {
      JWT.verify(token, process.env.REPASS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            reject({ error: 'Token expired' });
          } else {
            resolve({ error: 'Invalid token' });
          }
        } else {
          resolve(payload);
        }
      });
    });
  }),

  signInviteToken: (memberId,eventId, time ) => {
    return new Promise((resolve, reject) => {
      const payload = {
        memberId, 
        eventId
      }
      const secret = process.env.INVITE_TOKEN_SECRET
      const options = {
        expiresIn: time,
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError())
        }
        resolve(token)
      })
    })
  },

  verifyInviteToken: (token) => {
    return new Promise((resolve, reject) => {
      JWT.verify(token, process.env.INVITE_TOKEN_SECRET, (err, payload) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            reject({ error: 'Token expired' });
          } else {
            resolve({ error: 'Invalid token' });
          }
        } else {
          resolve(payload);
        }
      });
    });
  },

  signRegisterToken: (email) => {
    return new Promise((resolve, reject) => {
      const payload = {
        email
      }
      const secret = process.env.REGISTER_TOKEN_SECRET
      const options = {
        expiresIn: "15m",
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError())
        }
        resolve(token)
      })
    })
  },


  verifyRegisterToken: (token => {
    return new Promise((resolve, reject) => {
      JWT.verify(token, process.env.REGISTER_TOKEN_SECRET, (err, payload) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            reject({ error: 'Token expired' });
          } else {
            resolve({ error: 'Invalid token' });
          }
        } else {
          resolve(payload);
        }
      });
    });
  }),
  
}

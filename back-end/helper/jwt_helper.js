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
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorize' : err.message
        return res.status(401).json({ error: message });
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
        expiresIn: '1d',
      };
      JWT.sign(payload, secret, options, async (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        try {
          await saveRefreshToken(token);
          resolve(token);
        } catch (error) {
          reject(createError.InternalServerError());
        }
      });
    });
  },


  verifyRefreshToken: (refreshToken) => {
    return new Promise(async (resolve, reject) => {
      try {

        const tokenInDB = await RefreshToken.findOne({ token: refreshToken });
        if (!tokenInDB) {
          return reject(createError.Unauthorized('Hết hạn token'));
        }

        // Xác minh token
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
          if (err) {
            return reject(createError.Unauthorized('Token không hợp lệ'));
          }
          resolve(payload);
        });
      } catch (error) {
        reject(createError.InternalServerError());
      }
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
            return resolve.status(401).json({ error: 'Token expired' });
          } else {
            return resolve.status(401).json({ error: 'Invalid token' });
          }
        }
        resolve(payload);
      });
    })
  }),
}

const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const client = require('./init_redis')

module.exports = {
  signAccessToken: (insertId) => {
    return new Promise((resolve, reject) => {
      const payload = {

      }
      const secret = process.env.ACCESS_TOKEN_SECRET
      const options = {
        expiresIn: "15s",
        issuer: "pickurpage.com",
        audience: insertId.toString()
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
      next(); // Tiếp tục xử lý yêu cầu
    });
  },

  signRefreshToken: (insertId) => {
    return new Promise((resolve, reject) => {
      const payload = {

      }
      const secret = process.env.REFRESH_TOKEN_SECRET
      const options = {
        expiresIn: "1y",
        issuer: "pickurpage.com",
        audience: insertId.toString()
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError())
        }

        client.SET(insertId, token, (err, reply) => {
          if(err) {
            console.log(err.message)
            reject(createError.InternalServerError())
            return
          }
        })

        resolve(token)
      })
    })
  },

  verifyRefreshToken: (refreshToken => {
    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if(err) return reject(createError.Unauthorized())
        const accountID =  parseInt(payload.adu, 10);
        
        resolve(accountID)
      })
    })
  })
}
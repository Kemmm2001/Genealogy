const JWT = require('jsonwebtoken')
const createError = require('http-errors')

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
      next(); // Tiếp tục xử lý yêu cầu
    });
  },

  signRefreshToken: (insertId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        insertId
      }
      const secret = process.env.REFRESH_TOKEN_SECRET
      const options = {
        expiresIn: "1m",
      }
      JWT.sign(payload, secret, options, async (err, token) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError())
        }
<<<<<<< HEAD

        resolve(token);

        // Lưu refreshToken vào cơ sở dữ liệu
        const refreshTokenPath = `refreshTokens/${insertId}`; // Đường dẫn trong cơ sở dữ liệu
        const refreshTokenRef = db.ref(refreshTokenPath);

        try {
          await refreshTokenRef.set({ token }); // Lưu thông tin refreshToken vào Firebase
        } catch (error) {
          console.error("Lỗi khi lưu refreshToken vào cơ sở dữ liệu Firebase:", error);
          reject(createError.InternalServerError());
        }
      })
    })
  },
=======
      
        resolve(token)
      })
    })
  },

>>>>>>> 99073471e72d517b69047ad037c694e458d84e14
  verifyRefreshToken: (refreshToken => {
    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) return reject(createError.Unauthorized())

        resolve(payload)
      })
    })
  })
}

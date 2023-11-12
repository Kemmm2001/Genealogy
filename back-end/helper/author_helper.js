const jwtUtils = require('../helper/jwt_helper');
const createError = require('http-errors');
const userService = require('../service/Authoration/RoleManagement');

module.exports = {
    authenticateAndAuthorize: (requiredRole) => {
        return async (req, res, next) => {
            try {
                // Xác thực token
                jwtUtils.verifyAccessToken(req, res, async () => {
                    const insertId = req.payload.insertId;

                    // Lấy roleId từ insertId
                    const roleId = await userService.getRoleID(insertId);
                    console.log(roleId)
                    // Kiểm tra quyền của người dùng
                    if (!roleId) {
                        return res.status(403).json({ error: 'Forbidden' });
                    }

                    if (requiredRole === 1) {
                        // Role 1 có quyền cao nhất, được phép làm mọi thứ
                        if (roleId === 1) {
                            // Người dùng có quyền, tiếp tục xử lý yêu cầu
                            next();
                        } else {
                            return res.status(403).json({ error: 'Forbidden' });
                        }
                    }
                    else if (requiredRole === 2) {
                        // Role 2 có thể làm mọi thứ của Role 3, nhưng không làm được những gì Role 1 làm
                        if (roleId === 1 || roleId === 2) {
                            // Người dùng có quyền, tiếp tục xử lý yêu cầu
                            next();
                        } else {
                            return res.status(403).json({ error: 'Forbidden' });
                        }
                    } 
                    else if (requiredRole === 3) {
                        // Role 3 có thể làm mọi thứ của chính nó, nhưng không làm được những gì Role 1 và Role 2 làm
                        if (roleId === 3) {
                            // Người dùng có quyền, tiếp tục xử lý yêu cầu
                            next();
                        } else {
                            return res.status(403).json({ error: 'Forbidden' });
                        }
                    } else {
                        return res.status(403).json({ error: 'Forbidden' });
                    }
                });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        };
    },
};
const jwtUtils = require('../helper/jwt_helper');
const userService = require('../service/Authoration/RoleManagement');
const Response = require('../Utils/Response')

module.exports = {
    authenticateAndAuthorize: (requiredRole) => {
        return async (req, res, next) => {
            try {
                jwtUtils.verifyAccessToken(req, res, async (error) => {
                    if (error) {
                        if (error === 'Token expired') {
                            return res.send(Response.badRequestResponse(null, "Token hết hạn"));
                        } else {
                            return res.send(Response.badRequestResponse(null, "Unauthorized"));
                        }
                    }

                    if (requiredRole === 1) {
                        // Role 1 có quyền cao nhất, được phép làm mọi thứ
                        if (roleId === 1) {
                            // Người dùng có quyền, tiếp tục xử lý yêu cầu
                            next();
                        } else {
                            return res.send(Response.badRequestResponse(null, "Bạn không có quyền"));
                        }
                    }
                    else if (requiredRole === 2) {
                        // Role 2 có thể làm mọi thứ của Role 3, nhưng không làm được những gì Role 1 làm
                        if (roleId === 1 || roleId === 2) {
                            // Người dùng có quyền, tiếp tục xử lý yêu cầu
                            next();
                        } else {
                            return res.send(Response.badRequestResponse(null, "Bạn không có quyền"));
                        }
                    } 
                    else if (requiredRole === 3) {
                        // Role 3 có thể làm mọi thứ của chính nó, nhưng không làm được những gì Role 1 và Role 2 làm
                        if (roleId === 3) {
                            // Người dùng có quyền, tiếp tục xử lý yêu cầu
                            next();
                        } else {
                            return res.send(Response.badRequestResponse(null, "Bạn không có quyền"));
                        }
                    } else {
                        return res.send(Response.badRequestResponse(null, "Bạn chưa được cấp quyền"));
                    }
                });
            } catch (error) {
                console.error(error);
                return res.send(Response.internalServerErrorResponse(null, error.messsage));
            }
        };
    },
};
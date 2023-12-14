const jwtUtils = require('../helper/jwt_helper');
const userService = require('../service/Authoration/RoleManagement');
const Response = require('../Utils/Response')

module.exports = {
    authenticateAndAuthorize: (requiredRole) => {
        return async (req, res, next) => {
            try {
                jwtUtils.verifyGenealogyToken(req, res, async (error) => {
                    if (error) {
                        if (error === 'Token expired') {
                            return res.send(Response.tokenExpiredTime());
                        } else if (error === 'JsonWebTokenError') {
                            return res.send(Response.unauthorizedResponse());
                        } else if (error === 'Unauthorized') {
                            return res.send(Response.unauthorizedResponse());
                        } else {
                            return res.send(Response.forbiddenResponse());
                        }
                    }
                    let insertId = req.payload.insertId;
                    let codeId = req.payload.codeId;
                    let roleId = await userService.getRoleID(insertId, codeId);

                    console.log('roleId: ' + roleId)

                    if (!roleId) {
                        res.send(Response.dataNotFoundResponse(null, "Chưa có roleID"));
                    }

                    if (requiredRole === 1) {
                        if (roleId === 1) {
                            next();
                        } else {
                            return res.send(Response.badRequestResponse(null, "Bạn không có quyền"));
                        }
                    }
                    else if (requiredRole === 2) {
                        if (roleId === 1 || roleId === 2) {
                            next();
                        } else {
                            return res.send(Response.badRequestResponse(null, "Bạn không có quyền"));
                        }
                    }
                    else if (requiredRole === 3) {
                        if (roleId === 1 || roleId === 2 || roleId === 3) {

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
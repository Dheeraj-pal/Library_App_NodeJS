"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = void 0;
const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        const { roles } = res.locals.user;
        if (!roles.some((role) => allowedRoles.includes(role))) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;

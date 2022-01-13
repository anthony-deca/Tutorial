"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requireLogin(req, res, next) {
    try {
        var sess = req.session;
        if (!sess.email)
            return res.status(401).json({ message: "You have to log in to access this route" });
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}
exports.default = requireLogin;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var router = express_1.Router();
router.post("/register", user_controller_1.register);
router.get("/login", user_controller_1.login);
exports.default = router;

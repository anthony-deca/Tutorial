"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
var user_model_1 = __importDefault(require("../models/user.model"));
var user_helpers_1 = require("../Helpers/user-helpers");
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name_1, password, email, hashedPassword, params, errors_1, user, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, name_1 = _a.name, password = _a.password, email = _a.email;
                    return [4 /*yield*/, user_helpers_1.hash(password)];
                case 1:
                    hashedPassword = _b.sent();
                    params = { name: name_1, password: hashedPassword, email: email };
                    errors_1 = [];
                    Object.entries(params).forEach(function (_a) {
                        var key = _a[0], value = _a[1];
                        if (value === undefined)
                            errors_1.push(key + " is required");
                    });
                    if (errors_1.length)
                        return [2 /*return*/, res.status(400).json({ errors: errors_1 })];
                    return [4 /*yield*/, new user_model_1.default(params).save()];
                case 2:
                    user = _b.sent();
                    res.status(201).json({ status: "Success", data: user });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.log(error_1.message);
                    next(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var sess, _a, email, password, user, isVerified, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    sess = req.session;
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
                case 1:
                    user = _b.sent();
                    if (!user)
                        res.status(404).json({ message: "user with email " + email + " not found" });
                    return [4 /*yield*/, user_helpers_1.verify(password, user.password)];
                case 2:
                    isVerified = _b.sent();
                    if (!isVerified)
                        res.status(403).json({ message: "enter a valid password" });
                    sess.email = req.body.email;
                    res.status(200).json({ status: "Success", data: user });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    console.log(error_2.message);
                    next(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                req.session.destroy(function (err) {
                    if (err)
                        throw Error(err);
                    res.status(200).json({ message: "You have logged out successfully" });
                });
            }
            catch (error) {
                console.log(error.message);
                next(error);
            }
            return [2 /*return*/];
        });
    });
}
exports.logout = logout;

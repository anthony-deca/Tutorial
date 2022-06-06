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
exports.removeAllTutorials = exports.removeATutorial = exports.updateATutorial = exports.getATutorial = exports.getAllTutorial = exports.createTutorial = void 0;
var tutorial_model_1 = __importDefault(require("../models/tutorial.model"));
var mongoose_1 = __importDefault(require("mongoose"));
function createTutorial(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, title, description, published, params, errors_1, tutorial, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, title = _a.title, description = _a.description, published = _a.published;
                    params = { title: title, description: description, published: published };
                    errors_1 = [];
                    Object.entries(params).forEach(function (_a) {
                        var key = _a[0], value = _a[1];
                        if (value === undefined)
                            errors_1.push(key + " is required");
                    });
                    if (errors_1.length)
                        return [2 /*return*/, res.status(400).json({ errors: errors_1 })];
                    return [4 /*yield*/, new tutorial_model_1.default(params).save()];
                case 1:
                    tutorial = _b.sent();
                    res.status(201).json({ status: "Success", data: tutorial });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.log(error_1.message);
                    next(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createTutorial = createTutorial;
function getAllTutorial(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var selector, title, allTutorials, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    selector = {};
                    if (req.query.title) {
                        title = req.query.title;
                        selector = { title: title };
                    }
                    return [4 /*yield*/, tutorial_model_1.default.find(selector)];
                case 1:
                    allTutorials = _a.sent();
                    if (!allTutorials.length)
                        return [2 /*return*/, res.status(404).json({ message: "No tutorial match found" })];
                    return [2 /*return*/, res.status(200).json({ status: "Success", data: allTutorials })];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2.message);
                    next(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllTutorial = getAllTutorial;
function getATutorial(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, tutorial, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                        return [2 /*return*/, res.status(404).json({
                                message: "request with id " + id + " not found"
                            })];
                    }
                    return [4 /*yield*/, tutorial_model_1.default.findById({ _id: id })];
                case 2:
                    tutorial = _a.sent();
                    return [2 /*return*/, res.status(200).json({ status: "Success", data: tutorial })];
                case 3:
                    error_3 = _a.sent();
                    console.log(error_3.message);
                    next(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getATutorial = getATutorial;
// async function getATutorialByTitle(req:Request, res:Response, next:NextFunction){
//     const {title} = req.query;
//     try {
//         const tutorial = await Tutorial.findOne({title});
//         return res.status(200).json({status:"Success", data:tutorial})
//     } catch (error:any) {
//         console.log(error.message);
//         next(error);
//     }
// }
function updateATutorial(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, title, description, published, tutorial, result, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    id = req.params.id;
                    _a = req.body, title = _a.title, description = _a.description, published = _a.published;
                    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                        return [2 /*return*/, res.status(404).json({
                                message: "request with id " + id + " not found"
                            })];
                    }
                    return [4 /*yield*/, tutorial_model_1.default.findById({ _id: id })];
                case 1:
                    tutorial = _b.sent();
                    tutorial.title = title || tutorial.title;
                    tutorial.description = description || tutorial.description;
                    if (published !== undefined)
                        tutorial.published = published;
                    return [4 /*yield*/, tutorial.save()];
                case 2:
                    result = _b.sent();
                    res.status(200).json({ Status: "Success", data: result });
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    console.log(error_4);
                    next(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateATutorial = updateATutorial;
function removeATutorial(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, tutorial, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                        return [2 /*return*/, res.status(404).json({
                                message: "request with id " + id + " not found"
                            })];
                    }
                    return [4 /*yield*/, tutorial_model_1.default.findByIdAndDelete({ _id: id })];
                case 1:
                    tutorial = _a.sent();
                    if (!tutorial)
                        return [2 /*return*/, res.status(404).json({ message: "Tutorial with id " + id + " not found" })];
                    return [2 /*return*/, res.status(200).json({ status: "Success", message: "Tutorial deleted successfully" })];
                case 2:
                    error_5 = _a.sent();
                    console.log(error_5);
                    next(error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.removeATutorial = removeATutorial;
;
function removeAllTutorials(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, tutorial_model_1.default.deleteMany({})];
                case 1:
                    _a.sent();
                    res.status(404).json({ message: "No tutorial is available in the database" });
                    return [2 /*return*/, res.status(200).json({ status: "Success", message: "All Tutorials deleted successfully" })];
                case 2:
                    error_6 = _a.sent();
                    console.log(error_6);
                    next(error_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.removeAllTutorials = removeAllTutorials;
;

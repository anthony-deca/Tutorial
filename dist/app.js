"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var db_config_1 = __importDefault(require("./config/db-config"));
var index_1 = __importDefault(require("./routes/index"));
var tutorial_routes_1 = __importDefault(require("./routes/tutorial-routes"));
var user_routes_1 = __importDefault(require("./routes/user-routes"));
var session_helper_1 = __importDefault(require("./Helpers/session-helper"));
var app = express_1.default();
db_config_1.default();
// view engine setup
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(cors_1.default({
    origin: 'https://localhost:3000',
    credentials: true
}));
app.use(session_helper_1.default);
app.use('/', index_1.default);
app.use('/tutorial', tutorial_routes_1.default);
app.use('/user', user_routes_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;

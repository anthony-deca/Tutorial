import createError, {HttpError} from 'http-errors';
import express, {Request, Response, NextFunction } from 'express';
import cookieParser  from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dbConnect from "./config/db-config";
import index from "./routes/index";
import tutorial from "./routes/tutorial-routes";
import user from "./routes/user-routes";
import sessionObj from "./Helpers/session-helper";

let app = express();

dbConnect();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: 'https://localhost:3000',
  credentials: true
}))

app.use(sessionObj);

app.use('/', index);
app.use('/tutorial', tutorial);
app.use('/user', user);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:HttpError, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;

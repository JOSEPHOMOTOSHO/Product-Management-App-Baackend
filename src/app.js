const createError =require('http-errors');
const express = require('express');
const cors = require( 'cors');
const compression = require('compression');
const morgan = require("morgan");
const apiRouter = require('./routes/index') ;
const usersRouter = require('./routes/users-routes');
const productsRouter = require("./routes/products-routes")
const commentsRouter = require("./routes/comments-routes")
const repliesRouter = require("./routes/replies-routes")



const app = express();

// Setup Request logging
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

app.use(
  morgan(logFormat, {
    skip: function (_req, res) {
      if (process.env.NODE_ENV === 'test') {
        return true;
      }

      return res.statusCode < 400;
    },
    stream: process.stderr,
  }),
);

app.use(
  morgan(logFormat, {
    skip: function (_req, res) {
      if (process.env.NODE_ENV === 'test') {
        return true;
      }

      return res.statusCode >= 400;
    },
    stream: process.stdout,
  }),
);

app.disable('x-powered-by');
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);
app.use('/users', usersRouter);
app.use("/products",productsRouter)
app.use("/comments",commentsRouter)
app.use("/reply",repliesRouter)





// catch 404 and forward to error handler
app.use(function (
  _req,
  _res,
  next,
) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app

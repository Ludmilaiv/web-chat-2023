const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
// var path = require('path');
// var cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const logStream = fs.createWriteStream(
  path.join(__dirname, 'logs.log'),
  { flags: 'a' }
);

app.use(logger(config.get('log_format'), { stream: logStream }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/test", function (req, res) {
  res.end("test");
})

app.get("/", function (req, res) {
  // res.end("Hello");
  res.render("index", {
    title: "Веб-чат",
    date: (new Date()).toDateString()
  });
})

app.use("/forbidden", function (req, res, next) {
  next(createError(403, "Ой! Вам сюда нельзя!"));
})

// app.use(function(req, res) {
//     res.status(404);
//     res.send("Страница не найдена. Извините :((")
// })


// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, "Страница не найдена. Извините :(("));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  // Особый шаблон для 404
  if (err.status == 404) {
    res.render('error404');
  } else {
    res.render('error');
  }
});

module.exports = app;

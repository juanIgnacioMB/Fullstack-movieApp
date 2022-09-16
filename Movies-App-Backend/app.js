var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jsw = require("jsonwebtoken");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const cors = require("cors")

var app = express();

app.use(cors())


//---------------------------------
/*
app.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send({ "msg": "This has CORS enabled 🎈" })
  })*/

//-----------------------------

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

/*
function verifyToken(req, res, next) {
  jsw.verify(req.headers["x-access-token"], "movies", function (err, decoded) {
    if (err) {
      res.json({ message: err.message });
    } else {
      console.log(decoded);
      next();
    }
  });
}
*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

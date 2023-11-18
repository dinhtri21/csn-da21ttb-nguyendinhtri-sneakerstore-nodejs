var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var indexRouter = require("./routes/index");
var productsRouter = require("./routes/products");
var featuredRouter = require("./routes/featuredProducts");
var cartRouter = require("./routes/cart");


const cors = require("cors");

var app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
    store: new session.MemoryStore(),
    cookie: new session.Cookie({
      secure: false, // Chỉ đặt true khi sử dụng HTTPS
    }),
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Kích hoạt CORS cho tất cả các tài nguyên

//router
app.use("/", indexRouter);
app.use("/cart", cartRouter);
app.use("/products", productsRouter);
app.use("/featured", featuredRouter);


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

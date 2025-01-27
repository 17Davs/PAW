var createError = require("http-errors");
var express = require("express");
var path = require("path");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var authRouter = require("./routes/auth");
var pointRouter = require("./routes/points");
var pickupRouter = require("./routes/pickup");
var donationRouter = require("./routes/donation");
var dashboardRouter = require("./routes/dashboard");

var swaggerUI = require("swagger-ui-express");
var swaggerDocument = require("./swagger");
var cors = require("cors");
var authRouterAPI = require("./routes/API/auth");
var donationsRouterAPI = require("./routes/API/donation");
var donatorsRouterAPI = require("./routes/API/donator");
var entityRouterAPI = require("./routes/API/entity");
var pickupRouterAPI = require("./routes/API/pickup");
var rulesRouterAPI = require("./routes/API/rules");

const { checkUser } = require("./public/javascripts/auth");

//db connection
const uri = "mongodb+srv://appuser:passwored@cluster0.rqlins9.mongodb.net/demo1";
mongoose.connect(uri).then((res) => {
  console.log("conected to db!");
  console.log("http://localhost:3000");
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get("*", checkUser);
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);
app.use("/user", userRouter);
app.use("/points", pointRouter);
app.use("/pickups", pickupRouter);
app.use("/donations", donationRouter);

app.use("/api/auth", authRouterAPI);
app.use("/api/donations", donationsRouterAPI);
app.use("/api/donators", donatorsRouterAPI);
app.use("/api/entities", entityRouterAPI);
app.use("/api/pickups", pickupRouterAPI);
app.use("/api/rules", rulesRouterAPI);
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
  res.render("error", { title: "404" });
});

module.exports = app;

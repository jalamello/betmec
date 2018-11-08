const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/apirouter");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const bcrypt = require("bcrypt-nodejs");

let app = express();

//mongoose.connect("mongodb://localhost/betsdatabase").then(
mongoose
  .connect(
    //"mongodb://localhost/betsdatabase"
    "mongodb://jalamello:Tubam0n@cluster0-shard-00-00-tcye3.mongodb.net:27017,cluster0-shard-00-01-tcye3.mongodb.net:27017,cluster0-shard-00-02-tcye3.mongodb.net:27017/betsdatabase?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
  )
  .then(
    () => {
      console.log("MongoDB.com connection success");
    },
    error => {
      console.log("MongoDB connection failure: " + error);
    }
  );

app.use(bodyParser.json());

// user database
let loggedUsers = [];

function isUserLogged(req, res, next) {
  console.log("isUserLogged");
  let token = req.headers.token;
  for (let i = 0; i < loggedUsers.length; i++) {
    if (token === loggedUsers[i].token) {
      req.user = loggedUsers[i].username;
      return next();
    }
  }
  res.status(403).json({ message: "not allowed" });
}

function createToken() {
  let token = "";
  let letters = "abcdefghijklmnABCDEFGHIJKLMN0123456789";
  for (let i = 0; i < 1024; i++) {
    let temp = Math.floor(Math.random() * 38);
    token = token + letters[temp];
  }
  return token;
}

function createHash(pw) {
  return bcrypt.hashSync(pw, bcrypt.genSaltSync(8), null);
}

function isPasswordValid(pw, hash) {
  return bcrypt.compareSync(pw, hash);
}

// LOGIN API

app.post("/register", function(req, res) {
  console.log("register");

  if (!req.body.username || !req.body.password) {
    return res.status(409).json({ message: "username already in use" });
  }

  if (req.body.username.length === 0 || req.body.password.length === 0) {
    return res.status(409).json({ message: "username already in use" });
  }

  let user = new userModel({
    username: req.body.username,
    password: createHash(req.body.password)
  });

  user.save(function(err, item) {
    if (err) {
      return res.status(409).json({ message: "Username already in use" });
    } else {
      console.log("register success:" + item.username);
      return res.status(200).json({ message: "success" });
    }
  });
});

app.post("/login", function(req, res) {
  console.log("login: " + req.body.username);
  if (!req.body.username || !req.body.password) {
    return res.status(403).json({
      message: "Wrong username or password"
    });
  }
  if (req.body.username.length === 0 || req.body.password.length === 0) {
    return res.status(403).json({
      message: "Wrong username or password"
    });
  }

  userModel.findOne({ username: req.body.username }, function(err, user) {
    if (err) {
      return res.status(403).json({ message: "Wrong username or password" });
    }
    if (isPasswordValid(req.body.password, user.password)) {
      let token = createToken();
      loggedUsers.push({
        username: user.username,
        token: token
      });

      return res.status(200).json({ token: token });
    }
    return res.status(403).json({ message: "Wrong username or password" });
  });
});

app.post("/logout", function(req, res) {
  let token = req.headers.token;
  for (let i = 0; i < loggedUsers.length; i++) {
    if (token === loggedUsers[i].token) {
      console.log("logout success:" + loggedUsers[i].username);
      loggedUsers.splice(i, 1);
      return res.status(200).json({ message: "success" });
    }
  }
  res.status(404).json({ message: "not found" });
});

//GET USERS

app.get("/users", isUserLogged, function(req, res) {
  console.log("Get users");
  userModel.find({}, "username", function(err, users) {
    if (err) {
      return res.status(404).json({ message: "not found" });
    }
    let tempList = [];
    for (let i = 0; i < users.length; i++) {
      tempList.push(users[i].username);
    }
    return res.status(200).json(tempList);
  });
});

app.use("/api", isUserLogged, apiRouter);

app.listen(3001);

console.log("Running in port 3001");

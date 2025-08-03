const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

global.jwt = require("jsonwebtoken");
global.addSlashes = require("slashes").addSlashes;
global.stripSlashes = require("slashes").stripSlashes;

const db = require("./database");
global.db_pool = db.pool;

// ראוטרים
const auth_R = require("./routers/auth_R");
const tasks_R = require("./routers/tasks_R");
const categories_R = require("./routers/categories_R");
const user_Mid = require("./middleware/user_Mid");

app.use("/", auth_R);
app.use("/tasks", [user_Mid.isLogged], tasks_R);
app.use("/categories", [user_Mid.isLogged], categories_R);

app.get("/", [user_Mid.isLogged], (req, res) => {
    res.redirect("/tasks/list");
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

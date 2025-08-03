const express = require("express");
const router = express.Router();
const user_Mid = require("../middleware/user_Mid");

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", [user_Mid.CheckLogin], (req, res) => {
    if (req.validUser)
        res.redirect("/tasks/list");
    else
        res.redirect("/login");
});

router.get("/logout", (req, res) => {
    res.clearCookie("TaskToken");
    res.redirect("/login");
});

module.exports = router;

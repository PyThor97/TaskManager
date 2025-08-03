const express = require("express");
const router = express.Router();

router.get("/list", (req, res) => {
    res.send("פה תוצג רשימת המשימות של המשתמש " + req.user_name);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const categories_Mid = require("../middleware/categories_Mid");

// טופס הוספה
router.get("/add", (req, res) => {
    res.render("category_add", { data: {} });
});

// הוספה ל-DB
router.post("/add", [categories_Mid.AddCategory], (req, res) => {
    res.redirect("/categories/list");
});

// רשימת קטגוריות של המשתמש
router.get("/list", [categories_Mid.GetCategories], (req, res) => {
    res.render("categories_list", {
        categories: req.categories,
    });
});

module.exports = router;

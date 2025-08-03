const express = require("express");
const router = express.Router();
const categories_Mid = require("../middleware/categories_Mid");

router.get("/add", (req, res) => {
    res.render("category_add", { data: {} });
});

router.post("/add", [categories_Mid.AddCategory], (req, res) => {
    res.redirect("/categories/list");
});

router.get("/list", [categories_Mid.GetCategories], (req, res) => {
    res.render("categories_list", {
        categories: req.categories,
    });
});

module.exports = router;

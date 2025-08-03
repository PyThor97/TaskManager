const express = require("express");
const router = express.Router();
const tasks_Mid = require("../middleware/tasks_Mid");
const categories_Mid = require("../middleware/categories_Mid");

router.get("/add", [categories_Mid.GetCategories], (req, res) => {
    res.render("task_add", {
        data: {},
        categories: req.categories
    });
});

router.post("/add", [tasks_Mid.AddTask], (req, res) => {
    res.redirect("/tasks/list");
});

router.get("/list", [tasks_Mid.GetTasks, categories_Mid.GetCategories], (req, res) => {
    res.render("tasks_list", {
        tasks: req.tasks,
        categories: req.categories,
        filter: req.filter,
        page: req.page,
        total_pages: req.total_pages
    });
});

router.post("/markdone", [tasks_Mid.MarkTaskDone], (req, res) => {
    res.redirect("/tasks/list");
});

module.exports = router;

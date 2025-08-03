async function AddTask(req, res, next) {
    let user_id = req.user_id;
    let description = addSlashes(req.body.description || "");
    let due_date = addSlashes(req.body.due_date || "");
    let category_id = parseInt(req.body.category_id || 0);
    let is_done = 0;

    const promisePool = db_pool.promise();
    let q = `INSERT INTO tasks_taskM (user_id, category_id, description, due_date, is_done)
             VALUES (${user_id}, ${category_id}, '${description}', '${due_date}', ${is_done})`;

    try {
        await promisePool.query(q);
    } catch (err) {
        console.log(err);
    }

    next();
}

async function GetTasks(req, res, next) {
    const user_id = req.user_id;
    let page = parseInt(req.query.p || "0");
    let perPage = 10;
    let is_done = req.query.status;
    let category_id = req.query.category_id;

    req.page = page;
    req.filter = {
        status: is_done,
        category_id: category_id
    };

    let where = `WHERE user_id = ${user_id}`;
    if (is_done === "1") where += ` AND is_done = 1`;
    else if (is_done === "0") where += ` AND is_done = 0`;

    if (category_id && category_id !== "-1") {
        where += ` AND category_id = ${category_id}`;
    }

    const promisePool = db_pool.promise();

    let countQuery = `SELECT COUNT(*) AS cnt FROM tasks_taskM ${where}`;
    let dataQuery = `SELECT * FROM tasks_taskM ${where} ORDER BY due_date ASC LIMIT ${page * perPage}, ${perPage}`;

    try {
        const [countRows] = await promisePool.query(countQuery);
        req.total_pages = Math.floor(countRows[0].cnt / perPage);

        const [dataRows] = await promisePool.query(dataQuery);
        req.tasks = dataRows;
    } catch (err) {
        console.log(err);
        req.tasks = [];
        req.total_pages = 0;
    }

    next();
}

async function MarkTaskDone(req, res, next) {
    let task_id = parseInt(req.body.task_id || 0);
    const promisePool = db_pool.promise();

    let q = `UPDATE tasks_taskM SET is_done = 1 WHERE id = ${task_id}`;
    try {
        await promisePool.query(q);
    } catch (err) {
        console.log(err);
    }

    next();
}

module.exports = {
    AddTask,
    GetTasks,
    MarkTaskDone
};

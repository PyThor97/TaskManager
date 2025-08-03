async function AddCategory(req, res, next) {
    let name = (req.body.name !== undefined) ? addSlashes(req.body.name) : "";
    let user_id = req.user_id;

    const promisePool = db_pool.promise();
    let q = `INSERT INTO categories_taskM (user_id, name) VALUES (${user_id}, '${name}')`;

    try {
        await promisePool.query(q);
    } catch (err) {
        console.log(err);
    }

    next();
}

async function GetCategories(req, res, next) {
    let user_id = req.user_id;
    const promisePool = db_pool.promise();
    let rows = [];

    let q = `SELECT * FROM categories_taskM WHERE user_id = ${user_id} ORDER BY name ASC`;

    try {
        [rows] = await promisePool.query(q);
    } catch (err) {
        console.log(err);
    }

    req.categories = rows;
    next();
}

module.exports = {
    AddCategory,
    GetCategories
};

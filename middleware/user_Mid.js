const md5 = require("md5");

async function CheckLogin(req, res, next) {
    let uname = req.body.uname || "";
    let passwd = req.body.passwd || "";
    let enc_pass = md5("A" + passwd);
    let Query = `SELECT * FROM users_taskM WHERE uname = '${addSlashes(uname)}' AND passwd = '${enc_pass}'`;

    const promisePool = db_pool.promise();
    let rows = [];
    try {
        [rows] = await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }

    if (rows.length > 0) {
        req.validUser = true;
        let val = `${rows[0].id},${rows[0].name}`;
        const token = jwt.sign({ data: val }, "TaskSecret", { expiresIn: "30d" });
        res.cookie("TaskToken", token, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    }

    next();
}

async function isLogged(req, res, next) {
    const jwtToken = req.cookies.TaskToken;
    if (!jwtToken) return res.redirect("/login");

    try {
        const decoded = jwt.verify(jwtToken, "TaskSecret");
        const [user_id, name] = decoded.data.split(",");
        req.user_id = parseInt(user_id);
        req.user_name = name;
        next();
    } catch (err) {
        return res.redirect("/login");
    }
}

async function RegisterUser(req, res, next) {
    let name = addSlashes(req.body.name || "");
    let uname = addSlashes(req.body.uname || "");
    let passwd = req.body.passwd || "";
    let email = addSlashes(req.body.email || "");
    let enc_pass = md5("A" + passwd);

    const promisePool = db_pool.promise();
    const q = `INSERT INTO users_taskM (name, uname, passwd, email)
               VALUES ('${name}', '${uname}', '${enc_pass}', '${email}')`;

    try {
        await promisePool.query(q);
    } catch (err) {
        console.log(err);
    }

    next();
}

module.exports = {
    CheckLogin,
    isLogged,
    RegisterUser
};

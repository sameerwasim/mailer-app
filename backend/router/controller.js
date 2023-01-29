const _db = require("../mysql");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { encrypt } = require("./hasher");
var jwtSecret = process.env.JWT_SECRET;
const saltRounds = 10;

// Login

exports.create = (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password.toString(), saltRounds, function (err, hash) {
    if (err) {
      res.status(401).send(err);
    } else {
      _db().query(`INSERT INTO users SET username = ?, pass = ?`, [username, hash], (err, response) => {
        if (err) {
          res.status(401).send(err);
        } else {
          const token = jwt.sign({ id: response.insertId }, jwtSecret, {
            expiresIn: 60 * 60 * 72,
          });

          res.send(token);
        }
      });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  _db().query(`SELECT * FROM users WHERE username = ?`, [email], (err, response) => {
    if (err) res.status(401).send(err);
    else if (response.length != 0) {
      var { id, pass, username } = response[0];
      bcrypt.compare(password.toString(), pass, (err, hash) => {
        if (hash === true) {
          const token = jwt.sign({ id }, jwtSecret, {
            expiresIn: 60 * 60 * 72,
          });

          res.json({
            user: {
              id,
              fullName: username,
            },
            token,
          });
        } else {
          res.send("Incorrect Username or Password");
        }
      });
    } else {
      res.send("Incorrect Username or Password");
    }
  });
};

exports.verify = (req, res) => {
  const token = req.headers["x-access-token"];
  jwt.verify(token, jwtSecret, function (err, decoded) {
    if (err) res.status(401).send(false);
    else {
      res.send(true);
    }
  });
};

exports.templates = (req, res) => {
  const { userId } = req.body;
  _db().query(`SELECT id, id as name FROM templates WHERE userId = ?`, userId, (err, response) => {
    if (err) res.status(401).send(err);
    else {
      res.send(response);
    }
  });
};

// Mailer

exports.mailerCreate = (req, res) => {
  const { userId, template, email, group, password, provider } = req.body;
  _db().query(
    "INSERT INTO `mailers`(`userid`, `templateId`, `group`, `provider`, `email`, `password`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [userId, template, group, provider, email, encrypt(password), "onGoing"],
    (err, response) => {
      if (err) {
        res.status(401).send(err);
      } else {
        res.send(response);
      }
    }
  );
};

exports.mailerGet = (req, res) => {
  const { userId } = req.body;
  _db().query(`SELECT * FROM mailers WHERE userId = ? AND mailers.status = 'onGoing'`, userId, (err, response) => {
    if (err) res.status(401).send(err);
    else {
      res.send(response);
    }
  });
};

exports.mailerGetAll = (req, res) => {
  var { filters } = req.query;
  var { userId, pagination } = JSON.parse(filters);
  console.log(req.query);
  _db().query(`SELECT * FROM mailers WHERE userId = ? ${pagination ? `LIMIT ${pagination[0]}, ${pagination[1]}` : ""}`, userId, (err, response) => {
    if (err) res.status(401).send(err);
    else {
      _db().query(`SELECT count(*) as total FROM mailers WHERE userId = ?`, [userId], (err, total) => {
        if (err) res.status(401).send(err);
        else res.send({ data: response, total: total?.[0]?.total || 0 });
      });
    }
  });
};

exports.groups = (req, res) => {
  const { userId } = req.body;
  _db().query(`SELECT \`group\` as id, \`group\` as name FROM emails WHERE userId = ? GROUP BY \`group\``, userId, (err, response) => {
    if (err) res.status(401).send(err);
    else {
      res.send(response);
    }
  });
};

exports.logs = (req, res) => {
  var { filters } = req.query;
  var { id, userId, group, mailer, pagination } = JSON.parse(filters);
  if (pagination) {
    pagination = JSON.parse(pagination);
  }

  var sql = "",
    totalSql = "";

  if (id) {
    sql = `SELECT emails.id, emails.email, logs.status FROM logs INNER JOIN emails ON emails.id = logs.emailId WHERE mailerId = ${_db().escape(id)} ${
      pagination ? `LIMIT ${pagination[0]}, ${pagination[1]}` : ""
    }`;
    totalSql = `SELECT count(*) as total FROM logs INNER JOIN emails ON emails.id = logs.emailId WHERE mailerId = ${_db().escape(id)} ${pagination ? `LIMIT ${pagination[0]}, ${pagination[1]}` : ""}`;
  } else {
    sql = `SELECT id, email, IFNULL((SELECT logs.status FROM logs WHERE emailId = emails.id AND mailerId = ?), 'Pending') as status FROM emails WHERE \`group\` = ? AND userid = ? ${
      pagination ? `LIMIT ${pagination[0]}, ${pagination[1]}` : ""
    }`;
    totalSql = `SELECT count(*) as total FROM logs INNER JOIN emails ON emails.id = logs.emailId WHERE mailerId AND emails.userid = ?`;
  }

  _db().query(sql, [mailer, group, userId], (err, response) => {
    if (err) res.status(401).send(err);
    else {
      _db().query(totalSql, [mailer, group, userId], (err, total) => {
        if (err) res.status(401).send(err);
        else res.send({ data: response, total: total?.[0]?.total || 0 });
      });
    }
  });
};

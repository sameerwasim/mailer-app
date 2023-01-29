var jwt = require("jsonwebtoken");
var jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];
  jwt.verify(token, jwtSecret, function (err, decoded) {
    if (err) res.status(401).send("Unauthenticated");
    else {
      if (decoded && decoded.id) {
        var { filters, pagination } = req.query;
        if (filters || pagination) {
          filters = filters ? JSON.parse(filters) : {};
          filters.userId = decoded.id;
          req.query.filters = JSON.stringify(filters);
        } else {
          req.body.userId = decoded.id;
        }
        next();
      } else {
        res.status(401).send("Unauthenticated");
      }
    }
  });
};

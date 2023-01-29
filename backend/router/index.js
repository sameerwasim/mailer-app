const router = require("express").Router();
const controller = require("./controller");
const middleware = require("../middleware");

router
  // Login
  .post("/users/create", middleware, controller.create)
  .post("/users/login", controller.login)
  .get("/users/verify", middleware, controller.verify)
  .get("/users/templates", middleware, controller.templates)
  // Mailer
  .post("/mailer", middleware, controller.mailerCreate)
  .get("/mailer", middleware, controller.mailerGet)
  .get("/mailers", middleware, controller.mailerGetAll)
  .get("/groups", middleware, controller.groups)
  // Logs
  .get("/logs", middleware, controller.logs);

module.exports = router;

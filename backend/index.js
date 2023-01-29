const mysql = require("mysql-rcm");
const express = require("express");
const cors = require("cors");
require("dotenv").config({
  path: ".env." + process.env.NODE_ENV,
});
const customRouter = require("./router");
const middleware = require("./middleware");
const crons = require("./crons");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(customRouter);
app.use(
  mysql({
    config: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_DB,
    },
    tables: [
      {
        name: "emails",
        endpoints: ["GET", "POST", "PUT", "DELETE"],
        middleware: {
          points: ["GET", "POST", "PUT", "DELETE"],
          validator: middleware,
        },
      },
      {
        name: "templates",
        endpoints: ["GET", "POST", "PUT", "DELETE"],
        middleware: {
          points: ["GET", "POST", "PUT", "DELETE"],
          validator: middleware,
        },
      },
    ],
  })
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  crons.sendEmail();
  console.log(`Listening on ${PORT}`);
});

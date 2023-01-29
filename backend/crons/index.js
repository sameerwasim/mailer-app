const _db = require("../mysql");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const { decrypt } = require("../router/hasher");

exports.sendEmail = () => {
  console.log("Send Email Cron Job Started");
  cron.schedule("0 */5 * * *", () => {
    mailJob();
  });
};

const mailJob = () => {
  _db().query(`SELECT mailers.*, templates.subject, templates.template FROM mailers INNER JOIN templates ON templates.id = mailers.templateId WHERE status = 'onGoing'`, (err, mailers) => {
    if (err) return -1;
    else {
      mailers.forEach((mailer) => {
        _db().query(
          `SELECT id, email, IFNULL((SELECT logs.status FROM logs WHERE emailId = emails.id AND mailerId = ?), 'Pending') as status FROM emails WHERE \`group\` = ? AND userid = ?`,
          [mailer.id, mailer.group, mailer.userid],
          (err, emails) => {
            if (err) return -1;
            else {
              emails.forEach(async (email) => {
                if (email.status == "Pending") {
                  await mailSend(email, mailer);
                }
              });
            }
          }
        );

        _db().query(`UPDATE mailers SET status = 'Completed' WHERE id = ?`, [mailer.id], (err, result) => {
          if (err) return -1;
        });
      });
    }
  });
};

const mailSend = async (email, mailer) => {
  const provider = { GG: "gmail" };

  _db().query("INSERT INTO `logs`(`mailerId`, `emailId`, `status`) VALUES (?, ?, ?)", [mailer.id, email.id, "Initiated"], (err, res) => {
    var id = res.insertId;
    const update = (status) =>
      _db().query("UPDATE `logs` SET `status`= ? WHERE id = ?", [status, id], (err, result) => {
        if (err) console.log(err);
        else console.log(result);
      });

    if (err) {
      update("Failed");
      return -1;
    } else {
      var transporter = nodemailer.createTransport({
        service: provider[mailer.provider],
        auth: {
          user: mailer.email,
          pass: decrypt(mailer.password),
        },
      });

      var mailOptions = {
        from: mailer.email,
        to: email.email,
        subject: mailer.subject,
        html: mailer.template,
      };
      transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
          update("Failed");
          return -1;
        } else {
          update("Sent");
          return 1;
        }
      });
    }
  });
  return await Promise.resolve();
};

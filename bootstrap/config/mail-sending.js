const constant = require("./constant");
const nodemailer = require("nodemailer");
var hbs = require("nodemailer-express-handlebars");
var exphbs = require("express-handlebars");
const mkdirp = require("mkdirp");
var fs = require("fs");
var getDirName = require("path").dirname;
var moment = require("moment-timezone");

function emailFailLog(data) {
  const logpath =
    constant.email_fail_log_path +
    `/${moment().format("DD-MM-YYYY")}/log-${moment().format("DD-MM-YYYY__HH-mm-ss")}-fail.log`;

  mkdirp.sync(getDirName(logpath));
  var json = [];
  try {
    const data = fs.readFileSync(logpath, {
      encoding: "utf8",
      flag: "r",
    });
    json = JSON.parse(data);
  } catch (error) {}
  json.push(data);
  fs.writeFileSync(logpath, JSON.stringify(json, null, 4));
  console.log("email fail log path - " + logpath);
}

module.exports = async (
  message = {
    from: process.env.MAIL_FROM_ADDRESS || "<no-reply>@mail.com",
    to: "",
    subject: "",
    cc: "",
    bcc: "",
    html: "",
    attachments: [],
  }
) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.ethereal.email",
    port: process.env.MAIL_PORT || 587,
    secure: process.env.MAIL_SECURE === "true" ? true : false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME || "",
      pass: process.env.MAIL_PASSWORD || "",
    },
  });
  transporter.use(
    "compile",
    hbs({
      viewEngine: exphbs.create({
        extname: "hbs",
        defaultLayout: "",
        layoutsDir: "",
      }),
      viewPath: constant.email_template_path,
      extName: ".hbs",
    })
  );
  let info;
  try {
    info = await transporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error(error);
    emailFailLog({
      error: error,
      sending: message
    });
  }
};

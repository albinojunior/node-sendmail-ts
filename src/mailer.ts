//LOAD ENVIRONMENT VARS
require("dotenv").config();

import { resolve } from "path";
import { createTransport } from "nodemailer";
import Email = require("email-templates");

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

const config = {
  host: MAIL_HOST,
  port: Number(MAIL_PORT) || 465,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
};

const mailer = createTransport(config);

const mailTemplate = new Email({
  views: {
    root: resolve("src/views/"),
    options: {
      extension: "hbs"
    }
  }
});

mailer.send = async (
  options: { to: string; from: string; subject: string },
  template: string = "mail-example",
  vars: any = { message: "message of test" }
) => {
  const html = await mailTemplate.render(template, vars);
  await mailer.sendMail({ ...options, html });
};

export default mailer;

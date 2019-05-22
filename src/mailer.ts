//LOAD ENVIRONMENT VARS
require("dotenv").config();

import { resolve } from "path";
import { createTransport } from "nodemailer";
import Email from "email-templates";

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

const config = {
  transporter: {
    host: MAIL_HOST,
    port: Number(MAIL_PORT) || 465,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS
    }
  },
  template: {
    views: {
      root: resolve("src/views/"),
      options: {
        extension: "hbs"
      }
    },
    message: null
  }
};

class Mailer {
  transporter = createTransport(config.transporter);
  template = new Email(config.template);

  send = async (
    options: { to: string; from: string; subject: string },
    template: string = "mail-example",
    vars: any = { message: "message of test" }
  ) => {
    const html = await this.template.render(template, vars);
    await this.transporter.sendMail({ ...options, html });
  };
}

export default new Mailer();

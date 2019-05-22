import express = require("express");
import cors = require("cors");
import logger = require("morgan");
import bodyParser = require("body-parser");
import mailer from "./mailer";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(logger("dev"));
    this.express.use(express.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(cors());
  }

  private routes(): void {
    this.express.post("/send-mail", async (req, res) => {
      try {
        const { to, from, subject, message } = req.body;
        await mailer.send({ to, from, subject }, "mail-example", { message });
        return res.status(200).send("Email enviado com sucesso!");
      } catch (err) {
        console.log(err.message);
        return res
          .status(500)
          .send(`Falha no envio do email! Error: ${err.message}`);
      }
    });
  }
}

export default new App().express;

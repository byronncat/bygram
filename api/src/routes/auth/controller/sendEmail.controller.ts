import { Request, Response} from "express";
import sendEmail from "@/libs/nodemailer/nodemailer.lib";

async function sendEmailController(req: Request, res: Response) {
  const subject = "Reset password";
  const { email: to } = req.body;
  await sendEmail(to, subject)
  .then(() => {
    res.status(200).send("Email sent successfully");
  })
  .catch((error) => {
    res.status(500).send("Error sending email");
  });
}

module.exports = sendEmailController;
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const filePath = path.join(__dirname, "resetPassword.template.html");
const htmlContent = fs.readFileSync(filePath, "utf8");
// SVG is not supported in many email clients
const sendMail = async (to: string, subject: string) => {
  try {
    await transporter.sendMail({
      from: `Bygram <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
      attachments: [
        {
          filename: "logo.png",
          path: __dirname + '/logo.png',
          cid: "logo",
        },
      ],
    });
  } catch (error) {
    console.log(`[Error sending email]: ${error}`);
    throw error;
  }
};

export default sendMail;

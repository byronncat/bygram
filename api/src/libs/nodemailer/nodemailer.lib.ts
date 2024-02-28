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

// SVG is not supported in many email clients
const filePath = path.join(__dirname, "./reset-password/resetPassword.template.html");
const htmlContent = fs.readFileSync(filePath, "utf8");
const sendMail = async function (to: string, subject: any): Promise<void> {
  try {
    await transporter.sendMail({
      from: `Bygram <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
      attachments: [
        {
          path: __dirname + "/logo.png",
          cid: "logo",
        },
      ],
    });
  } catch (error) {
    console.log(`[Nodemailer]: ${error}`);
    return Promise.reject(error);
  }
};

export default { sendMail };

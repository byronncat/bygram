import { Request, Response } from 'express';
import { nodemailer } from '@libs';
import { API } from '@type';

async function sendEmailController(req: Request, res: Response) {
  const { email: to } = req.body;
  await nodemailer
    .sendMail(to, 'Reset password')
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Email sent',
      } as API);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error.message,
      } as API);
    });
}

export default [sendEmailController];

import { NextFunction, Request, Response } from 'express';
import { nodemailer } from '@libraries';
import { API, Account } from '@types';

async function sendEmail(req: Request, res: Response, next: NextFunction) {
  const { email: to } = req.body as Account;
  return await nodemailer
    .sendMail(to!, 'Reset password')
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Email sent',
      } as API);
    })
    .catch((error: any) => {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      } as API);
    });
}

export default { sendEmail };

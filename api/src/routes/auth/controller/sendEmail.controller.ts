import { Request, Response } from 'express';
import { nodemailer } from '@libs';
import { API, Account } from '@types';

async function sendEmailController(req: Request, res: Response) {
  const { email: to } = req.body as Account;
  await nodemailer
    .sendMail(to!, 'Reset password')
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Email sent',
      } as API);
    })
    .catch((error: any) => {
      res.status(500).json({
        success: false,
        message: error.message,
      } as API);
    });
}

export default [sendEmailController];

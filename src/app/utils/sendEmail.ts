import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.smtp_user,
      pass: config.smtp_pass,
    },
  });

  await transporter.sendMail({
    from: 'mohammadazimuddin274@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within ten minute', // Subject line
    text: 'PH University', // plain text body
    html, // html body
  });
};

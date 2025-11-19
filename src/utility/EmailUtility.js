import nodemailer from 'nodemailer';

export async function SendEmail(EmailTo, EmailText, EmailSubject) {
  let Transport = nodemailer.createTransport({
    host: "smtp.gmail.com",                //Gmail SMTP server
    port: 587,
    secure: false,                         
    auth: {
      user: "mdwasimu015@gmail.com",       // Your Gmail
      pass: "ofos efaj tzlj arpp",      // App Password (not Gmail login password)
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOption = {
    from: "Finder Support <mdwasimu015@gmail.com>", // from Gmail
    to: EmailTo,
    subject: EmailSubject,                          
    text: EmailText
  };

  return await Transport.sendMail(mailOption);
}
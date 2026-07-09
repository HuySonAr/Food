import nodemailer from 'nodemailer';

/**
 * Tiện ích gửi email thông qua Nodemailer & SMTP
 * @param {Object} options - Đối tượng chứa thông tin gửi { email, subject, message }
 */
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: process.env.SMTP_PORT || 465,
    secure: true,
    service: process.env.SMTP_SERVICE || 'gmail',
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Restaurant Admin Dashboard" <${process.env.SMTP_MAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
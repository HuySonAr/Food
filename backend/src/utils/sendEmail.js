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
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #d9534f; text-align: center;">Yêu Cầu Khôi Phục Mật Khẩu</h2>
        <p>Xin chào <strong>Quản trị viên</strong>,</p>
        <p>Bạn vừa yêu cầu đặt lại mật khẩu cho hệ thống quản trị nhà hàng. Dưới đây là mã xác thực OTP của bạn:</p>
        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; margin: 20px 0; border-radius: 5px;">
          <span style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #333;">${options.otp}</span>
        </div>
        <p style="color: #777; font-size: 14px;"><em>* Mã OTP này có hiệu lực trong vòng <strong>5 phút</strong>. Tuyệt đối không chia sẻ mã này cho bất kỳ ai.</em></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #aaa; text-align: center;">Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này hoặc kiểm tra lại bảo mật tài khoản.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;

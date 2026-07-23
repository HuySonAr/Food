import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
/**
 * Tiện ích gửi email thông qua Resend
 * @param {Object} options - Đối tượng chứa thông tin gửi { email, subject, message }
 */
const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `"Restaurant Admin Dashboard" <onboarding@resend.dev>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };
    const { error, data } = await resend.emails.send(mailOptions);
    if (error) {
      console.error('--- RESEND EMAIL ERROR ---', error);
      throw new Error(error.message);
    }

    console.log('--- EMAIL SENT SUCCESSFULLY VIA RESEND ---', data.id);
    return data;
  } catch (error) {
    console.error('--- FAILED TO SEND EMAIL ---', error);
    throw error;
  }
};

export default sendEmail;

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * シンプルなメール送信関数
 * @param to 送信先メールアドレス
 * @param subject 件名
 * @param text 本文
 */
export async function sendMail(to: string, subject: string, text: string) {
  try {
    await transporter.sendMail({
      from: `"Project BBS" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log(`📧 メール送信成功: ${to}`);
  } catch (error) {
    console.error("❌ メール送信失敗:", error);
  }
}
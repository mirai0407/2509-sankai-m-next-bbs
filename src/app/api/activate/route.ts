import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { hashPassword } from "../../../lib/crypto";
import { decryptEmail } from "../../../lib/crypto";
import { sendMail } from "../../../lib/mail";

export async function POST(req: Request) {
  try {
    const { token, password, confirmPassword, nickname } = await req.json();

    // バリデーション
    if (!token || !password || !confirmPassword || !nickname) {
      return NextResponse.json({ message: "全ての項目を入力してください" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ message: "パスワードが一致しません" }, { status: 400 });
    }

    if (password.length < 10 || password.length > 32) {
      return NextResponse.json({ message: "パスワードは10〜32文字で入力してください" }, { status: 400 });
    }

    if (nickname.length < 8 || nickname.length > 32) {
      return NextResponse.json({ message: "ニックネームは8〜32文字で入力してください" }, { status: 400 });
    }

    // Prismaでユーザー取得（activation_hash = token AND status = 'TEMP'）
    const users = await prisma.$queryRaw<any[]>`
      SELECT * FROM users WHERE activation_hash = ${token} AND status = 'TEMP'
    `;

    if (users.length === 0) {
      return NextResponse.json({ message: "無効なトークンです" }, { status: 400 });
    }

    const user = users[0];

    if (new Date() > new Date(user.expiration_date)) {
      return NextResponse.json({ message: "有効期限が切れています" }, { status: 400 });
    }

    // パスワードハッシュ化（crypto.ts の関数を使用）
    const hashedPassword = await hashPassword(password);

    // ユーザー情報更新
    await prisma.$executeRaw`
      UPDATE users
      SET password = ${hashedPassword},
          nickname = ${nickname},
          status = 'ACTIVE',
          activation_hash = NULL,
          updated_at = NOW()
      WHERE id = ${user.id}
    `;

    // メール送信
    const decryptedEmail = decryptEmail(user.email);
    await sendMail(
      decryptedEmail,
      "【本登録完了】会員登録が完了しました",
      "本登録が完了しました。ご利用ありがとうございます。"
    );

    return NextResponse.json({ message: "本登録が完了しました。" });
  } catch (err) {
    console.error("Activation error:", err);
    return NextResponse.json({ message: "サーバーエラー" }, { status: 500 });
  }
}
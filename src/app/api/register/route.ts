import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { encryptEmail } from "../../../lib/crypto";
import { sendMail } from "../../../lib/mail";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "メールアドレスを入力してください" },
        { status: 400 }
      );
    }

    const encryptedEmail = encryptEmail(email);

    const token = crypto.randomBytes(32).toString("hex");
    const expiration = new Date(Date.now() + 10 * 60 * 1000); // 10分後

    // 既存ユーザー確認
    const existingUsers = await prisma.$queryRaw<any[]>`
      SELECT * FROM users WHERE email = ${encryptedEmail}
    `;

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { message: "このメールアドレスは既に登録されています。" },
        { status: 400 }
      );
    }

    // 仮登録ユーザー作成
    await prisma.$executeRaw`
      INSERT INTO users
        (email, status, activation_hash, expiration_date, created_at, updated_at)
      VALUES
        (${encryptedEmail}, 'TEMP', ${token}, ${expiration}, NOW(), NOW())
    `;

    // 本登録URL送信
    const activationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/activate?token=${token}`;
    await sendMail(
      email,
      "【仮登録完了】本登録を行ってください",
      `以下のURLから本登録を完了してください。\n\n${activationUrl}\n\n有効期限: 10分`
    );

    return NextResponse.json({ message: "仮登録完了メールを送信しました。" });
  } catch (err) {
    console.error("Temporary registration error:", err);
    return NextResponse.json({ message: "サーバーエラー" }, { status: 500 });
  }
}
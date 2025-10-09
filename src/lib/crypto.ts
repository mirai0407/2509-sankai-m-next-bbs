// src/lib/crypto.ts
import bcrypt from "bcryptjs";
import crypto from "crypto";

/* ===== パスワード関連 ===== */
const SALT_ROUNDS = 10;

/**
 * パスワードをハッシュ化
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * パスワードが一致するか検証
 */
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

/* ===== メール暗号化関連 ===== */
const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = process.env.SECRET_KEY || "default_secret_32bytes_key!!"; // 32バイト必須

/**
 * メールアドレスを暗号化
 */
export const encryptEmail = (email: string): string => {
  const iv = crypto.randomBytes(16); // 暗号化ごとに新しいIVを生成
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
  let encrypted = cipher.update(email, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted; // IVを先頭に付加
};

/**
 * 暗号化されたメールアドレスを復号
 */
export const decryptEmail = (encrypted: string): string => {
  const [ivHex, encryptedData] = encrypted.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

/* ===== トークン生成 ===== */
/**
 * ランダムトークンを生成（例: パスワードリセット用）
 */
export const generateToken = (length = 32): string => {
  return crypto.randomBytes(length).toString("hex");
};
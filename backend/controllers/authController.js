import crypto from "crypto";
import nodemailer from "nodemailer";
import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ---------------- REGISTER ----------------
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // ✅ basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields required" });
  }

  // ✅ email validation
  if (!email.includes("@")) {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  // ✅ check existing user
  const [existing] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (existing.length) {
    return res.status(400).json({ msg: "Email already registered" });
  }

  const hash = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hash]
  );

  res.json({ msg: "Registered successfully" });
};

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  const [users] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (!users.length) {
    return res.status(400).json({ msg: "User not found" });
  }

  const user = users[0];

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ msg: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
};

// ---------------- FORGOT PASSWORD ----------------
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (!rows.length) {
    return res.status(404).json({ msg: "User not found" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min

  await db.query(
    "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
    [token, expiry, email]
  );

  const link = `http://localhost:5173/reset?token=${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Reset Password",
    html: `<a href="${link}">Reset Password</a>`
  });

  res.json({ msg: "Email sent" });
};

// ---------------- RESET PASSWORD ----------------
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()",
    [token]
  );

  if (!rows.length) {
    return res.status(400).json({ msg: "Invalid or expired token" });
  }

  const user = rows[0];

  const hashed = await bcrypt.hash(password, 10);

  await db.query(
    "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
    [hashed, user.id]
  );

  res.json({ msg: "Password updated" });
};

// ---------------- GET ME ----------------
export const getMe = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email FROM users WHERE id = ?",
      [req.user.id]
    );

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ---------------- MAILER ----------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
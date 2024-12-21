const express = require("express");
const cors = require("cors");
const pool = require("./db");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
const crypto = require("crypto");

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Crypto
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Function to encrypt the email
const encryptEmail = (email) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encrypted = cipher.update(email, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    encryptedData: encrypted,
    iv: iv.toString("hex"),
  };
};

// Function to decrypt the email
const decryptEmail = (encryptedEmail, ivHex) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    secretKey,
    Buffer.from(ivHex, "hex")
  );
  let decrypted = decipher.update(encryptedEmail, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// Email Data
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jeffreyenguyen@gmail.com",
    pass: "vczn kosf nmcy huxp",
  },
  tls: {
    rejectUnauthorized: false, // Allows self-signed certificates
  },
});

/* Account Creation and Log */

// Sign up.
app.post("/add", async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { email, username, password } = req.body;

    // Insert into the account table
    const newAccount = await pool.query(
      "INSERT INTO account (email, username, password) VALUES ($1, $2, $3) RETURNING * ",
      [email, username, password]
    );

    // Respond with the created user
    res.json(newAccount.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Log in.
app.post("/login", async (req, res) => {
  const { username } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM account WHERE username = $1",
      [username]
    );

    console.log("Query result:", result.rows[0]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

/* Updating Account */

// Confirm email
app.post("/confirm-email", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query("SELECT * FROM account WHERE email = $1", [
      email,
    ]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/send-email-password", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const { encryptedData, iv } = encryptEmail(email);

  // Remember to change the resetLink in production.
  const resetLink = `localhost:3000/reset/password/form/${encryptedData}/${iv}`;

  const mailOptions = {
    from: "jeffreyenguyen@gmail.com",
    to: email,
    subject: "Reset Password",
    text: `We have receieved your request to reset your password! Please click on this link in order to reset your password: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

// Resetting password.
app.post("/password-reset", async (req, res) => {
  const { email, iv, password } = req.body;

  try {
    const emailAddress = decryptEmail(email, iv);
    const result = await pool.query(
      "UPDATE account SET password = $1 WHERE email = $2",
      [password, emailAddress]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all accounts

// get an account

// delete an account

app.listen(5000, () => console.log("Server has started on port 5000"));

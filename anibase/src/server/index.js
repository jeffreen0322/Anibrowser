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

// Check for the availability of the email.
app.post("/validate-email", async (req, res) => {
  try {
    const { address } = req.body;

    const account = await pool.query(
      "SELECT email FROM account WHERE email = $1",
      [address]
    );
    res.json(account.rows[0]);
  } catch (e) {
    console.log(e);
  }
});

// Check for the availability of the username.
app.post("/validate-username", async (req, res) => {
  try {
    const { user } = req.body;

    const account = await pool.query(
      "SELECT username FROM account WHERE username = $1",
      [user]
    );
    res.json(account.rows[0]);
  } catch (e) {
    console.log(e);
  }
});

// Sign up.
app.post("/add", async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { email, username, password } = req.body;

    const newAccount = await pool.query(
      "INSERT INTO account (email, username, password) VALUES ($1, $2, $3) RETURNING * ",
      [email, username, password]
    );

    // respond with created user.
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

    // console.log("Query result:", result.rows[0]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

/* Updating Account */

// When client requests for new password, an email must be provided.
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

// The email for password request is sent to the user.
app.post("/send-email-password", async (req, res) => {
  const { email } = req.body;
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

// User is able to reset the password.
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
// Retrieve the account specific user.
app.get("/retrieve", async (req, res) => {
  try {
    const { username } = req.query; // Get username from query parameters

    const newAccount = await pool.query(
      "SELECT * FROM account WHERE username = $1",
      [username]
    );

    res.json(newAccount.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// delete an account

/* Anime Modification */
// Adding anime into the database.
app.post("/add-anime-entry", async (req, res) => {
  const { id, name, image_url, url } = req.body;

  try {
    const newAnimeEntry = await pool.query(
      "INSERT INTO anime (ani_id, name, image_url, url) VALUES ($1, $2, $3, $4) RETURNING * ",
      [id, name, image_url, url]
    );

    res.json(newAnimeEntry.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Defining a relationship of the anime to the user.
app.post("/add-anime-user", async (req, res) => {
  const { user_id, ani_id, status } = req.body;

  try {
    const newAnimeEntry = await pool.query(
      "INSERT INTO user_anime (user_id, ani_id, status) VALUES ($1, $2, $3) RETURNING * ",
      [user_id, ani_id, status]
    );

    res.json(newAnimeEntry.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Updating the status of anime-user relation.
app.post("/update-anime-user", async (req, res) => {
  const { user_id, ani_id, status } = req.body;

  try {
    const updatedAnimeEntry = await pool.query(
      "UPDATE user_anime SET status = $1 WHERE user_id = $2 AND ani_id = $3",
      [status, user_id, ani_id]
    );

    res.json(updatedAnimeEntry.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Updating the rating of anime-user relation.
app.post("/update-rating-anime", async (req, res) => {
  const { user_id, ani_id, rating } = req.body;

  try {
    const updatedAnimeEntry = await pool.query(
      "UPDATE user_anime SET rating = $1 WHERE user_id = $2 AND ani_id = $3",
      [rating, user_id, ani_id]
    );

    res.json(updatedAnimeEntry.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Fetching the anime-user relationship
app.get("/get-anime-user", async (req, res) => {
  const { user_id, ani_id } = req.query; // Use req.query for GET requests

  try {
    const updatedAnimeEntry = await pool.query(
      "SELECT * FROM user_anime WHERE user_id = $1 AND ani_id = $2",
      [parseInt(user_id), parseInt(ani_id)]
    );

    if (updatedAnimeEntry.rows.length > 0) {
      res.json(updatedAnimeEntry.rows[0]);
    } else {
      res.json({ message: "No relationship found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Getting the animes associated with the profile.
app.get("/get-full-anime-user", async (req, res) => {
  const { user_id } = req.query;

  try {
    const updatedAnimeEntry = await pool.query(
      "SELECT a.id, a.ani_id, a.name, a.image_url, ua.status, ua.rating FROM anime a JOIN user_anime ua ON a.ani_id = ua.ani_id WHERE ua.user_id = $1",
      [parseInt(user_id)]
    );

    res.json(updatedAnimeEntry.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => console.log("Server has started on port 5000"));

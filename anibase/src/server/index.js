const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// Routes //

// create an account
// Using post bc adding data.
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

// get all accounts

// get an account

// update an account

// delete an account

app.listen(5000, () => console.log("Server has started on port 5000"));

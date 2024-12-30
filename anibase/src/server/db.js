const Pool = require("pg").Pool;

const pool = new Pool({
  user: "avnadmin",
  password: "AVNS_NJf7eS5f5SMllyIQcrh",
  host: "pg-35ed4cf6-anibrowser.e.aivencloud.com",
  port: 13975,
  database: "defaultdb",
});

module.exports = pool;

CREATE DATABASE users

CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255)
);
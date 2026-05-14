
CREATE DATABASE trendy;

USE trendy;

CREATE TABLE users(
 id INT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(100),
 email VARCHAR(100),
 password VARCHAR(255)
);

CREATE TABLE products(
 id INT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(100),
 price INT
);

CREATE TABLE cart(
 id INT PRIMARY KEY AUTO_INCREMENT,
 user_id INT,
 product_id INT,
 quantity INT
);

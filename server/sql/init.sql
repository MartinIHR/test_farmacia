CREATE DATABASE IF NOT EXISTS test_farmacia;
USE test_farmacia;

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

INSERT IGNORE INTO products (id, name, price) VALUES
('p1','Paracetamol 500mg',4.99),
('p2','Ibuprofeno 400mg',3.49),
('p3','Antibiotico ABC',19.99);

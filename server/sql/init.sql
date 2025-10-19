CREATE DATABASE IF NOT EXISTS test_farmacia;
USE test_farmacia;

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image VARCHAR(1024),
  requiresPrescription TINYINT(1) DEFAULT 0,
  stockByLocation JSON
);

INSERT IGNORE INTO products (id, name, price, description, image, requiresPrescription, stockByLocation) VALUES
('p1','Paracetamol 500mg',4.99,'Analgésico y antipirético. Uso adulto.','https://picsum.photos/seed/med1/600/400',0, JSON_OBJECT('Santiago',12,'Providencia',5,'Las Condes',0,'Maipú',8)),
('p2','Ibuprofeno 400mg',3.49,'Antiinflamatorio para uso ocasional.','https://picsum.photos/seed/med2/600/400',0, JSON_OBJECT('Santiago',0,'Providencia',2,'Las Condes',1,'Maipú',4)),
('p3','Antibiótico ABC 250mg',19.99,'Antibiótico bajo prescripción médica. No vender sin receta.','https://picsum.photos/seed/med3/600/400',1, JSON_OBJECT('Santiago',3,'Providencia',0,'Las Condes',2,'Maipú',0));

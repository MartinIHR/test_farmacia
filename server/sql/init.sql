CREATE DATABASE IF NOT EXISTS test_farmacia CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
USE test_farmacia;

-- Ensure the client interprets this file as UTF-8 when running inside the container
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image VARCHAR(1024),
  requiresPrescription TINYINT(1) DEFAULT 0,
  stockByLocation JSON
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO products (id, name, price, description, image, requiresPrescription, stockByLocation) VALUES
('p1','Paracetamol 500mg',4.99,'Analgésico y antipirético. Uso adulto.','https://picsum.photos/seed/med1/600/400',0, JSON_OBJECT('Santiago',12,'Providencia',5,'Las Condes',0,'Maipú',8)),
('p2','Ibuprofeno 400mg',3.49,'Antiinflamatorio para uso ocasional.','https://picsum.photos/seed/med2/600/400',0, JSON_OBJECT('Santiago',0,'Providencia',2,'Las Condes',1,'Maipú',4)),
('p3','Antibiótico ABC 250mg',19.99,'Antibiótico bajo prescripción médica. No vender sin receta.','https://picsum.photos/seed/med3/600/400',1, JSON_OBJECT('Santiago',3,'Providencia',0,'Las Condes',2,'Maipú',0)),
('p4','Vitamina C 500mg',6.50,'Suplemento vitamínico para el sistema inmune.','https://picsum.photos/seed/vitc/600/400',0, JSON_OBJECT('Santiago',20,'Providencia',8,'Las Condes',12,'Maipú',15)),
('p5','Crema Dermocalm 50ml',12.00,'Crema para dermatitis y alivio de la piel.','https://picsum.photos/seed/cream1/600/400',0, JSON_OBJECT('Santiago',5,'Providencia',2,'Las Condes',1,'Maipú',4)),
('p6','Jarabe Tos Forte 120ml',7.80,'Jarabe expectorante para tos persistente.','https://picsum.photos/seed/syrup/600/400',0, JSON_OBJECT('Santiago',10,'Providencia',3,'Las Condes',0,'Maipú',6)),
('p7','Antialérgico Z 10mg',9.99,'Antihistamínico para alergias estacionales.','https://picsum.photos/seed/allergy/600/400',0, JSON_OBJECT('Santiago',7,'Providencia',7,'Las Condes',3,'Maipú',2)),
('p8','Insulina NPH 100U/ml',45.00,'Insulina para control de glucemia (requiere receta).','https://picsum.photos/seed/insulin/600/400',1, JSON_OBJECT('Santiago',2,'Providencia',1,'Las Condes',0,'Maipú',1)),
('p9','Antiséptico 250ml',5.25,'Antiséptico para heridas y limpieza.','https://picsum.photos/seed/antiseptic/600/400',0, JSON_OBJECT('Santiago',14,'Providencia',6,'Las Condes',4,'Maipú',9)),
('p10','Spray Nasal 20ml',6.00,'Spray descongestionante nasal de uso puntual.','https://picsum.photos/seed/nasal/600/400',0, JSON_OBJECT('Santiago',4,'Providencia',0,'Las Condes',2,'Maipú',3)),
('p11','Crema Ocular 5ml',15.00,'Lágrimas artificiales para sequedad ocular.','https://picsum.photos/seed/eye/600/400',0, JSON_OBJECT('Santiago',6,'Providencia',3,'Las Condes',2,'Maipú',5)),
('p12','Omeprazol 20mg',8.50,'Inhibidor de la bomba de protones para reflujo.','https://picsum.photos/seed/omeprazol/600/400',0, JSON_OBJECT('Santiago',9,'Providencia',5,'Las Condes',3,'Maipú',7)),
('p13','Antibiótico XYZ suspensión',22.00,'Antibiótico pediátrico (requiere receta).','https://picsum.photos/seed/med4/600/400',1, JSON_OBJECT('Santiago',1,'Providencia',0,'Las Condes',1,'Maipú',0));

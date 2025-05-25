CREATE DATABASE ecobud;
USE ecobud;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE consumo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    mes INT NOT NULL,
    ano INT NOT NULL,
    energia_kwh FLOAT NOT NULL,
    agua_litros FLOAT NOT NULL,
    plastico_kg FLOAT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);
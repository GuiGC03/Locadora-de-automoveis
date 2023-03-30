create database locadora;

CREATE TABLE clientes (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  endereco VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE veiculos (
  id INT NOT NULL AUTO_INCREMENT,
  marca VARCHAR(50) NOT NULL,
  modelo VARCHAR(50) NOT NULL,
  ano INT NOT NULL,
  placa VARCHAR(10) NOT NULL,
  disponibilidade TINYINT(1) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE reservas (
  id INT NOT NULL AUTO_INCREMENT,
  idcliente INT NOT NULL,
  idveiculo INT NOT NULL,
  datainicio DATE NOT NULL,
  datafim DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (idcliente) REFERENCES clientes(id),
  FOREIGN KEY (idveiculo) REFERENCES veiculos(id)
);
DROP DATABASE IF EXISTS tracker_db;

CREATE database tracker_db;

USE tracker_db;

CREATE TABLE department (
  id INTEGER auto_increment NOT NULL,
  name VARCHAR(30)
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INTEGER auto_increment NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10,3),
  department_id INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INTEGER auto_increment NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (id)
);

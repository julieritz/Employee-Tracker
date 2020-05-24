DROP DATABASE IF EXISTS tracker_db;

CREATE database tracker_db;

USE tracker_db;

CREATE TABLE department (
  id INT auto_increment NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT auto_increment NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10,3),
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT auto_increment NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  PRIMARY KEY (id)
);

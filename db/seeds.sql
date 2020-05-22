INSERT INTO department (name)
VALUES ("Marketing"), ("Sales"), ("Finance"),("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("VP of Marketing", 120000, 1),
        ("Marketing Manager", 80000, 1),
        ("Director of Sales", 160000, 2),
        ("Account Manager", 60000, 2),
        ("VP of Finance", 125000, 3),
        ("Accountant", 110000, 3)
        ("Lead Engineer", 150000, 4),
        ("Software Engineer", 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Adam", "Smith", 1, null), 
        ("Joan", "Lee", 2, null),
        ("Deborah", "Obo", 3, null),
        ("Chris", "Jung", 4, null),
        ("Mary", "Gonzalez", 5, null),
        ("Lisa", "Williams", 6, null), 
        ("Victor", "Bonaparte", 7, null),
        ("Ed", "Gupta", 8, null);
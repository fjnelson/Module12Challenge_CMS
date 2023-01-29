USE employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Support'),
    ('Engineering'),
    ('Customer Success');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Customer Success Manager', 100000, 4),
    ('Support Technician', 50000, 2),
    ('Engineer', 140000, 3),
    ('Support Administrator', 65000, 2),
    ('VP Engineering', 195000, 3),
    ('Support Lead', 100000, 2),
    ('Account Manager', 110000, 1),
    ('VP Sales', 200000, 1);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Emma', 'Smith', 1, 9),
    ('Michael', 'Johnson', 2, 7),
    ('Olivia', 'Williams', 3, 6),
    ('Ethan', 'Jones', 4, 7),
    ('Isabella', 'Brown', 4, 7),
    ('Benjamin', 'Garcia', 5, NULL),
    ('Ava', 'Miller', 6, 6),
    ('William', 'Davis', 7, 9),
    ('Sophia', 'Rodriguez', 8, NULL),
    ('James', 'Martinez', 7, 9);

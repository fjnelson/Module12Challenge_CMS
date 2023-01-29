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
    ('Support Technician', 50000, 1),
    ('Engineer', 140000, 2),
    ('Support Administrator', 65000, 1),
    ('VP Engineering', 195000, 2),
    ('Support Lead', 100000, 1),
    ('Account Manager', 110000, 3),
    ('VP Sales', 200000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Emma', 'Smith', 1, NULL),
    ('Michael', 'Johnson', 2, 1),
    ('Olivia', 'Williams', 3, NULL),
    ('Ethan', 'Jones', 4, 3),
    ('Isabella', 'Brown', 4, 3),
    ('Benjamin', 'Garcia', 5, NULL),
    ('Ava', 'Miller', 6, 5),
    ('William', 'Davis', 6, 5),
    ('Sophia', 'Rodriguez', 7, NULL),
    ('James', 'Martinez', 7, 8);

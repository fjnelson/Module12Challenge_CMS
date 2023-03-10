const inquirer = require('inquirer');
const db = require("./db");
require("console.table");

function init() {
    startSearch();
}

function startSearch() {
    inquirer.prompt([
        {
            type: "list",
            message: "Choose an option below",
            name: "choice",
            choices: [
                {
                    name: "Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Employees",
                    value: "VIEW_EMPLOYEES"
                },

                {
                    name: "Department Add",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Role Add",
                    value: "ADD_ROLE"
                },
                {
                    name: "Employee Add",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Employee Update",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }

    ]).then(res => {
        let choice = res.choice;
        switch (choice) {
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "ADD_DEPARTMENT":
                createDepartment();
                break;
            case "ADD_ROLE":
                createRole();
                break;
            case "ADD_EMPLOYEE":
                createEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            default:
                quit();
        }
    }
    )
    .catch(error => {
        console.error(error);
        process.exit(1);
      });
}

function viewEmployees() {
    db.allEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => startSearch());
}

function viewRoles() {
    db.allRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => startSearch());
}

function viewDepartments() {
    db.allDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => startSearch());
}

function createRole() {
    db.allDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt([
                {
                    name: "title",
                    message: "Name of the role?"
                },
                {
                    name: "salary",
                    message: "Salary?"
                },
                {
                    name: "department_id",
                    type: "list",
                    message: "List the department",
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    db.addRole(role)
                        .then(() => console.log(`Added ${role.title} to the database`))
                        .then(() => startSearch())
                })
        })
}


function createDepartment() {
    inquirer.prompt([
        {
            name: "name",
            message: "List the department"
        }
    ])
        .then(res => {
            let name = res;
            db.addDepartment(name)
                .then(() => console.log(`Added ${name.name} to the database`))
                .then(() => startSearch())
        })
}

function createEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            message: "First name?"
        },
        {
            name: "last_name",
            message: "Last name?"
        }
    ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;

            db.allRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));

                    inquirer.prompt({
                        name: "roleId",
                        type: "list",
                        message: "Employee's role?",
                        choices: roleChoices
                    })
                        .then(res => {
                            let roleId = res.roleId;

                            db.allEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));

                                    managerChoices.unshift({ name: "None", value: null });

                                    inquirer.prompt({
                                        name: "managerId",
                                        type: "list",
                                        message: "Employee's manager?",
                                        choices: managerChoices
                                    })
                                        .then(res => {
                                            let employee = {
                                                manager_id: res.managerId,
                                                role_id: roleId,
                                                first_name: firstName,
                                                last_name: lastName
                                            }

                                            db.addEmployee(employee);
                                        })
                                        .then(() => console.log(
                                            `${firstName} ${lastName} is added`
                                        ))
                                        .then(() => startSearch())
                                })
                        })
                })
        })
}


function updateEmployeeRole() {
    db.allEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            inquirer.prompt([
                {
                    name: "employeeId",
                    type: "list",
                    message: "which employee?",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId;
                    db.allRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));

                            inquirer.prompt([
                                {
                                    name: "roleId",
                                    type: "list",
                                    message: "New Role Name?",
                                    choices: roleChoices
                                }
                            ])
                                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                                .then(() => console.log("role is updated"))
                                .then(() => startSearch())
                        });
                });
        })
}

function quit() {
    process.exit();
}

init();
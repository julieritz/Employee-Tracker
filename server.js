
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table")
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "tracker_DB"
})

connection.connect(function(err){
    if (err) throw err;
    startApp();
})

function startApp() {
    inquirer
    .prompt({
        name: "actionList",
        type: "list",
        message: "You are viewing the employee list! What would you like to do?",
        choices: [
                "View employees",
                "View departments",
                "View roles",
                "Add an employee",
                "Add a department",
                "Add a role",
                "Update a role",
                "EXIT"
        ]
    }).then(function (choice) {
        switch (choice.actionList) {
            case "View employees":
                viewEmployees();
                break;
            case "View departments":
                viewDepartments();
                break;
            case "View roles":
                viewRoles();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Update a role":
                updateRole();
                break;
            case "EXIT": 
                endApp();
                break;
            default:
                break;
        }
    })
}

function viewEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
    if (err) throw err;
    console.table("Employees:", res); 
    startApp();
    })
}

function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
    if(err)throw err;
    console.table("Departments:", res);
    startApp();
    })
}

function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res){
    if (err) throw err;
    console.table("Roles:", res);
    startApp();
    })
}

function addEmployee() {
    connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input", 
                message: "Employee's fist name: ",
            },
            {
                name: "lastName",
                type: "input", 
                message: "Employee's last name: "
            },
            {
                name: "role", 
                type: "list",
                choices: function() {
                var roleArray = [];
                for (let i = 0; i < res.length; i++) {
                    roleArray.push(res[i].title);
                }
                return roleArray;
                },
                message: "What is this employee's role? "
            },
            {
                name: "manager",
                type: "input",
                message: "What is the manager's ID for this employee?"
            }
            ]).then(function (choice) {
                let roleID;
                for (let i = 0; i < res.length; i++) {
                if (res[i].title == choice.role) {
                    roleID = res[i].id;
                }                  
                }  
                connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: choice.firstName,
                    last_name: choice.lastName,
                    role_id: roleID,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your employee has been added!");
                    startApp();
                }
                )
            })
    })
}

function addDepartment() {
    inquirer
    .prompt([
        {
            name: "newDepartment", 
            type: "input", 
            message: "What department would you like to add?"
        }
    ]).then(function (choice) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: choice.newDepartment
            }
        );
          var query = "SELECT * FROM department";
        connection.query(query, function(err, res) {
        if(err)throw err;
        console.table("The new department has been added!");
        startApp();
        })
    })
}

function addRole() {
    connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;

    inquirer 
    .prompt([
        {
            name: "newRole",
            type: "input", 
            message: "What is the new role you want to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "Enter the salary for this role (numbers only, no symbols): "
        },
        {
            name: "departmentChoice",
            type: "rawlist",
            choices: function() {
                var departmentArray = [];
                for (let i = 0; i < res.length; i++) {
                departmentArray.push(res[i].name);
                }
                return departmentArray;
            },
        }
    ]).then(function (choice) {
        let departmentID;
        for (let i = 0; i < res.length; j++) {
            if (res[i].name == choice.departmentChoice) {
                departmentID = res[i].id;
            }
        }
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.newRole,
                salary: answer.salary,
                department_id: departmentID
            },
            function (err, res) {
                if(err)throw err;
                console.table("The new role has been added!");
                startApp();
            }
        )
    })
    })
    
}

function updateRole() {
    inquirer
    .prompt([
      {
        name: "lastName2",
        type: "input",
        message: "Enter the last name of the employee whose role you want to update:"
      },
      {
        name: "updatedRole",
        type: "number",
        message: "Please give this employee a new ID:"
      }
    ]).then(function(answer) {
      connection.query("UPDATE employee SET role_id = ? WHERE last_name = ?", [answer.updatedRole, answer.lastName2],
      function(err) {
        if (err) throw err;
        console.table("The employee's role has been updated!");
        startApp();
      })
    })
  }

function endApp() {
    connection.end();
}
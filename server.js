
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
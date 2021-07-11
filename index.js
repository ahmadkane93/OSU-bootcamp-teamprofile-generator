const employee= [];
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");



const questions = [
    {
      message: 'What is your manager`s name?',  
      type: 'input',
      name: 'memberName',
      
    },

    {
        message: 'Who is the next employee?',
        type: 'list',
        name: 'anotherProfile',
        choices: ["Engineer", "Manager", "Intern"],
      },

    {
      message: 'What is their ID number?',
      type: 'input',
      name: 'memberId',
      
    },
    {
      message: 'What is their office number?',
      type: 'input',
      name: 'managerOfficeNumber',
      
    },
    
    {
      message: 'Enter their email address.',
      type: 'input',
      name: 'memberEmail',
      
    },
    
    
];


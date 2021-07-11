
const inquirer = require("inquirer");
const fs = require('fs');


const questions = [
    {
      message: 'What is your manager`s name?',  
      type: 'input',
      name: 'managerName',
      
    },
    {
      message: 'What is their ID number?',
      type: 'input',
      name: 'managerId',
      
    },
    {
      message: 'What is their office number?',
      type: 'input',
      name: 'managerOfficeNumber',
      
    },
    
    {
      message: 'Enter their email address.',
      type: 'input',
      name: 'managerEmail',
      
    },
    
    {
      message: 'Who is the next employee?',
      type: 'list',
      name: 'anotherProfile',
      choices: ["Engineer", "Intern", "Done"],
    },
    
];


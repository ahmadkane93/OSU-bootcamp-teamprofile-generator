// Const Values for the Application
const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { profile } = require("console");
const employees = [];




//Initiating the application.
function getStarted() {

createProfile();

createHtml();

}

// Creating Team Member profile.

function createProfile() {
    inquirer.prompt([{
        message: "What is the team member's name?",
        name: "name"
    },
    {
        type: "list",
        message: "What is your team member's job?",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
            
        ],
        name: "occupation"
    },
    {
        message: "What is the team member's ID number?",
        name: "id"
    },
    {
        message: "What is the team member's email address?",
        name: "email"
    }])

    .then(function({name, occupation, id, email}) {
        let jobInfo = "";
        if (occupation === "Manager") {
            jobInfo = "Office number";
            
        } else if (occupation === "Engineer") {
            jobInfo = "GitHub username";

        } else {
            jobInfo = "school";
        }


        inquirer.prompt([{
            message: `Enter team member's ${jobInfo}`,
            name: "jobInfo"
        },
        {
            type: "list",
            message: "Would you like to add another team member?",
            choices: [
                "yes",
                "no"
            ],
            name: "anotherProfile"
        }])

        .then(function({jobInfo, anotherProfile}) {
            let newProfile;
            if (occupation === "Manager") {
                newProfile = new Manager(name, id, email, jobInfo);
                
            } else if (occupation === "Engineer") {
                newProfile = new Engineer(name, id, email, jobInfo);

            } else {
                newProfile = new Intern(name, id, email, jobInfo);

            }

            employees.push(newProfile);

            // Function to Add Another Profile
            pushToHTML(newProfile)

            .then(function() {
                if (anotherProfile === "yes") {
                    createProfile();
                } else {
                    finishHtml();
                }
            });
            
        });
    });
}

// Function to create the template HTML

function createHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="ProfileGenerator.css">
        <title>Team Profile Generator</title>
    </head>
    
    <body>
        <div class="nav">
        
                <h2> My Team Profiles</h2>
            
        </div>
        <br>
        <br>
        `;

    fs.writeFile("ProfileGenerator.html", html, function(err) {
        if (err) {
            console.log(err);
    }
    });
}

// Pushing User Input (Manager,Engineer, and Intern) to the HTML file.

function pushToHTML(member) {

    return new Promise(function(resolve, reject) {
        let data = "";
        const name = member.getName();
        const occupation = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        

        // Set Up for Manager
        if (occupation === "Manager") {
            const officeNumber = member.getOfficeNumber();
            data = `<div class="profileBox">
            <div class="profileCard">
            <div class="memberJob">
            <h1 class="memberName">${name}<br />Manager</h1>

            <ul>
                <li class="credentials">ID: ${id}</li>
                <li class="credentials">Office Number: ${officeNumber}</li>
                <li class="credentials">Email: ${email}</li>
            </ul>
            </div>
            </div>
        </div>`;
            
         } 

         // Set Up for Engineer
        else if (occupation === "Engineer") {
            const gitHub = member.getGithub();

            data = `<div class="profileBox">
            <div class="profileCard">
            <div class="memberJob">
            <h1 class="memberName">${name}<br />Engineer</h1>

            <ul>
                <li class="credentials">ID: ${id}</li>
                <li class="credentials">GitHub: ${gitHub}</li>
                <li class="credentials">Email: ${email}</li>
            </ul>
            </div>
            </div>
        </div>`;

        // Set Up for Intern

        } else {
            const school = member.getSchool();
            data = `<div class="profileBox">
            <div class="profileCard">
            <div class="memberJob">
            <h1 class="memberName">${name}<br />Intern</h1>

            <ul>
                <li class="credentials">ID: ${id}</li>
                <li class="credentials">School: ${school}</li>
                <li class="credentials">Email: ${email}</li>
            </ul>
            </div>
            </div>
        </div>`;
        }

// Message Received when information is collected.

        console.log("Please wait. Team member profile list is being generated.");
        fs.appendFile("ProfileGenerator.html", data, function (err) {


         if (err) {
        return reject(err);
        };
        return resolve();
    });
    });
    
}

// Finalizing the HTML File/Append Information to HMTL File.


function finishHtml() {
    const html = ` </div>
    
</body>
</html>`;

    fs.appendFile("ProfileGenerator.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });


    console.log("Your Teammate profile have been generated!");
}
getStarted();
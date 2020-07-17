const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

let appendFileasync = util.promisify(fs.appendFile);

let gatherInfo = async () => {
    let {title} = await inquirer.prompt({
        message: "Enter your repository/project name here:",
        name: "title",
    });
    let {description} = await inquirer.prompt({
        message: "Enter description here:",
        name: "description",
    });
    let {installation} = await inquirer.prompt({
        message: "Enter installation steps here:",
        name: "installation",
    });
    let {usage} = await inquirer.prompt({
        message: "Enter usage here:",
        name: "usage",
    });
    let {contributing} = await inquirer.prompt({
        message: "How does one contribute to this project?",
        name: "contributing",
    });
    let {tests} = await inquirer.prompt({
        message: "Enter tests here:",
        name: "tests",
    });
    let {github} = await inquirer.prompt({
        message: "Enter your github username:",
        name: "github",
    });
    let {email} = await inquirer.prompt({
        message: "Enter your email address:",
        name: "email",
    });
    let {license} = await inquirer.prompt({
        type: "list", 
        message: "Which License are you publishing this under?",
        choices: ["AGPL-3.0", "GPL-3.0", "LGPL-3.0", "MPL-2.0", "APACHE-2.0", "MIT", "BSL-1.0", "Unlicense"],
        name: "license",
    })

    let readmeText = `
[GitHub](https://img.shields.io/github/license/${github}/${title})

# ${title}

## Description

${description}

## Table of Contents

*[Installation](#installation)
*[Usage](#usage)
*[License](#license)
*[Contributing](#contributing)
*[Tests](#tests)
*[Questions](#questions)

## Installation

${installation}

## Usage

${usage}

## License

For full license information, please [click here](https://choosealicense.com/licenses/${license}/). 

## Contributing

${contributing}

## Tests

${tests}

## Questions

Want to know more? Look me up on GitHub. My username is ${github} and my profile is at [github.com/${github}](github.com/${github})

Alternatively, get in touch by emailing me at [${email}](mailto:${email}).
`;

    await appendFileasync("README.md", readmeText, "utf8")
    .catch((err) => console.log(err));
}
gatherInfo();

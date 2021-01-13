const inquirer = require("inquirer")
const fs = require("fs")
const util = require("util")

const writeFsA = util.promisify(fs.writeFile)

const questions = () =>{
    
    return inquirer.prompt([
   {
        type:"input",
        name: "pro_title",
        message: "Please input the title for *<Project>*"
        },
    {
        type:"editor",
        name: "description",
        message: "Please add a description for *<Project>*"
        },
    {
        type:"editor",
        name: "install",
        message: `Please add instructions on *<Installation>*`
        },        
    {
        type:"editor",
        name: "usage",
        message: `Please add details on *<Usage>*`
        },
    {
        type:"editor",
        name: "contr",
        message: `Please add contribution guidlines *<Contributing>*`
        },        
    {
        type:"editor",
        name: "test",
        message: `Please add testing instructions *<Tests>*`
        }, 
    {
        type:"input",
        name: "git",
        message: "Please enter your GitHub username *<Questions>*"
        },        
    {
        type:"input",
        name: "email",
        message: "Please enter your contact email *<Questions>*"
        },
    {
        type:"list",
        name: "lice",
        message: "Please choose your desired License",
        choices: liceX
        }
    ])
} 

const liceX = [
    {name:'GNU GPLv3'},
    {name:'MIT'},
    {name:'Apache'},
    {name:'ISC'}
]

const genMD = (out) =>{

return ` 
![](https://img.shields.io/apm/l/vim-mode)
---
# ${out.pro_title}

## Description 
${out.description}

## Table of Contents

* [Installation](#Installation)
* [Usage](#Usage)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)
* [License](#License)



## Installation

${out.install}


## Usage 

${out.usage}

## Contributing

${out.contr}

## Tests

${out.test}


## Questions

Github user name: [${out.git}](https://github.com/${out.git})

Contact email: [${out.email}](mailto:${out.email})

## License

Licensed under the [${out.lice}](${out.lice}%20License.txt) license.

---

© 2020 Wodahouse.com dwyhd (do what your heart desires) license Readme Generator - delete this line if unwanted!`

}

const init = async () => {
    try {
        const  out = await questions()
        const MD = genMD(out)
        await writeFsA("README.md", MD)
        console.log("Successfully wrote README.md")
    }catch(error){
        console.log(error)
    }
}

init()
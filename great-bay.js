var inquirer = require("inquirer");

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "greatbayDB"
});

//Table-name: items

// Get user input
inquirer.prompt([
    {
        type: "list",
        name: "choice",
        message: "Would you like to bid on an item or post an item?",
        choices: ["bid", "post"]
      },
]).then(function(answers){
    switch(answers.choice){
        case "bid":
            // bid function
            break;
        case "post":
            // post function
            break;
    }
});

//bid ufnction
// items = select * from
inquirer.prompt([
    {
        type: "target",
        name: "choice",
        message: "Would you like to bid on an item or post an item?",
        choices: items
    }
]).then(function(chosen){
    let bidTarget = chosen.target;
    
})
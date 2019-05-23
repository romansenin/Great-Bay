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
            inquirer.prompt([
                {
                    type: "input",
                    name: "bidder",
                    message: "What is your name?"
                },
                {
                    type: "input",
                    name: "item",
                    message: "What is the item?"
                },
                {
                    type: "input",
                    name: "price",
                    message: "What is the price?"
                }
            ]).then(function(postAnswers){
                postItem(postAnswers.item, postAnswers.bidder, postAnswers.price)
            });
            break;
        default:
            console.log("Unknown command...");
    }
});


function postItem(itemName, bidderName, priceName) {
  console.log("Inserting a new item...\n");
  var query = connection.query(
    "INSERT INTO items SET ?",
    {
      item: itemName,
      bidder: bidderName,
      price: priceName
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " item inserted!\n");
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function bidItem() {

  var query = connection.query("SELECT * FROM items", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
  });

  // logs the actual query being run
  console.log(query.sql);
}

function readItems() {
  console.log("Selecting all items...\n");
  connection.query("SELECT * FROM items", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
  });
}

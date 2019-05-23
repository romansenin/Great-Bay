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

function postItem(itemName, bidderName, priceName) {
  console.log("Inserting a new playlist...\n");
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

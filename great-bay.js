// npm packages
let inquirer = require("inquirer");
let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "greatbayDB"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("Connected as id: " + connection.threadId);
  console.log(" \n--- Welcome to Great Bay! ---\n ");
  start();
});

function start() {
  inquirer
    .prompt({
      name: "postOrBid",
      type: "list",
      message: "Would you like to [POST] an auction or [BID] on an auction?",
      choices: ["POST", "BID", "QUIT"]
    })
    .then(function(answer) {
      if (answer.postOrBid.toUpperCase() === "POST") {
        postAuction();
      } else if (answer.postOrBid.toUpperCase() === "BID") {
        bidAuction();
      } else {
        connection.end();
      }
    });
}

function postAuction() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "message",
        message: "What is the item you wish to submit?"
      },
      {
        name: "startingBid",
        type: "input",
        message: "What would you like the starting bid to be?",
        validate: function(value) {
          return !isNaN(value);
        }
      }
    ])
    .then(function(answer) {
      connection.query(
        "insert into auctions (itemName, startingBid, highestBid) values (?, ?, ?)",
        [answer.item, answer.startingBid, answer.startingBid],
        function(err) {
          if (err) throw err;
          console.log("Your auction was created successfully!");
          start();
        }
      );
    });
}

function bidAuction() {
  connection.query("select * from auctions", function(err, rows) {
    if (err) throw err;
    for (let i = 0; i < rows.length; i++) {
      console.log("\n" + "-".repeat(20) + "\n");
      for (field in rows[i]) {
        if (field !== "id") {
          let fieldDisp;
          if (field === "itemName") {
            fieldDisp = "item name";
          } else {
            let index = field.indexOf("Bid");
            fieldDisp = field.slice(0, index) + " " + "bid";
          }
          let result;
          if (fieldDisp.slice(-3) === "bid") {
            result = "$" + rows[i][field];
          } else {
            result = rows[i][field];
          }
          let fieldDispArr = fieldDisp.split(" ");
          // console.log(resultArr);
          fieldDispArr.forEach((element, index) => {
            fieldDispArr[index] = element[0].toUpperCase() + element.slice(1);
          });
          // console.log(resultArr);
          console.log(fieldDispArr.join(" ") + ": " + result);
        }
      }
    }
    console.log("\n" + "-".repeat(20) + "\n");
    inquirer
      .prompt({
        name: "choice",
        type: "list",
        choices: function(value) {
          let choiceArr = [];
          for (let i = 0; i < rows.length; i++) {
            choiceArr.push(i + 1 + ". " + rows[i].itemName);
          }
          return choiceArr;
        },
        message: "What auction would you like to place a bid on?"
      })
      .then(function(itemAnswer) {
        inquirer
          .prompt({
            name: "bid",
            type: "input",
            message: "How much would you like to bid?",
            validate: function(value) {
              return !isNaN(value);
            }
          })
          .then(function(bidAnswer) {
            connection.query(
              "select highestBid from auctions where id = ?",
              [itemAnswer.choice.slice(0, itemAnswer.choice.indexOf("."))],
              function(err, row) {
                if (err) throw err;
                if (row[0].highestBid < bidAnswer.bid) {
                  connection.query(
                    "update auctions set highestBid = ? where id = ?",
                    [
                      bidAnswer.bid,
                      itemAnswer.choice.slice(0, itemAnswer.choice.indexOf("."))
                    ],
                    function(err) {
                      if (err) throw err;
                      console.log("Bid successfully placed!");
                      start();
                    }
                  );
                } else {
                  console.log("Your bid was too low. Try again.");
                  start();
                }
              }
            );
          });
      });
  });
}

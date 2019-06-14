# Great-Bay

`Allows users to create and bid on assorted items.`



To set up and use the app:
  1. Download/Clone the repository and navigate to it.
  1. Open the `great-bay.js` file in a text editor and locate the following block of code starting at line 5:
      ```javascript
      let connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "greatbayDB"
      });
      ```
      Replace "root" in the line
      ```javascript
      password: "root",
      ```
      with your MYSQL password.
  1. Start your MYSQL Server.
  1. (Optionally) Run the `greatbayDB.sql` file to fill the database with example items (CAUTION: make sure `greatbayDB` isn't a database name already in use on your machine).
  1. Run these two commands within your terminal:
      ```bash
      npm install
      npm start
      ```
---
### Technologies Used:
* inquirer.js
* MYSQL
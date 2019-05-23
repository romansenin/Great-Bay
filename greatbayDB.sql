drop database if exists greatbayDB;

create database greatbayDB;

SHOW databases;

use greatbayDB;

CREATE table ITEMS (
id INT NOT NULL AUTO_INCREMENT,
Item varcharacter(100) null,
Bidder varcharacter(100) null,
Price varcharacter(100) null,
PRIMARY KEY (id)
);

INSERT into ITEMS (Item, Bidder, Price)
VALUES ( "Authentic Rembrandt", "Pierre", 2000000);

INSERT into ITEMS (Item, Bidder, Price)
VALUES ( "Rhona Lisa", "Jacque", 12000000);

INSERT into ITEMS (Item, Bidder, Price)
VALUES ( "Elvis Portrait", "Jacqeline", 3000);

INSERT into ITEMS (Item, Bidder, Price)
VALUES ( "Aragorns Sword Replica", "Arthur", 17000);

select Item, Bidder, Price FROM ITEMS;

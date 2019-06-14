drop database if exists greatbayDB;

create database greatbayDB;

use greatbayDB;

create table auctions (
id int not null auto_increment,
itemName varchar(30) not null,
startingBid float(13, 4) default 0,
highestBid float(13, 4) default 0,
primary key (id)
);

insert into auctions (itemName, startingBid, highestBid)
values ("Authentic Rembrandt", 2000000, 2000000);

insert into auctions (itemName, startingBid, highestBid)
values ("Rhona Lisa", 12000000, 12000000);

insert into auctions (itemName, startingBid, highestBid)
values ("Elvis Portrait", 3000, 3000);

insert into auctions (itemName, startingBid, highestBid)
values ("Aragorns Sword Replica", 17000, 17000);


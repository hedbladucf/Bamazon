CREATE DATABASE Bamazon;
USE Bamazon;

create table Products (
	ItemID INTEGER NOT NULL AUTO_INCREMENT, 
    ProductName VARCHAR(30) NOT NULL,
    DepartmentName VARCHAR(30),
    Price INTEGER NOT NULL,
    StockQuantity INTEGER,
    PRIMARY	KEY (ItemID));
    
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES
    ('iPod','technology',299,30),
    ('iMac','technology',1199,15),
    ('Sofa','furniture',399,20),
    ('Desk','furniture',199,15);
    
select * from Bamazon.Products;
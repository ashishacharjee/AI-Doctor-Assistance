-- schema.sql
-- This file contains the SQL commands to create the database tables
-- for the Library Management System.

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `library_management`;

-- Use the newly created database
USE `library_management`;

-- Create the Books table
CREATE TABLE `Books` (
    `BookID` INT AUTO_INCREMENT PRIMARY KEY,
    `Title` VARCHAR(255) NOT NULL,
    `Author` VARCHAR(255) NOT NULL,
    `ISBN` VARCHAR(20) UNIQUE NOT NULL,
    `PublicationYear` INT,
    `Status` ENUM('Available', 'Borrowed') DEFAULT 'Available'
);

-- Create the Members table
CREATE TABLE `Members` (
    `MemberID` INT AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(255) NOT NULL,
    `ContactInfo` VARCHAR(255)
);

-- Create the Borrowings table
CREATE TABLE `Borrowings` (
    `BorrowingID` INT AUTO_INCREMENT PRIMARY KEY,
    `BookID` INT,
    `MemberID` INT,
    `BorrowDate` DATE NOT NULL,
    `DueDate` DATE NOT NULL,
    `ReturnDate` DATE,
    FOREIGN KEY (`BookID`) REFERENCES `Books`(`BookID`),
    FOREIGN KEY (`MemberID`) REFERENCES `Members`(`MemberID`)
);

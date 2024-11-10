-- Create the database
CREATE DATABASE VillageInvestorPortal;

-- Use the newly created database
USE VillageInvestorPortal;

-- Create a table for village delegates
CREATE TABLE VillageDelegates (
    delegate_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) NOT NULL UNIQUE,
    resources TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for investors
CREATE TABLE Investors (
    investor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile VARCHAR(15) NOT NULL UNIQUE,
    work_profile TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for invites sent from investors to village delegates
CREATE TABLE Invites (
    invite_id INT AUTO_INCREMENT PRIMARY KEY,
    investor_id INT,
    delegate_id INT,
    status ENUM('pending', 'accepted', 'declined') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (investor_id) REFERENCES Investors(investor_id) ON DELETE CASCADE,
    FOREIGN KEY (delegate_id) REFERENCES VillageDelegates(delegate_id) ON DELETE CASCADE
);
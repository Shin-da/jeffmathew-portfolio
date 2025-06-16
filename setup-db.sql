-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS portfolio_db;

-- Use the database
USE portfolio_db;

-- Create the page_views table
CREATE TABLE IF NOT EXISTS page_views (
    page_name VARCHAR(50) PRIMARY KEY,
    view_count INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); 
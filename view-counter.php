<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "portfolio_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the current page name
$page = isset($_GET['page']) ? $_GET['page'] : 'index';

// Update or insert view count
$sql = "INSERT INTO page_views (page_name, view_count) 
        VALUES (?, 1) 
        ON DUPLICATE KEY UPDATE view_count = view_count + 1";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $page);
$stmt->execute();

// Get the current view count
$sql = "SELECT view_count FROM page_views WHERE page_name = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $page);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

// Return the view count
echo $row['view_count'];

$stmt->close();
$conn->close();
?> 
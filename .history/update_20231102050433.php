<?php
$hostname = "localhost";
$username = "root";
$password = "";
$dbname = "dbprofile";

$conn = new mysqli($hostname, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name1 = $_POST['name1'];
$name2 = $_POST['name2'];
$name3 = $_POST['name3'];
$description = $_POST['description'];
$education = $_POST['education'];
$achievements = $_POST['achievements'];
$photo = $_POST['photo'];

$sql = "UPDATE  profilesET(name1, name2, name3, description, education, achievements, photo) VALUES ('$name1', '$name2', '$name3', '$description', '$education', '$achievements', '$photo')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


$conn->close();
?>
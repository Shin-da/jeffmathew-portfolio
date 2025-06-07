<!DOCTYPE html>
<html>
<head>
    <title>Edit Product</title>
</head>
<body>

<h2>Edit Product</h2>

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dbprofile";
$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $id = $_GET['id'];

    $sql = "SELECT * FROM product WHERE prod_id = $prod_id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $name1 = $row["name1"];        
        $name2 = $row["name2"];
        $name3 = $row["name3"];
        $photo = $row["photo"];      
        $description = $row["description"];
        $education = $row["education"];
        $achievements = $row["achievements"];
    } else {
        echo "User not found.";
    }
}
?>

<form action="update_product.php" method="post">
    <input type="hidden" name="id" value="<?php echo $id; ?>">
    Name 1: <input type="text" name="name1" value="<?php echo $name1; ?>"><br><br>
    Name 2: <input type="text" name="name2" value="<?php echo $name2; ?>"><br><br>
    Name 3: <input type="text" name="name3" value="<?php echo $name3; ?>"><br><br>
    Photo: <input type="text" name="photo" value="<?php echo $photo; ?>"><br><br>
    <input type="submit" value="Update">
</form>

<?php
$conn->close();
?>

</body>
</html>
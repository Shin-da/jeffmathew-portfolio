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
        $photo = $row["name1"];      
        $description = $row["description"];
        $education = $row["education"];
        $achievements = $row["achievements"];
    } else {
        echo "Product not found.";
    }
}
?>

<form action="update_product.php" method="post">
    <input type="hidden" name="prod_id" value="<?php echo $prod_id; ?>">
    Product Name: <input type="text" name="Prod_name" value="<?php echo $prod_name; ?>"><br><br>
    Price: <input type="text" name="price" value="<?php echo $price; ?>"><br><br>
    Size: <input type="text" name="size" value="<?php echo $size; ?>"><br><br>
    Variant: <input type="text" name="variant" value="<?php echo $variant; ?>"><br><br>
    <input type="submit" value="Update">
</form>

<?php
$conn->close();
?>

</body>
</html>
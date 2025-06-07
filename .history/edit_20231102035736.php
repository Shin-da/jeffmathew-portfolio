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
        $description = $row["description"];
        $education = $row["education"];
        $achievements = $row["achievements"];
        $photo = $row["photo"];      
    } else {
        echo "User not found.";
    }
    
// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize it
    $name1 = mysqli_real_escape_string($conn, ucwords($_POST["name1"]));
    $name2 = mysqli_real_escape_string($conn, ucwords($_POST["name2"]));
    $name3 = mysqli_real_escape_string($conn, ucwords($_POST["name3"]));
    $description = mysqli_real_escape_string($conn, ucwords($_POST["description"]));
    $education = mysqli_real_escape_string($conn, ucwords($_POST["education"]));
    $achievements = mysqli_real_escape_string($conn, ucwords($_POST["achievements"]));

    // Check if an image was uploaded
    if ($_FILES["image"]["name"]) {
        // Get the uploaded file name and extension
        $filename = basename($_FILES["image"]["name"]);
        $extension = pathinfo($filename, PATHINFO_EXTENSION);
        $allowed_extensions = array("jpg", "jpeg", "png", "gif");

        // Check if the uploaded file is a valid image file
        if (!in_array($extension, $allowed_extensions)) {
            echo "Invalid image file. Allowed extensions: " . implode(", ", $allowed_extensions);
            exit();
        }

        // Generate a unique filename for the uploaded image
        //$new_filename = uniqid() . "." . $extension;
        $new_filename = $id . "." . $extension;

        // Move the uploaded image to the uploads directory
        if (!move_uploaded_file($_FILES["photo"]["tmp_name"], "uploads/" . $new_filename)) {
            echo "Error uploading image file";
            exit();
        }

        // Delete the previous image file
        if ($photo != "default.jpg" && file_exists("uploads/" . $photo)) {
            unlink("uploads/" . $photo);
        }

        // Set the image filename to the new filename
        $photo = "uploads/" . $new_filename;
    }

    // Prepare SQL statement
    $sql = "UPDATE profile SET name1 = '$name1', name2 = '$name2', name3 = '$name3', description = '$description', education = '$education', achievements = '$achievements',  photo = '$photo' WHERE id = '$id'";

// Execute SQL statement
if (mysqli_query($conn, $sql)) {
    // Redirect to view page with success message
    header("Location: view.php?id=$id&message=success");
    exit();
} else {
    echo "Error updating record: " . mysqli_error($conn);
}
}



<form action="update_product.php" method="post">
    <input type="hidden" name="id" value="<?php echo $id; ?>">
    Name 1: <input type="text" name="name1" value="<?php echo $name1; ?>"><br><br>
    Name 2: <input type="text" name="name2" value="<?php echo $name2; ?>"><br><br>
    Name 3: <input type="text" name="name3" value="<?php echo $name3; ?>"><br><br>
    description: <input type="text" name="description" value="<?php echo $description; ?>"><br><br>
    education: <input type="text" name="education" value="<?php echo $education; ?>"><br><br>
    achievements: <input type="text" name="namachievementse3" value="<?php echo $achievements; ?>"><br><br>

    <label>Profile Picture:</label><br>
        <img id="preview" src="<?php echo $photo; ?>" width="100" height="100"><br>
        <input type="file" name="photo" onchange="previewImage(event)"><br><br>
        <input type="submit" value="Update">
        <input type="submit" value='Cancel' onclick="location.href='index.php?id=<?php echo $id; ?>'">
</form>

</body>
</html>
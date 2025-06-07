<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio</title>
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

  <link href="css/styles.css" rel="stylesheet" />

  <link rel="stylesheet" href="style.css">

</head>

<body>

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

    $sql = "SELECT * FROM profile ";
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
        $filename = basename($_FILES["photo"]["name3"]);
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
    header("Location: index.php?id=$id&message=success");
    exit();
} else {
    echo "Error updating record: " . mysqli_error($conn);
}
}
}
?>
<div class="container-fluid">
    <div class="container">
        <form class="form" action="update.php" method="POST">
            <input type="hidden" name="id" value="<?php echo $id; ?>">
            Name 1: <input type="text" name="name1" value="<?php echo $name1; ?>"><br><br>
            Name 2: <input type="text" name="name2" value="<?php echo $name2; ?>"><br><br>
            Name 3: <input type="text" name="name3" value="<?php echo $name3; ?>"><br><br>
            description: <input type="text" name="description" value="<?php echo $description; ?>"><br><br>
            education: <input type="text" name="education" value="<?php echo $education; ?>"><br><br>
            achievements: <input type="text" name="achievements" value="<?php echo $achievements; ?>"><br><br>
        
            <label>Profile Picture:</label><br>
                <img id="preview" src="<?php echo $photo; ?>" width="200" height="200"><br>
                <input type="file" name="photo" onchange="previewImage(event)"><br><br>
                <input type="submit" value="Update" onclick="location.href='index.php?id=<?php echo $id; ?>'">
                <input type="submit" value='Cancel' onclick="location.href='index.php?id=<?php echo $id; ?>'">
        </form>
    
    </div>

</div>

<?php

// Close database connection
mysqli_close($conn);
?>
</body>
</html>

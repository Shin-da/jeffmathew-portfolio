<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio</title>
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

  <link href="css/styles.css" rel="stylesheet" />

  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

</head>

<body>
  <?php
  $hostname = "localhost";
  $username = "root";
  $password = "";
  $dbname = "profile";
  $conn = new mysqli($hostname, $username, $password, $dbname);


  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  // Execute the SQL query to fetch data for the specified 'id'
  $sql = "SELECT * FROM profile";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc(); // Fetch the first row (assuming you expect only one row)
  } else {
    // Handle the case where no data is found
    echo "No data found.";
  }
 ?>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
    <div class="container">
      <a class="navbar-brand" href="#page-top">
        <span class="brand-first"><?php echo $row["name1"]; ?></span>
        <span class="brand-second"><?php echo $row["name2"]; ?></span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#about">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#projects">Projects</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact">Contact</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="edit.php">Edit</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container-fluid hero" style="height:100vh;">
    <div class="container d-flex justify-content-center align-items-center h-100">
      <div class="row align-items-center">
        <div class="col-lg-6" data-aos="fade-right">
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="hero-title">
                <span class="greeting">Hello, I'm</span>
                <span class="name"><?php echo $row["name1"]; ?></span>
                <span class="role"><?php echo $row["name2"]; ?></span>
              </h1>
              <p class="hero-description">
                I create beautiful and functional websites with a focus on user experience and modern design.
              </p>
              <div class="hero-buttons">
                <a href="#projects" class="btn btn-primary">View My Work</a>
                <a href="#contact" class="btn btn-outline">Contact Me</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6" data-aos="fade-left">
          <div class="hero-image-container">
            <div class="hero-image-wrapper">
              <img src="<?php echo $row["photo"]; ?>" alt="John Doe" class="hero-image">
              <div class="hero-shape"></div>
            </div>
            <div class="floating-icons">
              <div class="floating-icon" style="--delay: 0s">
                <i class="fab fa-html5"></i>
              </div>
              <div class="floating-icon" style="--delay: 0.2s">
                <i class="fab fa-css3-alt"></i>
              </div>
              <div class="floating-icon" style="--delay: 0.4s">
                <i class="fab fa-js"></i>
              </div>
              <div class="floating-icon" style="--delay: 0.6s">
                <i class="fab fa-react"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-down">
      <a href="#about" class="scroll-down-link">
        <span>Scroll Down</span>
        <i class="fas fa-chevron-down"></i>
      </a>
    </div>
  </div>

  <div class="container-fluid container1">
    <div class="container d-flex flex-row">
      <div class="container names">
        <p class="h1 name jeff" style="color:#8d7142;"> <?php echo $row["name1"]; ?></p> <br />
        <p class="h1 name " style="color: #544c33;"> <?php echo $row["name2"]; ?></p>
      </div>

      <div class="container picture">
        <img src="<?php echo $row["photo"]; ?>" alt="user's picture" class="userPicture position-absolute " style=" width:32%;  z-index: 1;
        -webkit-mask-image: -webkit-gradient(linear, left 90%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))">
        <!-- <div class="container bg-light position-absolute start-50" style=" "></div> -->
      </div>
    </div>
  </div>

  <div class="container-fluid container2" style="background-color:#544c33;">
    <div class="container names">
      <p class="h1 name garcia" style="color: #fff3e7;"> <?php echo $row["name3"]; ?></p>
    </div>
  </div>


  <div class="container-fluid about" style="height:auto; padding: 100px 0;">
    <div class="container" id="about">
      <div class="about-header text-center mb-5">
        <h2 class="section-title">About Me</h2>
        <div class="section-divider"></div>
      </div>

      <div class="about-content">
        <div class="row align-items-center">
          <div class="col-lg-4">
            <div class="about-image-container">
              <img src="nstp.png" alt="Profile Picture" class="about-image">
              <div class="about-image-overlay"></div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="about-text">
              <div class="about-description">
                <p><?php echo $row["description"]; ?></p>
              </div>
              <div class="about-details">
                <div class="detail-item">
                  <i class="fas fa-graduation-cap"></i>
                  <div class="detail-content">
                    <h3>Education</h3>
                    <p><?php echo $row["education"]; ?></p>
                  </div>
                </div>
                <div class="detail-item">
                  <i class="fas fa-trophy"></i>
                  <div class="detail-content">
                    <h3>Achievements</h3>
                    <p><?php echo $row["achievements"]; ?></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid projects" style="height:auto; padding: 100px 0;">
    <div class="container" id="projects">
      <div class="projects-header text-center mb-5">
        <h2 class="section-title">My Projects</h2>
        <div class="section-divider"></div>
        <p class="projects-subtitle">Here are some of the projects I've worked on</p>
      </div>
      
      <div class="row g-4">
        <!-- Project 1 -->
        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
          <div class="project-card">
            <div class="project-image-container">
              <img src="booklist.png" alt="Book List Project" class="project-image">
              <div class="project-overlay">
                <div class="project-links">
                  <a href="#" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                  <a href="#" class="project-link" target="_blank"><i class="fab fa-github"></i> Source Code</a>
                </div>
              </div>
            </div>
            <div class="project-content">
              <h3>Book List Manager</h3>
              <p>A web application for managing and organizing your reading list. Features include adding, editing, and categorizing books.</p>
              <div class="project-tech">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>PHP</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Project 2 -->
        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
          <div class="project-card">
            <div class="project-image-container">
              <img src="hourConvert.png" alt="Hour Converter Project" class="project-image">
              <div class="project-overlay">
                <div class="project-links">
                  <a href="#" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                  <a href="#" class="project-link" target="_blank"><i class="fab fa-github"></i> Source Code</a>
                </div>
              </div>
            </div>
            <div class="project-content">
              <h3>Hour Converter</h3>
              <p>A utility tool for converting time between different formats. Helps users quickly convert hours, minutes, and seconds.</p>
              <div class="project-tech">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Project 3 -->
        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="300">
          <div class="project-card">
            <div class="project-image-container">
              <img src="calendar.png" alt="Calendar Project" class="project-image">
              <div class="project-overlay">
                <div class="project-links">
                  <a href="#" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                  <a href="#" class="project-link" target="_blank"><i class="fab fa-github"></i> Source Code</a>
                </div>
              </div>
            </div>
            <div class="project-content">
              <h3>Interactive Calendar</h3>
              <p>A dynamic calendar application with event management features. Users can add, edit, and delete events.</p>
              <div class="project-tech">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>PHP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-5">
        <a href="#" class="view-all-projects">View All Projects <i class="fas fa-arrow-right"></i></a>
      </div>
    </div>
  </div>

  <div class="container-fluid contact" style="height:auto; padding: 100px 0;">
    <div class="container" id="contact">
      <div class="contact-header text-center mb-5">
        <h2 class="section-title">Get In Touch</h2>
        <div class="section-divider"></div>
        <p class="contact-subtitle">Feel free to reach out to me for any inquiries or opportunities</p>
      </div>
      
      <div class="row">
        <div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
          <div class="contact-info">
            <h3 class="contact-info-title">Contact Information</h3>
            <div class="contact-info-item">
              <i class="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>your.email@example.com</p>
              </div>
            </div>
            <div class="contact-info-item">
              <i class="fas fa-phone"></i>
              <div>
                <h4>Phone</h4>
                <p>+1 234 567 8900</p>
              </div>
            </div>
            <div class="contact-info-item">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <h4>Location</h4>
                <p>Manila, Philippines</p>
              </div>
            </div>
            
            <div class="social-links-container">
              <h3 class="social-links-title">Connect With Me</h3>
              <div class="social-links">
                <a href="https://instagram.com/yourusername" target="_blank" class="social-link">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="https://twitter.com/yourusername" target="_blank" class="social-link">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" class="social-link">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="https://github.com/yourusername" target="_blank" class="social-link">
                  <i class="fab fa-github"></i>
                </a>
                <a href="https://wa.me/yourphonenumber" target="_blank" class="social-link">
                  <i class="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-6" data-aos="fade-left">
          <div class="contact-form-container">
            <form class="contact-form" id="contactForm">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
              </div>
              <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" id="subject" name="subject" required>
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" class="submit-btn">
                <span>Send Message</span>
                <i class="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/scripts.js"></script>
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script>
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // Navbar scroll behavior
    document.addEventListener('DOMContentLoaded', function() {
      const navbar = document.getElementById('mainNav');
      
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
      
      // Active link highlighting
      const sections = document.querySelectorAll('section, .hero, .about, .projects, .contact');
      const navLinks = document.querySelectorAll('.nav-link');
      
      window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          
          if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
          }
        });
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
          }
        });
      });
    });
  </script>

  <?php
  $conn->close();
  ?>
</body>

</html>
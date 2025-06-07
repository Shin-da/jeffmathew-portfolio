<?php
function renderNavbar($activePage = '') {
?>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div class="container">
            <a class="navbar-brand" href="#page-top">
                <span class="brand-first"><?php echo isset($row["name1"]) ? $row["name1"] : 'Jeff'; ?></span>
                <span class="brand-second"><?php echo isset($row["name2"]) ? $row["name2"] : 'Mathew'; ?></span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link <?php echo $activePage === 'about' ? 'active' : ''; ?>" href="#about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo $activePage === 'projects' ? 'active' : ''; ?>" href="#projects">Projects</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo $activePage === 'contact' ? 'active' : ''; ?>" href="#contact">Contact</a>
                    </li>   
                </ul>
            </div>
        </div>
    </nav>
<?php
}
?> 
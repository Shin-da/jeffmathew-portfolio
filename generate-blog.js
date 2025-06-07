const fs = require('fs');
const path = require('path');
const marked = require('marked');

const POSTS_DIR = path.join(__dirname, 'posts');
const OUTPUT_DIR = path.join(__dirname, 'blog');

const GA_TAG = `<!-- Google tag (gtag.js) -->\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-83JWZVGGNV\"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'G-83JWZVGGNV');\n</script>`;

// Simple blog post template (customize as needed)
function getTemplate({ title, date, content, recentPosts, filename, excerpt }) {
  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "datePublished": date,
    "author": {
      "@type": "Person",
      "name": "Jeff Mathew Garcia"
    },
    "description": excerpt,
    "mainEntityOfPage": `https://yourdomain.com/blog/${filename}`,
    "publisher": {
      "@type": "Person",
      "name": "Jeff Mathew Garcia"
    }
  };
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Jeff Mathew Garcia</title>
  <meta name="description" content="${excerpt}">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="../css/main.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">
  <link rel="icon" type="image/jpeg" href="../assets/images/me.jpg" sizes="32x32">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  ${GA_TAG}
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav" aria-label="Main navigation">
    <div class="container">
      <a class="navbar-brand" href="../index.html">
        <span class="brand-first">Jeff</span>
        <span class="brand-second">Mathew</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="../index.html#about">About</a></li>
          <li class="nav-item"><a class="nav-link" href="../index.html#projects">Projects</a></li>
          <li class="nav-item"><a class="nav-link" href="../index.html#art">Art</a></li>
          <li class="nav-item"><a class="nav-link" href="../index.html#contact">Contact</a></li>
        </ul>
        <button id="darkModeToggle" class="btn btn-link ms-3" aria-label="Toggle dark mode" style="font-size:1.5rem;"><i class="fas fa-moon"></i></button>
      </div>
    </div>
  </nav>
  <article class="blog-post">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <nav aria-label="breadcrumb" class="mt-4 mb-3">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="../index.html">Home</a></li>
              <li class="breadcrumb-item"><a href="index.html">Blog</a></li>
              <li class="breadcrumb-item active" aria-current="page">${title}</li>
            </ol>
          </nav>
          <header class="blog-post-header text-center">
            <h1 class="blog-post-title">${title}</h1>
            <div class="blog-post-meta">
              <span class="date">${date}</span>
            </div>
          </header>
          <div class="blog-post-content">
            ${content}
          </div>
        </div>
        <aside class="col-lg-4 d-none d-lg-block">
          <div class="blog-sidebar">
            <h3 class="sidebar-title">Recent Posts</h3>
            <ul class="sidebar-list">
              ${recentPosts.map(post => `<li><a href="${post.filename}">${post.title}</a></li>`).join('')}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </article>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <p>Made with <span aria-label="love" style="color:#b47c6c;">❤️</span> by Jeff Mathew Garcia &mdash; &copy; 2025. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>`;
}

// Extract title and date from Markdown (YAML frontmatter or fallback)
function parseMarkdown(md) {
  let title = 'Untitled Post';
  let date = new Date().toLocaleDateString();
  let content = md;

  // Simple frontmatter: ---\ntitle: ...\ndate: ...\n---
  const fm = md.match(/^---([\s\S]*?)---/);
  if (fm) {
    const fmContent = fm[1];
    content = md.replace(fm[0], '').trim();
    const titleMatch = fmContent.match(/title:\s*(.*)/);
    const dateMatch = fmContent.match(/date:\s*(.*)/);
    if (titleMatch) title = titleMatch[1].trim();
    if (dateMatch) date = dateMatch[1].trim();
  } else {
    // Fallback: first line starting with #
    const titleLine = md.match(/^#\s+(.+)/m);
    if (titleLine) title = titleLine[1].trim();
  }
  return { title, date, content };
}

function getIndexTemplate(posts) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - Jeff Mathew Garcia</title>
  <meta name="description" content="Read about web development, art, and the intersection of technology and creativity.">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="../css/main.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">
  <link rel="icon" type="image/jpeg" href="../assets/images/me.jpg" sizes="32x32">
  ${GA_TAG}
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav" aria-label="Main navigation">
    <div class="container">
      <a class="navbar-brand" href="../index.html">
        <span class="brand-first">Jeff</span>
        <span class="brand-second">Mathew</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="../index.html#about">About</a></li>
          <li class="nav-item"><a class="nav-link" href="../index.html#projects">Projects</a></li>
          <li class="nav-item"><a class="nav-link" href="../index.html#art">Art</a></li>
          <li class="nav-item"><a class="nav-link" href="../index.html#contact">Contact</a></li>
        </ul>
        <button id="darkModeToggle" class="btn btn-link ms-3" aria-label="Toggle dark mode" style="font-size:1.5rem;"><i class="fas fa-moon"></i></button>
      </div>
    </div>
  </nav>
  <section class="blog-index">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <header class="blog-index-header text-center">
            <h1 class="blog-index-title">Blog & Updates</h1>
            <p class="blog-index-subtitle">Exploring the intersection of art and technology</p>
          </header>
          <div class="row">
            <div class="col-lg-8">
              <div class="blog-posts">
                ${posts.map(post => `
                  <article class="blog-post-card">
                    <div class="row g-4 align-items-center">
                      <div class="col-md-12">
                        <div class="blog-post-content">
                          <div class="blog-post-meta">
                            <span class="date">${post.date}</span>
                          </div>
                          <h2 class="blog-post-title">
                            <a href="${post.filename}">${post.title}</a>
                          </h2>
                          <p class="blog-post-excerpt">${post.excerpt}</p>
                          <a href="${post.filename}" class="blog-readmore">Read More</a>
                        </div>
                      </div>
                    </div>
                  </article>
                `).join('')}
              </div>
            </div>
            <aside class="col-lg-4 d-none d-lg-block">
              <div class="blog-sidebar">
                <h3 class="sidebar-title">Recent Posts</h3>
                <ul class="sidebar-list">
                  ${posts.slice(0, 5).map(post => `<li><a href="${post.filename}">${post.title}</a></li>`).join('')}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <p>Made with <span aria-label="love" style="color:#b47c6c;">❤️</span> by Jeff Mathew Garcia &mdash; &copy; 2025. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>`;
}

function build() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error('No posts directory found.');
    process.exit(1);
  }
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  if (!files.length) {
    console.log('No markdown files found in posts/.');
    return;
  }
  const postList = [];
  files.forEach(file => {
    const mdPath = path.join(POSTS_DIR, file);
    const md = fs.readFileSync(mdPath, 'utf-8');
    const { title, date, content } = parseMarkdown(md);
    const htmlContent = marked.parse(content);
    const outName = file.replace(/\.md$/, '.html');
    // Excerpt: first 30 words or 200 chars
    let excerpt = content.replace(/[#>*_\-\[\]!`]/g, '').split(/\s+/).slice(0, 30).join(' ');
    if (excerpt.length > 200) excerpt = excerpt.slice(0, 200) + '...';
    postList.push({ title, date, excerpt, filename: outName });
  });
  // Sort posts by date (descending)
  postList.sort((a, b) => new Date(b.date) - new Date(a.date));
  // Generate each post with recent posts sidebar
  postList.forEach(post => {
    const mdPath = path.join(POSTS_DIR, post.filename.replace(/\.html$/, '.md'));
    const md = fs.readFileSync(mdPath, 'utf-8');
    const { title, date, content } = parseMarkdown(md);
    const htmlContent = marked.parse(content);
    const html = getTemplate({ title, date, content: htmlContent, recentPosts: postList.filter(p => p.filename !== post.filename).slice(0, 5), filename: post.filename, excerpt: post.excerpt });
    const outPath = path.join(OUTPUT_DIR, post.filename);
    fs.writeFileSync(outPath, html, 'utf-8');
    console.log(`Generated ${post.filename}`);
  });
  // Generate index.html
  const indexHtml = getIndexTemplate(postList);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), indexHtml, 'utf-8');
  console.log('Generated blog/index.html');
}

build(); 
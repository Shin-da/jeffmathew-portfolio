# Contributing to Jeff Mathew Garcia's Portfolio

Thank you for your interest in my portfolio project! This document provides guidelines for contributing to the codebase and using it for your own projects.

## 🎯 Project Overview

This is the personal portfolio website of Jeff Mathew Garcia (シン/shin), showcasing my work as an IT professional and digital artist. The project features a modern, responsive design with interactive galleries, blog functionality, and professional presentation.

## 📋 Code Usage Guidelines

### ✅ What You Can Do

- **Use the code structure** for your own portfolio projects
- **Modify and adapt** the CSS, JavaScript, and HTML architecture
- **Implement similar features** like the gallery system, blog generation, or theme switching
- **Learn from the code** and apply concepts to your own projects
- **Fork the repository** for educational purposes

### ❌ What You Cannot Do

- **Copy personal content** (text, descriptions, project details)
- **Use my images or artwork** without explicit permission
- **Claim my work as your own** or remove attribution
- **Reproduce my exact portfolio** with your information
- **Use my name, branding, or personal information**

## 🚀 Getting Started

### Prerequisites

- Node.js (for blog generation)
- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shin-da/jeffmathew-portfolio.git
   cd jeffmathew-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. For blog development:
   ```bash
   node generate-blog.js
   ```

## 🛠️ Development Guidelines

### Code Structure

```
├── assets/          # Images and media files
├── blog/           # Generated blog pages
├── css/            # Stylesheets (modular approach)
│   ├── modules/    # Component-specific styles
│   └── main.css    # Main stylesheet with imports
├── js/             # JavaScript files
├── posts/          # Blog post markdown files
├── index.html      # Main portfolio page
├── projects.html   # Projects showcase
├── gallery.html    # Art gallery
└── generate-blog.js # Blog generation script
```

### CSS Architecture

The project uses a modular CSS approach:
- `main.css` - Main imports and core styles
- `modules/` - Component-specific stylesheets
- CSS custom properties for theming
- Mobile-first responsive design

### JavaScript Organization

- `main.js` - Core functionality and animations
- `navigation.js` - Navigation system
- `gallery.js` - Art gallery functionality
- `theme-handler.js` - Dark/light theme switching
- `generate-blog.js` - Blog generation script

## 📝 Adding Your Own Content

### Personal Information

1. Update the HTML files with your information
2. Replace images in `assets/images/` with your own
3. Modify the meta tags and SEO information
4. Update social media links

### Projects

1. Edit `projects.html` to showcase your projects
2. Update the GitHub API integration with your username
3. Add your own project screenshots and descriptions

### Art Gallery

1. Replace artwork in `assets/images/gallery/`
2. Update the gallery data in `js/gallery.js`
3. Modify categories to match your work

### Blog Posts

1. Add markdown files to the `posts/` directory
2. Run `node generate-blog.js` to generate HTML pages
3. Customize the blog template as needed

## 🎨 Customization Tips

### Color Scheme

Update CSS custom properties in `css/theme.css`:
```css
:root {
  --primary-color: #your-color;
  --accent-color: #your-accent;
  --text-color: #your-text;
  /* ... other variables */
}
```

### Typography

Modify font imports and CSS variables:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;700&display=swap');
```

### Animations

Customize AOS (Animate On Scroll) settings in `js/main.js`:
```javascript
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  // ... other options
});
```

## 🤝 Contributing to the Codebase

### Bug Reports

If you find a bug or issue:

1. Check if it's already reported in the Issues section
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and device information

### Feature Requests

For new features:

1. Check if it's already requested
2. Create an issue describing:
   - The feature you'd like
   - Why it would be useful
   - How it could be implemented

### Code Contributions

If you want to contribute code:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request with:
   - Clear description of changes
   - Screenshots if UI changes
   - Testing information

## 📄 License

This project is licensed under the MIT License with additional terms for portfolio content. See the [LICENSE](LICENSE) file for details.

## 🙏 Attribution

If you use this code for your portfolio, please include attribution:

```html
<!-- 
  Portfolio inspired by Jeff Mathew Garcia's design
  Original: https://github.com/shin-da/jeffmathew-portfolio
-->
```

## 📞 Contact

For questions about the code or permission to use specific content:

- **GitHub**: [@shin-da](https://github.com/shin-da)
- **LinkedIn**: [Jeff Mathew Garcia](https://www.linkedin.com/in/jeffmathew-garcia-a1b636347/)
- **Website**: [Portfolio](https://shin-da.github.io/jeffmathew-portfolio/)

## 🎉 Thank You!

Thank you for respecting my work and creativity. I hope this codebase helps you create something amazing for your own portfolio!

---

**Remember**: Be creative, be original, and make it your own! 🚀 
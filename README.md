# Igloo-Inspired Personal Website

A modern, responsive personal website inspired by the design aesthetics of Igloo Inc. This template features a beautiful iceberg-themed design with smooth animations, interactive elements, and a professional layout.

## Features

- 🎨 **Modern Design**: Clean, professional layout with iceberg-inspired visual elements
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Smooth Animations**: CSS animations and JavaScript interactions for enhanced UX
- 🎯 **Interactive Elements**: Floating particles, parallax effects, and hover animations
- 📧 **Contact Form**: Functional contact form with validation
- 🚀 **Fast Loading**: Optimized code for quick page loads
- 🎨 **Customizable**: Easy to personalize with your own content

## Quick Start

1. **Download/Clone** the files to your local machine
2. **Open** `index.html` in your web browser
3. **Customize** the content with your personal information
4. **Deploy** to your preferred hosting platform

## Customization Guide

### Personal Information

Edit the following sections in `index.html`:

#### Navigation & Branding
```html
<div class="nav-logo">
    <h2>Your Name</h2>  <!-- Replace with your name -->
</div>
```

#### Hero Section
```html
<h1 class="hero-title">
    <span class="title-line">Building the</span>  <!-- Customize your tagline -->
    <span class="title-line highlight">Future</span>
    <span class="title-line">Together</span>
</h1>
<p class="hero-description">
    Welcome to my digital space where innovation meets creativity...  <!-- Your description -->
</p>
```

#### About Section
```html
<h3>Hello, I'm Your Name</h3>  <!-- Your name -->
<p>I'm a passionate creator and innovator...</p>  <!-- Your story -->
```

#### Contact Information
```html
<span>your.email@example.com</span>  <!-- Your email -->
<span>+1 (555) 123-4567</span>      <!-- Your phone -->
<span>Your City, Country</span>      <!-- Your location -->
```

### Projects Section

Replace the project cards with your own projects:

```html
<div class="project-card">
    <div class="project-image">
        <div class="project-placeholder">
            <i class="fas fa-laptop-code"></i>  <!-- Change icon -->
        </div>
    </div>
    <div class="project-content">
        <h3>Project One</h3>  <!-- Project name -->
        <p>A modern web application...</p>  <!-- Project description -->
        <div class="project-tech">
            <span class="tech-tag">React</span>  <!-- Technologies used -->
            <span class="tech-tag">Node.js</span>
            <span class="tech-tag">MongoDB</span>
        </div>
        <a href="#" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>
    </div>
</div>
```

### Skills Section

Update the skills in the about section:

```html
<div class="skills">
    <div class="skill-item">
        <i class="fas fa-code"></i>  <!-- Change icon -->
        <span>Web Development</span>  <!-- Your skill -->
    </div>
    <!-- Add more skills as needed -->
</div>
```

### Social Links

Update the social media links in the contact section:

```html
<div class="social-links">
    <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>  <!-- Your LinkedIn -->
    <a href="#" class="social-link"><i class="fab fa-github"></i></a>    <!-- Your GitHub -->
    <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>   <!-- Your Twitter -->
    <a href="#" class="social-link"><i class="fab fa-instagram"></i></a> <!-- Your Instagram -->
</div>
```

## Color Customization

The website uses a consistent color scheme. To change colors, edit the CSS variables in `styles.css`:

### Primary Colors
- **Primary Blue**: `#64ffda` (used for highlights and accents)
- **Secondary Blue**: `#00d4ff` (used for gradients)
- **Background Dark**: `#0f0f23` (main background)
- **Background Medium**: `#1a1a2e` (section backgrounds)
- **Background Light**: `#16213e` (alternating sections)
- **Text Light**: `#e6f1ff` (main text)
- **Text Medium**: `#a8b2d1` (secondary text)

### Example Color Change
To change the primary accent color from teal to purple:

```css
/* Replace all instances of #64ffda with your new color */
.highlight {
    background: linear-gradient(45deg, #8b5cf6, #a855f7);  /* Purple gradient */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

## Adding Your Own Images

### Profile Image
Replace the placeholder avatar in the about section:

```html
<div class="profile-image">
    <img src="path/to/your/image.jpg" alt="Your Name" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover;">
</div>
```

### Project Images
Replace the project placeholders:

```html
<div class="project-image">
    <img src="path/to/project-image.jpg" alt="Project Name" style="width: 100%; height: 200px; object-fit: cover;">
</div>
```

## Deployment

### GitHub Pages
1. Upload files to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch and folder
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop the project folder to [Netlify](https://netlify.com)
2. Your site will be deployed automatically

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This template is free to use for personal and commercial projects. Feel free to modify and customize as needed.

## Credits

- **Design Inspiration**: Igloo Inc. website
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)
- **Animations**: Custom CSS and JavaScript

## Support

If you need help customizing this template, feel free to:
- Check the code comments for guidance
- Modify the CSS variables for easy color changes
- Add your own content following the existing structure

---

**Happy coding!** 🚀

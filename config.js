// Personal Website Configuration
// Edit these values to customize your website

const CONFIG = {
    // Personal Information
    personal: {
        name: "Your Name",
        title: "Creative Developer",
        email: "your.email@example.com",
        phone: "+1 (555) 123-4567",
        location: "Your City, Country",
        description: "Welcome to my digital space where innovation meets creativity. I'm passionate about creating meaningful experiences and pushing the boundaries of what's possible."
    },

    // Hero Section
    hero: {
        title: {
            line1: "Building the",
            line2: "Future",
            line3: "Together"
        },
        buttons: {
            primary: {
                text: "View My Work",
                link: "#projects"
            },
            secondary: {
                text: "Get In Touch",
                link: "#contact"
            }
        }
    },

    // About Section
    about: {
        story: [
            "I'm a passionate creator and innovator with a deep love for technology and design. My journey has been shaped by curiosity, creativity, and a relentless pursuit of excellence.",
            "With expertise in modern web technologies and a keen eye for design, I specialize in creating digital experiences that not only look beautiful but also solve real-world problems."
        ],
        skills: [
            { icon: "fas fa-code", name: "Web Development" },
            { icon: "fas fa-palette", name: "UI/UX Design" },
            { icon: "fas fa-mobile-alt", name: "Mobile Apps" },
            { icon: "fas fa-rocket", name: "Innovation" },
            { icon: "fas fa-database", name: "Backend Development" },
            { icon: "fas fa-cloud", name: "Cloud Computing" }
        ]
    },

    // Projects Section
    projects: [
        {
            title: "Project One",
            description: "A modern web application built with cutting-edge technologies.",
            technologies: ["React", "Node.js", "MongoDB"],
            icon: "fas fa-laptop-code",
            link: "#",
            image: null // Add image path if you have one
        },
        {
            title: "Project Two",
            description: "An innovative mobile app that revolutionizes user experience.",
            technologies: ["React Native", "Firebase", "TypeScript"],
            icon: "fas fa-mobile-alt",
            link: "#",
            image: null
        },
        {
            title: "Project Three",
            description: "A creative design system that brings brands to life.",
            technologies: ["Figma", "CSS", "JavaScript"],
            icon: "fas fa-paint-brush",
            link: "#",
            image: null
        }
    ],

    // Social Links
    social: [
        { platform: "LinkedIn", icon: "fab fa-linkedin", url: "#" },
        { platform: "GitHub", icon: "fab fa-github", url: "#" },
        { platform: "Twitter", icon: "fab fa-twitter", url: "#" },
        { platform: "Instagram", icon: "fab fa-instagram", url: "#" }
    ],

    // Color Scheme
    colors: {
        primary: "#64ffda",
        secondary: "#00d4ff",
        background: {
            dark: "#0f0f23",
            medium: "#1a1a2e",
            light: "#16213e"
        },
        text: {
            light: "#e6f1ff",
            medium: "#a8b2d1"
        }
    },

    // Animation Settings
    animations: {
        enableParallax: true,
        enableParticles: true,
        enableTyping: true,
        enableScrollProgress: true
    },

    // Contact Form
    contact: {
        enableForm: true,
        formAction: "#", // Replace with your form handler
        successMessage: "Thank you for your message! I'll get back to you soon.",
        errorMessage: "Please fill in all fields."
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

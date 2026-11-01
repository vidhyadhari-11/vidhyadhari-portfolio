// ============================================================
// portfolioData.js — ALL content for the portfolio lives here.
// Components only read from this file.
// ============================================================

export const personalInfo = {
  name: "vidhyadhari",
  brandName: "vidhyadhari",
  role: "Java Full Stack Developer",
  city: "Bengaluru, India",
  timezone: "Asia/Kolkata", // IANA timezone used by the live clock in the HUD
  email: "anasanividhyadhari77@gmail.com",
  phone: "",
  availability: "Open to internships & full-time roles",
};

export const academy = {
  name: "TAP Academy",
  url: "https://thetapacademy.com/",
};

export const socialLinks = {
  github: "https://github.com/vidhyadhari-11",
  linkedin: "https://www.linkedin.com/in/vidhyadhari",
  instagram: "",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const heroContent = {
  eyebrow: "PORTFOLIO — 2026",
  intro: "I build responsive web applications and full-stack solutions using Java, React, and modern technologies.",
  statusLines: [
    "Building with Java & React",
    "Exploring AI technologies",
    "Developing real-world projects",
  ],
  ctaPrimary: { label: "View projects", href: "#projects" },
  ctaSecondary: { label: "Get in touch", href: "#contact" },
};

export const aboutContent = {
  label: "01 / About",
  heading: "Building robust Java & full-stack applications.",
  paragraph:
    "I'm a Computer Science graduate from Sri Venkateswara University, 2026 batch. I have a good understanding of Java, SQL, OOP concepts, and web technologies, and I have worked on full-stack projects through my academic and internship experience. Currently, I'm sharpening my skills through the placement training program at TAP Academy, and I'm passionate about learning new technologies and building real-world applications.",
  stats: [
    { value: 100, suffix: "+", label: "DSA problems solved" },
    { value: 1, suffix: "", label: "Internship completed" },
    { value: 8.90, suffix: "", label: "CGPA achieved" },
  ],
};

export const skillGroups = [
  {
    title: "Languages & Core",
    items: ["Java", "Python", "C++", "Data Structures", "Algorithms", "OOP"],
  },
  {
    title: "Web Technologies",
    items: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"],
  },
  {
    title: "Databases & Backend",
    items: ["MySQL", "Node.js", "Express.js", "JDBC", "Servlets"],
  },
  {
    title: "Tools & Platforms",
    items: ["GitHub", "Git", "Eclipse", "VS Code", "ChatGPT"],
  },
];

export const projects = [
  {
    id: "project-1",
    number: "01",
    title: "QuickBlog – Blogging Platform",
    description:
      "Full-stack blogging application for creating, publishing, editing, and managing blog posts with secure JWT authentication.",
    tags: ["React", "Node.js", "MongoDB"],
    year: "2026",
    liveUrl: "https://quickblog-neon.vercel.app/",
    githubUrl: "https://github.com/vidhyadhari-11/quickblog",
  },
  {
    id: "project-2",
    number: "02",
    title: "VisionConnect – AI-Based Accessibility Platform",
    description:
      "Accessibility platform for visually impaired users featuring real-time volunteer matching, automated request handling, and secure admin management.",
    tags: ["React", "Node.js", "Web Speech API"],
    year: "2026",
    liveUrl: "https://visually-impaired-connect-project.vercel.app/",
    githubUrl: "https://github.com/vidhyadhari-11/visually-impaired-connect--project",
  },
  {
    id: "project-3",
    number: "03",
    title: "Interactive Weather Application",
    description:
      "Responsive weather application providing real-time, location-based weather updates using geolocation.",
    tags: ["JavaScript", "HTML5 / CSS3", "OpenWeatherMap API"],
    year: "2025",
    liveUrl: "https://vidhyadhari-11.github.io/weather-app/",
    githubUrl: "https://github.com/vidhyadhari-11/weather-app",
  },
];

export const experience = [
  {
    period: "Jul 2026 — Present",
    role: "Java Full Stack Development Intern",
    org: "TAP Academy",
    description:
      "Learning Core Java, OOP, JDBC, Servlets, JSP, MySQL and full-stack development.",
  },
  {
    period: "Feb 2026 — Apr 2026",
    role: "Full Stack Developer Intern",
    org: "Infosys Springboard",
    description:
      "Developed a Tax and Finance Management application using the MERN stack.",
  },
  {
    period: "2022 — 2026",
    role: "B.Tech Computer Science and Engineering",
    org: "Sri Venkateswara University",
    description:
      "Graduated with 8.90 CGPA with strong foundations in Java, SQL, and data structures.",
  },
];

export const contactContent = {
  label: "04 / Contact",
  heading: "Let's build something.",
  note: "Have a role, a project or a question? Send a message — I reply within a day.",
};

export const footerContent = {
  tagline: "Designed & built by hand.",
};

// EmailJS — values come from .env.local (variables must start with VITE_)
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};

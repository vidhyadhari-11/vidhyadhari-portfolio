export const academy = {
  name: "TAP Academy",
  url: "https://thetapacademy.com/",
}

export const personalInfo = {
  name: "Vidhyadhari",
  title: "Full-Stack Developer & Creative Technologist",
  subtitle: "Specializing in React, Node.js, AI integrations, and augmented reality experiences.",
  location: "Bangalore, India",
  status: "OPEN FOR OPPORTUNITIES",
  bio: [
    "Passionate software engineer trained at TAP Academy, with expertise in modern full-stack web development, immersive UI design, and scalable architectures.",
    "I craft responsive, high-performance web applications with a strong focus on technical precision, interactive animations, and intuitive user experiences.",
    "Currently exploring 3D interactive graphics, augmented reality web experiences, and intelligent agentic workflows."
  ],
  socials: {
    github: "https://github.com/vidhyadhari",
    linkedin: "https://linkedin.com/in/vidhyadhari",
    email: "anasanividhyadhari77@gmail.com",
  },
}

export const navLinks = [
  { id: "home", label: "01 // HOME" },
  { id: "about", label: "02 // ABOUT" },
  { id: "projects", label: "03 // PROJECTS" },
  { id: "journey", label: "04 // JOURNEY" },
  { id: "contact", label: "05 // CONTACT" },
]

export const skillCategories = [
  {
    category: "FRONTEND CORE",
    skills: ["React 19", "JavaScript (ES6+)", "Tailwind CSS v4", "HTML5 / Canvas", "Three.js", "GSAP / Framer"],
  },
  {
    category: "BACKEND & DATA",
    skills: ["Node.js", "Express", "RESTful APIs", "MongoDB", "PostgreSQL", "Git / GitHub"],
  },
  {
    category: "SPECIALIZATIONS",
    skills: ["Augmented Reality Web", "AI-Powered Interfaces", "Performance Optimization", "Creative UI/UX Architecture"],
  },
]

export const projects = [
  {
    id: "project-1",
    index: "01",
    title: "NeuroHUD Interface",
    tagline: "Real-time AI telemetry & interactive sensor dashboard",
    description:
      "A high-frequency diagnostic heads-up display dashboard visualizing real-time hardware telemetry and neural network metrics using WebGL and GSAP.",
    tags: ["React", "Three.js", "Tailwind CSS", "GSAP", "WebSockets"],
    liveUrl: "https://example.com/project-1",
    repoUrl: "https://github.com/vidhyadhari/neuro-hud",
    image: "project-1.png",
  },
  {
    id: "project-2",
    index: "02",
    title: "Aetheria AR Web Engine",
    tagline: "Markerless web-based augmented reality product showcase",
    description:
      "Lightweight in-browser AR viewer designed during TAP Academy placement training for zero-download 3D model visualization and spatial interaction.",
    tags: ["Three.js", "WebXR", "JavaScript", "GLTF Pipeline"],
    liveUrl: "https://example.com/project-2",
    repoUrl: "https://github.com/vidhyadhari/aetheria-ar",
    image: "project-2.png",
  },
  {
    id: "project-3",
    index: "03",
    title: "OmniCart Commerce Platform",
    tagline: "Scalable full-stack e-commerce engine with real-time inventory",
    description:
      "Modern full-stack shopping architecture featuring secure checkout, dynamic catalog filtering, webhook processing, and sub-100ms API response times.",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://example.com/project-3",
    repoUrl: "https://github.com/vidhyadhari/omnicart-store",
    image: "project-3.png",
  },
  {
    id: "project-4",
    index: "04",
    title: "PulseSync Cloud Workspace",
    tagline: "Collaborative developer workspace with live operational state",
    description:
      "Multiplayer developer workbench offering live collaborative coding rooms, instant terminal replay, and low-latency cloud state synchronization.",
    tags: ["React", "Node.js", "WebRTC", "Socket.io", "Tailwind CSS"],
    liveUrl: "https://example.com/project-4",
    repoUrl: "https://github.com/vidhyadhari/pulsesync",
    image: "project-4.png",
  },
]

export const journey = [
  {
    period: "2024 — PRESENT",
    role: "Placement Training & Full-Stack Specialization",
    organization: "TAP Academy",
    location: "Bangalore, India",
    description:
      "Undergoing rigorous hands-on software development training in modern full-stack web engineering, data structures, algorithms, and immersive technologies (AI and augmented reality).",
    highlights: ["Full-Stack MERN Architecture", "Core Java & DSA Foundations", "Augmented Reality & Web3D Workshops"],
  },
  {
    period: "2020 — 2024",
    role: "Bachelor of Technology in Computer Science & Engineering",
    organization: "University Engineering Institute",
    location: "India",
    description:
      "Completed undergraduate engineering with strong foundations in software design, computer networking, relational database systems, and object-oriented programming.",
    highlights: ["Academic Excellence Merit", "Technical Lead in University Coding Guild", "Capstone Project on Real-time Sensor Systems"],
  },
]

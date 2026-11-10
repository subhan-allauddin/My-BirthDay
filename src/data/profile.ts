export interface JourneyItem {
  period: string;
  title: string;
  organization: string;
  location: string;
  type: "Experience" | "Training" | "Education";
  status?: "Completed" | "In Progress" | "Ranked #1";
  description: string;
  highlights?: string[];
  skills: string[];
  color: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  category: "Web Apps" | "Games & UI" | "AI & CV";
  featured?: boolean;
  status?: "Live" | "In Progress" | "CV Showcase";
  github?: string;
  demo?: string;
}

export const PROFILE = {
  fullName: "Abdus Subhan Allauddin",
  shortName: "Abdus Subhan",
  initials: "ASA",
  birthDate: {
    year: 2011,
    month: 7, // July (1-indexed)
    day: 28,
    display: "28 July 2011",
    dayMonth: "28 July",
  },
  role: "Junior Full-Stack & Next.js Developer",
  roles: [
    "Abdus Subhan Allauddin",
    "Next.js & React Developer",
    "Full-Stack Web Builder",
    "AI & RAG Explorer",
  ],
  location: "Scheme 33, Karachi, Pakistan",
  email: "subhanallauddin@gmail.com",
  phone: "+92 3092-358309",
  linkedin: "https://www.linkedin.com/in/abdus-subhan-allauddin-a43127283/",
  github: "https://github.com/subhan-allauddin",
  portfolioUrl: "https://abdus-subhan-sjgt.vercel.app/",
  tagline: "Building clean, responsive & user-friendly web experiences.",
  bio: "Junior Full-Stack / Next.js Developer with hands-on experience building and deploying 5+ web applications using React, Node.js, Prisma, and MongoDB. Passionate about fast, responsive UIs, learning rapidly through documentation, and building modern AI-powered software.",
  stats: {
    projectsCompleted: "8+",
    appsDeployed: "5+",
    clientSatisfaction: "100%",
  },
  education: {
    school: "Chiniot Islamia Public School (CIPS)",
    location: "Karachi, Pakistan",
    grade: "Class X (2027)",
    shortGrade: "Class X",
  },
} as const;

export const JOURNEY_STEPS: JourneyItem[] = [
  {
    period: "2024",
    title: "React Trainee — Ranked #1",
    organization: "Utech Digital Education",
    location: "Pakistan",
    type: "Training",
    status: "Ranked #1",
    description:
      "Earned Ranked #1 certification in Frontend Web Development with React by building modular applications with component-based architecture and clean state lifecycle management.",
    skills: ["React", "JavaScript", "HTML & CSS"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    period: "Jun 2024 – Sep 2024",
    title: "Frontend Developer Intern",
    organization: "Computing Yard",
    location: "Karachi, Pakistan",
    type: "Experience",
    status: "Completed",
    description:
      "Developed 3+ responsive pages with 100% mobile compatibility, debugged 10+ critical frontend issues (including hydration errors and API fetch failures), and integrated REST APIs into Next.js & NoSQL applications.",
    skills: ["Next.js", "React", "Tailwind CSS"],
    color: "from-violet-500 to-purple-500",
  },
  {
    period: "Jun 2026 – Jul 2026",
    title: "AI for Everyone (Generative AI)",
    organization: "Bano Qabil (Alkhidmat Foundation)",
    location: "Karachi, Pakistan",
    type: "Training",
    status: "Completed",
    description:
      "Completed a 2-month Generative AI course focused on prompt engineering, AI-assisted productivity, and responsible AI using the C.O.R.E framework across ChatGPT, Claude, and Gemini.",
    skills: ["Generative AI", "Prompt Engineering", "Responsible AI"],
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    period: "Aug 2026 – Jan 2027",
    title: "Generative AI: LLM Apps, RAG & AI Agents",
    organization: "Bano Qabil (Alkhidmat Foundation)",
    location: "Karachi, Pakistan",
    type: "Training",
    status: "In Progress",
    description:
      "5-month builder-focused program covering LLM APIs (JavaScript & Python), function calling, structured output, embeddings, vector databases, RAG pipelines, and AI agents with a deployed AI capstone.",
    skills: ["LLM APIs", "RAG", "AI Agents"],
    color: "from-emerald-500 to-teal-500",
  },
  {
    period: "Ongoing – 2027",
    title: "Secondary Education — Class X",
    organization: "Chiniot Islamia Public School (CIPS)",
    location: "Karachi, Pakistan",
    type: "Education",
    description:
      "Pursuing Class X academics in Karachi while actively shipping full-stack web apps and exploring modern AI engineering.",
    skills: ["Self-Learning", "Time Management"],
    color: "from-amber-500 to-orange-500",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    title: "Harmoony Academy",
    description:
      "Responsive music academy web application featuring modern motion effects, interactive course cards, and smooth cross-device compatibility.",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "AceternityUI"],
    category: "Web Apps",
    featured: true,
    status: "Live",
    github: "https://github.com/subhan-allauddin/Next-Project-One",
    demo: "https://harmoony-academy.vercel.app/",
  },
  {
    title: "Daraz Store Clone",
    description:
      "Full e-commerce storefront clone with category navigation, product catalogs, interactive cart logic, and multi-page responsive layouts.",
    tags: ["JavaScript", "Bootstrap", "HTML5", "CSS3"],
    category: "Web Apps",
    featured: true,
    status: "Live",
    github: "https://github.com/subhan-allauddin/Daraz-Store-Clone",
    demo: "https://daraz-store-clone.vercel.app/",
  },
  {
    title: "Snake Game",
    description:
      "Classic Vanilla JavaScript arcade game with smooth keyboard controls, collision detection, and real-time score tracking.",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Games & UI",
    status: "Live",
    github: "https://github.com/subhan-allauddin/Snake-games",
    demo: "https://snake-games-xi.vercel.app/",
  },
  {
    title: "Real-Time Chat App",
    description:
      "Real-time two-user chat room engineered with Socket.io for instant bidirectional messaging and live room synchronization.",
    tags: ["Socket.io", "Node.js", "JavaScript"],
    category: "AI & CV",
    status: "CV Showcase",
  },
  {
    title: "AI Capstone Project",
    description:
      "Full-stack generative AI application exploring LLM orchestration, structured output, RAG pipelines, and autonomous agent workflows.",
    tags: ["Generative AI", "React", "Gemini API", "RAG"],
    category: "AI & CV",
    status: "In Progress",
  },
];

import type { Profile, Education, Role, Project, SkillGroup } from '../types';

export const profile: Profile = {
  name: 'Tyler Stageberg',
  tagline: 'CS student at OU. Web, AI, and the occasional hackathon.',
  location: 'Norman, OK',
  email: 'tyler.stageberg@gmail.com',
  linkedin: 'https://www.linkedin.com/in/tyler-stageberg',
  github: 'https://github.com/tylerrstage',
  resumePdf: '/Tyler_Stageberg_Resume.pdf',
};

export const education: Education = {
  school: 'University of Oklahoma',
  location: 'Norman, Oklahoma',
  degree: 'Bachelor of Science in Computer Science',
  gpa: '3.61',
  expected: 'May 2028',
  honors: ["Dean's List"],
  coursework: [
    'Data Structures',
    'Artificial Intelligence',
    'Software Engineering',
    'Principles of Programming Languages',
    'Computer Organization',
    'Discrete Structures',
    'Programming Structures/Abstractions',
  ],
};

export const roles: Role[] = [
  {
    title: 'Software Engineering Intern',
    org: 'Hacklahoma',
    orgType: 'OU Student Organization',
    location: 'Norman, Oklahoma',
    start: 'Feb. 2026',
    end: 'Present',
    bullets: [
      'Resolved login issues for 250+ hackathon participants by fixing authentication error handling across the Express backend and React/TypeScript frontend.',
      'Streamlined hackathon operations for 30+ organizers by designing a mobile-first dashboard that unifies task management, budget tracking, and staff messaging into a single screen.',
      'Built a multi-channel chat interface with swipe navigation, using React portals and a swipe-to-dismiss hook.',
      'Collaborated across a multi-developer team using GitLab merge requests and a documented ticket workflow to ship incremental features.',
    ],
  },
];

export const projects: Project[] = [
  {
    slug: 'gethired',
    code: 'PRJ-01',
    title: 'GetHired',
    summary: 'AI-powered resume review tool that returns a fit score and suggestions.',
    featured: true,
    stack: ['Python', 'OpenAI API', 'React', 'FastAPI', 'scikit-learn'],
    bullets: [
      'Built a FastAPI resume-analysis pipeline, combining formatting checks, keyword-matching, and OpenAI structured outputs into a weighted scoring system.',
      'Shipped a full-stack React/FastAPI app, returning fit-score reports and suggestions in one request.',
      'Developed a custom tokenizer and readability scorer to evaluate resume clarity and wording.',
    ],
    screenshot: '/projects/gethired.png',
    repoUrl: 'https://github.com/tylerrstage/get-hired-ai',
  },
  {
    slug: 'jobsearch',
    code: 'PRJ-02',
    title: 'JobSearch',
    summary: 'Full-stack job board with multi-select filters and real-time city-based search.',
    featured: false,
    stack: ['React', 'Vite', 'Tailwind CSS', 'Firestore', 'Node.js'],
    bullets: [
      'Built a full-stack job board with React and Firebase, featuring multi-select filters and real-time city-based search.',
      'Engineered a Node.js pipeline, normalizing job data and syncing it into Firestore for real-time search.',
      'Designed a responsive two-pane UI with Tailwind CSS, including expandable listings and reusable dropdowns.',
    ],
    screenshot: '/projects/jobsearch.png',
    repoUrl: 'https://github.com/tylerrstage/JobSearch',
  },
  {
    slug: 'ascent',
    code: 'PRJ-03',
    title: 'Ascent',
    summary: 'Skill learning platform built at Hacklahoma 2026.',
    featured: false,
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Docker'],
    bullets: [
      'Built an animated skills dashboard, surfacing real-time friend activity and a live progress-tracking bar.',
      'Implemented JWT-based authentication on the login page, connecting the React frontend to the Express/MongoDB backend for secure user sessions.',
      'Debugged integration issues within a 4-person team, reducing recurring bugs across shared feature branches.',
    ],
    screenshot: '/projects/ascent.png',
    repoUrl: 'https://github.com/Kolby-Schulz/Ascent-SkillTracker',
  },
];

export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'HTML/CSS'] },
  {
    label: 'Frameworks & Libraries',
    items: ['React', 'Express.js', 'FastAPI', 'Vite', 'Tailwind CSS', 'scikit-learn'],
  },
  { label: 'Databases', items: ['MongoDB', 'Firestore'] },
  {
    label: 'Developer Tools & AI',
    items: ['OpenAI API', 'Claude Code', 'Git', 'GitHub', 'GitLab', 'Docker', 'Node.js'],
  },
];

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export const sheets = {
  about: { n: '02', label: 'About', title: 'About', caption: 'Short version.' },
  experience: {
    n: '03',
    label: 'Experience',
    title: 'Experience & Clubs',
    caption: 'Shipping with a team.',
  },
  projects: {
    n: '04',
    label: 'Projects',
    title: 'Projects',
    caption: 'Three builds. Code is public.',
  },
  skills: { n: '05', label: 'Skills', title: 'Skills', caption: 'What I reach for first.' },
  resume: { n: '06', label: 'Resume', title: 'Resume', caption: 'One page. Downloadable.' },
  contact: { n: '07', label: 'Contact', title: 'Contact', caption: 'Email is the fastest way.' },
};

export const hero = {
  status: 'Connected · Norman, OK',
  primaryCta: 'View projects',
  secondaryCta: 'Download resume',
  stats: [
    { value: '250+', label: 'hackathon participants helped with login fixes' },
    { value: '30+', label: 'organizers using the operations dashboard' },
    { value: '3.61', label: 'GPA' },
    { value: '3', label: 'projects, public on GitHub' },
  ],
};


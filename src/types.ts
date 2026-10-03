export interface Profile {
  name: string;
  tagline: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  resumePdf: string;
}
export interface Education {
  school: string;
  location: string;
  degree: string;
  gpa: string;
  expected: string;
  honors: string[];
  coursework: string[];
}
export interface Role {
  title: string;
  org: string;
  orgType: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
}
export interface Project {
  slug: string;
  code: string;
  title: string;
  summary: string;
  featured: boolean;
  stack: string[];
  bullets: string[];
  screenshot: string;
  screenshotAlt?: string;
  /** Pixel size of the screenshot file, so its frame matches it before it loads. */
  screenshotSize?: { width: number; height: number };
  repoUrl: string;
}
export interface SkillGroup {
  label: string;
  items: string[];
}

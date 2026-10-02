# Portfolio Design Doc

Oct 2, 2026 · @Tyler

## Overview and goals

This is a single-page portfolio for Tyler Stageberg that gets a recruiter to the resume and the GetHired repo within a minute, and gives developers code worth reading.

The site is a blueprint-style, Y2K handheld-console world: cobalt line art on textured off-white. It opens with a short water-drop animation, then scrolls through six sections. It deploys free on Vercel under a vercel.app address.

| Decision | Choice |
| --- | --- |
| Audience | Recruiters and developers; Tyler is job-hunting |
| Tagline | CS student at OU. Web, AI, and the occasional hackathon. |
| Tone | Straightforward and professional, with a few touches of personality |
| Theme | Cobalt blueprint on textured off-white, light only |
| Project cards | Boot style, screenshot plus GitHub link, no live demos |
| Flagship project | GetHired |
| Contact | Email, LinkedIn, GitHub (no phone number) |
| Language | English only, no Japanese text |
| Platform | Desktop first, no mobile design work |
| Stack | Vite, React, TypeScript, hosted on Vercel |

## Audience and tone

Write for two readers: a recruiter skimming for fit, and a developer checking the code. Both should find proof within one scroll: the Hacklahoma internship, GetHired, and the GitHub links.

Copy is plain and specific. Use the numbers from the resume (250+ hackathon participants, 30+ organizers, 3.61 GPA) and let short captions carry the personality, the way the reference site does with its status lines.

Caption voice, one per section:

- Hero status chip: "Connected · Norman, OK"
- Projects: "Three builds. Code is public."
- Skills: "What I reach for first."
- Resume: "One page. Downloadable."
- Contact: "Email is the fastest way."

## Visual direction

The look is cobalt line art on textured off-white, using the saturated blue from the first reference image and the dotted paper texture and tiny colored buttons from the second.

**Palette.** Values are starting points; tune them by eye.

| Token | Value | Use |
| --- | --- | --- |
| --paper | #eef0f4 | Page background under the texture |
| --panel | #f9fbff | Cards and system windows |
| --ink | #0e2468 | Body text and heavy outlines |
| --cobalt | #2c6bf2 | Display type, slabs, line art |
| --cyan | #46c6f2 | Arrows, status dots, small highlights (never text on paper) |
| --red, --yellow, --green | #e8574f, #f3b72f, #4fae6a | Tiny console-button accents only |

**Type.** All three are self-hosted through Fontsource.

| Role | Font | Use |
| --- | --- | --- |
| Display | Unbounded 800, uppercase | Name, section titles |
| Utility | DotGothic16 (Latin glyphs only) | Status bar, labels, buttons, chips |
| Body | IBM Plex Sans 400 and 600 | Paragraphs, bullets |

**Texture.** The background stacks three layers: the flat paper color, a fine grain (SVG feTurbulence at about 5% opacity), and a blueprint grid at 28px using cobalt at about 10%. The top of the hero adds a 6px halftone dot field. The hero is two-toned like both references: paper above, a cobalt slab below.

**Motifs.** Use these sparingly and consistently:

- Handheld-console frame around the avatar
- Status bar with a live clock and "Connected"
- System-window dialogs with a dark title bar
- Target rings and hatching stripe bars
- Chevron and arrow icon buttons
- Four tiny red, yellow, green, and blue buttons used as bullet markers
- Sheet labels such as "Sheet 03 / Projects" above each section

**Cursor.** A pixel-art arrow (about 20 by 26 px, white fill, ink outline) with a cyan-filled variant over links and buttons. It is set only with the CSS `cursor` property, so speed and sensitivity are untouched. No trailing, smoothing, or lag effects.

## Opening animation

A water drop falls onto a glossy blue surface, ripples spread, and the ripples resolve into the name TYLER STAGEBERG, all in about 1.9 seconds. Only the name appears. The intro has no background of its own: it plays on the real page background, which it draws in and leaves behind.

1. **0.0 to 0.5 s:** The page's paper and grain, with no grid yet. A cobalt drop falls from top center and stretches slightly as it speeds up.
2. **0.5 s:** The drop hits a thin glossy line at about 60% of the screen height. A mirrored, slightly blurred reflection flashes below the line.
3. **0.5 to 1.3 s:** Three concentric elliptical rings expand along the surface and fade, each with a faint cyan edge.
4. **1.1 to 1.7 s:** The page's own blueprint grid draws in from the center and stays, and the name appears in the display font, as if developed from the ripple.
5. **1.9 to 3.0 s:** The intro's drawings fade out while the page content enters. The name's letters fly from the intro's single centered line to their places in the two-line hero name, one after another (0.8 s each, 25 ms apart). If the intro is skipped, the hero name uses the regular entrance instead.

**Page entrance.** At the handoff the navbar slides down and the hero pieces rise in with a short stagger (status chip, name, tagline, slab, buttons, stats, avatar), followed by the sections. The same entrance plays on loads where the intro is skipped for the session; under reduced motion everything is simply shown.

**Rules**

- Plays once per browser session, tracked with a sessionStorage flag inside try/catch.
- Any click, key press, or scroll skips it immediately.
- Skipped entirely when the visitor prefers reduced motion.
- The page behind it is fully rendered in the DOM; it is only visually held back until the handoff.
- The overlay is aria-hidden and removed from the DOM when it ends.
- Built with SVG and CSS keyframes (Canvas 2D only if the ripples need it). No animation library.

## Site map and navigation

The site is one long page with a sticky top bar that scrolls to each section. Scrolling stays native: no scroll hijacking and no changed scroll speed.

Sections in page order:

1. **Hero** (`#top`): name, tagline, avatar, two buttons (View projects, Download resume), and a stat strip.
2. **About** (`#about`): short bio and the education card.
3. **Experience & Clubs** (`#experience`): the Hacklahoma entry.
4. **Projects** (`#projects`): Boot cards for GetHired, JobSearch, and Ascent.
5. **Skills** (`#skills`): four grouped panels.
6. **Resume** (`#resume`): on-page rendered resume with a PDF download.
7. **Contact** (`#contact`): email, LinkedIn, GitHub.

**Navbar.** The left side holds the "Tyler Stageberg" wordmark. The links are About, Experience, Projects, Skills, Resume, and Contact. The right side shows the live clock and "Connected". The active link highlights as the visitor scrolls, using an IntersectionObserver. Links are real anchors (`href="#projects"`), smooth scrolling comes from CSS `scroll-behavior` (off under reduced motion), and each section has a `scroll-margin-top` equal to the navbar height. The bar sticks to the top with a solid paper background and a 1.5px cobalt bottom border.

## Section specs

Each section sits on a "sheet" with a label (for example "Sheet 04 / Projects"), a display-font title, a one-line caption, and dashed blueprint corner marks. All copy comes from the content module, never from the components.

### Hero

The hero is two-toned. The top half is paper with a halftone dot field and the name TYLER STAGEBERG set huge in cobalt over two lines, with the tagline beneath it. The bottom half is a cobalt slab holding the avatar in a console frame on the right, and on the left two buttons (View projects as the primary, Download resume as the ghost) plus the stat strip.

Stat strip, all from the resume:

- 250+ hackathon participants helped with login fixes
- 30+ organizers using the operations dashboard
- 3.61 GPA
- 3 projects, public on GitHub

### About

Draft copy, edit freely: "I'm a computer science student at the University of Oklahoma, expected to graduate in May 2028. I build full-stack web apps and AI-powered tools. At Hacklahoma I work on a multi-developer team using GitLab merge requests and a documented ticket workflow."

Beside the copy, an education card shows University of Oklahoma, Norman, Oklahoma; B.S. in Computer Science; GPA 3.61; expected May 2028; Dean's List; and the seven coursework items as chips.

### Experience & Clubs

One entry only: Software Engineering Intern at Hacklahoma (OU Student Organization), Norman, Oklahoma, Feb. 2026 to present, with the four bullets from the resume. Ascent does not appear here; it lives only under Projects.

### Projects

Boot cards in this order: GetHired (featured, full width), JobSearch, Ascent. Each has a screenshot and a GitHub link, with no live demo. See Components for the card spec.

### Skills

Four console-cartridge panels matching the resume: Languages; Frameworks and Libraries; Databases; Developer Tools and AI. Each holds non-interactive chips. Caption: "What I reach for first."

### Resume

An on-page resume rendered from the same content data, so it never drifts from the cards. It is styled as a paper sheet inside a system window. A Download PDF button links to `/Tyler_Stageberg_Resume.pdf`, the phone-free resume Tyler attached. Caption: "One page. Downloadable."

### Contact

Three rows: Email (address shown as selectable text, a `mailto:` link, and a Copy button), LinkedIn, and GitHub. No phone number and no contact form. Caption: "Email is the fastest way."

| Channel | Value |
| --- | --- |
| Email | tyler.stageberg@gmail.com |
| LinkedIn | linkedin.com/in/tyler-stageberg |
| GitHub | github.com/tylerrstage |

## Components

The Boot project card is the centerpiece; the rest are supporting pieces. The card behavior matches the [Blueprint Card Lab prototype](https://claude.ai/artifact/Vb5WikPVg9ya372roZnYnb) (Boot mode), which is a visual reference only and is not needed to build the site.

### Boot project card

Until it is 25% in view, a card shows as a faded wireframe. Then a boot panel covers it, three lines type out, a progress bar fills over about 0.8 seconds, and the card content appears.

- **Boot lines:** `> mount PRJ-01`, `> read sector 2F ... ok`, `> render card ...`
- **Anatomy, top to bottom:** blue strip (project code and status), screenshot slot at 16:10, title, one-line summary, stack chips, three bullets, a GitHub button, and a Reboot button that replays the boot.
- **Screenshot slot:** a blueprint frame that shows "Screenshot pending" until an image exists at `public/projects/<slug>.png`.
- **GetHired** is first and featured: wider than the others, with a Featured tag in the strip.
- **Reduced motion:** content shows instantly and no typing plays.
- **Screen readers:** the full content is in the DOM from page load. Only its visual staging is animated.
- **Plays once per card** per page load; Reboot replays it on demand.

### Avatar

A generic blueprint-style profile picture: an inline SVG head-and-shoulders bust in cobalt line art with hatched shading and no facial likeness. It sits inside a handheld-console frame with a small "Connected" status bar and four tiny red, yellow, green, and blue buttons. The component accepts an optional `photoSrc` prop so a real photo can replace the drawing later.

### Section frame

A reusable wrapper that renders the sheet label, display title, caption, dashed corner marks, and the `id` used by the navbar. Every section uses it, so spacing and anchors stay consistent.

### Resume viewer

Renders the resume from `content.ts` as a paper sheet with the Education, Relevant Experience, Projects, and Technical Skills headings in the same order as the PDF. The Download PDF button sits in the system-window title bar.

### Stat strip and chips

The stat strip shows four numbers in the display font with utility-font labels. Chips are small bordered labels with a 1px cobalt outline and are not interactive.

## Content model

All site copy lives in two files, `src/types.ts` and `src/data/content.ts`, filled with the facts from Tyler's current resume. Repo URLs are marked TODO because the exact repository names were not provided.

```ts
// src/types.ts
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
  repoUrl: string;
}
export interface SkillGroup {
  label: string;
  items: string[];
}
```

```ts
// src/data/content.ts
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
    repoUrl: 'https://github.com/tylerrstage', // TODO: exact repo URL
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
    repoUrl: 'https://github.com/tylerrstage', // TODO: exact repo URL
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
    repoUrl: 'https://github.com/tylerrstage', // TODO: exact repo URL
  },
];

export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'HTML/CSS'] },
  { label: 'Frameworks & Libraries', items: ['React', 'Express.js', 'FastAPI', 'Vite', 'Tailwind CSS', 'scikit-learn'] },
  { label: 'Databases', items: ['MongoDB', 'Firestore'] },
  { label: 'Developer Tools & AI', items: ['OpenAI API', 'Claude Code', 'Git', 'GitHub', 'GitLab', 'Docker', 'Node.js'] },
];
```

## Tech stack and structure

The site is a static Vite, React, and TypeScript app with hand-written CSS, deployed from GitHub to Vercel.

| Area | Choice | Reason |
| --- | --- | --- |
| Build | Vite, React, TypeScript (strict) | Fast static build, matches the resume |
| Styling | CSS custom properties and CSS Modules, no UI kit | The blueprint theme is bespoke; tokens live in one file |
| Fonts | @fontsource packages: Unbounded, DotGothic16, IBM Plex Sans | Self-hosted, no layout shift |
| Motion | CSS keyframes and IntersectionObserver, no animation library | Small bundle, full control |
| Routing | None; one page with hash anchors | Single scrolling page |
| Hosting | Vercel static deploy, auto-deploy from GitHub `main` | Free tier, vercel.app address |
| Code quality | ESLint, Prettier, `tsc --noEmit` | Catches errors before deploy |

Proposed file layout:

```text
src/
  main.tsx
  App.tsx
  types.ts
  data/content.ts
  styles/tokens.css          # palette, type scale, spacing
  styles/global.css          # reset, cursor, scroll behavior
  styles/texture.css         # paper grain, grid, halftone
  hooks/useInView.ts
  hooks/useActiveSection.ts
  hooks/useReducedMotion.ts
  components/
    DropIntro/               # water-drop opening animation
    StatusBar/               # clock and Connected chip
    Navbar/
    SectionFrame/
    Hero/
    Avatar/
    About/
    Experience/
    ProjectCard/             # Boot card
    Skills/
    ResumeView/
    Contact/
public/
  Tyler_Stageberg_Resume.pdf
  projects/                  # gethired.png, jobsearch.png, ascent.png
  favicon.svg
DESIGN.md                    # this doc, exported as Markdown
```

## Accessibility and performance

The site must be fully usable by keyboard and screen reader, and it should load fast on a desktop connection. The numbers below are targets, not guarantees.

**Accessibility**

- Body text contrast of at least 4.5:1 (ink on paper). Cyan is never used for text on paper.
- A visible focus ring (2px ink, 3px offset) on every link and button.
- Landmarks: header, nav, main, footer, plus a skip-to-content link.
- The active navbar link carries `aria-current="location"`.
- The intro overlay is `aria-hidden`, skippable by click, key, or scroll, and skipped under reduced motion.
- Boot cards keep their full content in the DOM, so screen readers never wait on the animation.
- Every screenshot has descriptive alt text.

**Performance targets**

- Lighthouse on desktop: 95+ performance, 100 accessibility, 100 best practices.
- Largest Contentful Paint under 2.0 s and layout shift under 0.05.
- JavaScript under 150 KB gzipped; fonts subset to Latin and preloaded.
- Screenshots as WebP with explicit width and height, lazy-loaded below the fold.
- Texture built from CSS and SVG, with no large image files.

## Milestones

Build in seven steps, with a review pause after step 3 so you can judge the look before the remaining sections are built.

1. **Scaffold.** Vite, React, and TypeScript project; tokens, fonts, texture, cursor, and `content.ts`; an empty page deployed to Vercel to confirm the pipeline.
2. **Layout shell.** Status bar, sticky navbar with active-section highlighting, section frames, and the hero with the generic blueprint avatar.
3. **Project cards.** Boot cards for GetHired, JobSearch, and Ascent with screenshot slots. **Review pause.**
4. **Remaining sections.** About, Experience & Clubs, Skills, Resume viewer with PDF download, and Contact.
5. **Opening animation.** The water-drop intro with skip, once-per-session, and reduced-motion handling.
6. **Polish.** Accessibility audit, Lighthouse pass, desktop layout checks, favicon, and social preview image.
7. **Fill and launch.** Add the three screenshots, exact GitHub repo URLs, and the resume PDF; deploy to production on Vercel.

**Needed from Tyler:** three screenshots (GetHired, JobSearch, Ascent), the exact GitHub repo URLs, and the resume PDF at `public/Tyler_Stageberg_Resume.pdf`.

## Claude Code kickoff prompt

Export this doc as Markdown and save it as `DESIGN.md` in a new, empty repo, then paste the prompt below into a fresh Claude Code session started in that folder.

```text
You are building my portfolio website. Read DESIGN.md in the repo root first; it is the full design doc and the source of truth. If anything in this prompt conflicts with DESIGN.md, follow DESIGN.md and tell me.

Project: a single-page portfolio for Tyler Stageberg (CS student at OU). Stack: Vite + React + TypeScript (strict), CSS custom properties + CSS Modules, no UI kit, no animation library. It deploys to Vercel as a static site.

Theme: cobalt blueprint line art on a textured off-white background, with Y2K handheld-console motifs (status bar, system windows, target rings, hatching stripes). English only. No Japanese text anywhere. Do not include a phone number anywhere.

Rules:
- Put all content in src/data/content.ts using the types in DESIGN.md. Components never hard-code copy.
- The cursor is a custom pixel arrow set only with the CSS cursor property. Never move or smooth the cursor with JavaScript, and never change scroll speed or hijack scrolling.
- Respect prefers-reduced-motion (skip the intro, show Boot cards instantly).
- Keep any sessionStorage or localStorage use optional and inside try/catch.
- Use only the resume facts in DESIGN.md. Do not invent metrics, dates, or links. Where a value is missing (repo URLs, screenshots), leave a clearly marked TODO and a visible placeholder.
- Ascent appears only under Projects, never under Experience & Clubs.

Before writing code, give me a short plan: the file tree, any assumptions you are making, and anything you need from me (screenshots, exact repo URLs, the resume PDF at public/Tyler_Stageberg_Resume.pdf). Then work in this order and stop after step 3 so I can review in the browser (run the dev server and tell me the URL):
1. Scaffold the project, tokens, fonts, texture, cursor, and content.ts.
2. Build the layout shell: status bar, sticky navbar with active-section highlighting, section frames, and the hero with the generic blueprint avatar.
3. Build the Boot project cards for GetHired (featured), JobSearch, and Ascent with screenshot slots.

After I review, continue with About, Experience & Clubs, Skills, Resume, Contact, the water-drop intro, accessibility and performance polish, and the Vercel deploy.
```

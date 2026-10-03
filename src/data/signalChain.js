// Rebuilt from the Sept 9 Signal Chain notes. The Mac branch was never pushed.
// Evidence rules live in scripts/home-data.test.js.

import portfolioData from "./portfolioData.js";

const designTitles = [
  "Electronic Arts",
  "Citi",
  "BCBS",
  "VSI",
  "Joe Parker Guitars",
  "Decision Tree Logo",
  "BizAtomic Logo",
];

export const dellClaim =
  "I took Dell's configurator from its slowest page to its fastest, 10 seconds down to 2. Same page, same content, and it converted 30% better.";

const signalChain = {
  name: "Michael Garrett Jones",
  theme: "Signal Chain",
  hero: {
    id: "the-bet",
    intro:
      "I'm Michael Garrett Jones: print designer, web designer, elite coder, enterprise architect, and Apress author of Pro HTML5 Performance.",
    h1: "Interface craft. Systems architecture. Applied AI.",
    cta: { label: "See the work", href: "#engineering" },
  },
  nav: [
    { id: "ai-systems", label: "AI systems" },
    { id: "engineering", label: "Engineering" },
    { id: "projects", label: "Projects" },
    { id: "design", label: "Design" },
    { id: "contact", label: "Contact" },
  ],
  aiSystems: {
    id: "ai-systems",
    kicker: "Current craft",
    title: "AI that does a job, not a demo.",
    lede: "I don't bolt a chat box onto a product and call it AI. I build the whole loop: what the model can see, what it's allowed to do, and how you know it got it right.",
    points: [
      "A Slack app at Scale Computing that answers questions from years of the company's own conversations.",
      "An agentic loop that writes unit tests, runs them, and keeps going until they pass.",
      "4everFinder, which helps match shelter dogs with adopters and gets better from feedback.",
      "LLM apps I've shipped on iOS, Apple Watch, and macOS, plus coding harnesses in Cursor and Claude Code with persistent memory, so agents build on what they learned last time.",
    ],
    posts: [
      {
        date: "Aug 19, 2026",
        title: "Most of the agents I run go to sleep when I do.",
        excerpt:
          "Cursor, Claude Code, OpenClaw. Strong in a session. Gone once the laptop lid closes. A prompt is a request. A bot with its own machine is a handoff.",
        href: "https://www.linkedin.com/posts/michaelgarrettjones_llm-aiengineering-agents-activity-7495650270413074432-Ouum",
        img: "/imgs/linkedin/agents-sleep.jpg",
      },
      {
        date: "Jul 13, 2026",
        title: "Claude Code hooks aren't really a flat list of events.",
        excerpt:
          "They're intervention points in an agent loop. Start with the question you're trying to answer, then pick the hook that answers it.",
        href: "https://www.linkedin.com/posts/michaelgarrettjones_claudecode-aiengineering-activity-7482496847035650051-uubl",
        img: "/imgs/linkedin/hooks-lifecycle.jpg",
      },
      {
        date: "Jul 6, 2026",
        title:
          "A rule tells your coding agent what it should do. A hook makes sure it actually happens.",
        excerpt: "Prompts for judgment. Hooks for guarantees.",
        href: "https://www.linkedin.com/posts/michaelgarrettjones_agenticcoding-llm-aiengineering-activity-7479898069870829569-1L1w",
        img: "/imgs/linkedin/rules-and-hooks.jpg",
      },
      {
        date: "Jun 3, 2026",
        title:
          "Your coding agent gets much better when it stops relying on chat history alone.",
        excerpt:
          "A memory bank on disk. The agent reads the right file at the right phase instead of dragging the whole history into every request.",
        href: "https://www.linkedin.com/posts/michaelgarrettjones_aiengineering-cursor-llmtools-activity-7468057409597394944-eQzo",
        img: "/imgs/linkedin/memory-bank.jpg",
      },
    ],
  },
  engineering: {
    id: "engineering",
    kicker: "Cases",
    title: "The work, with the numbers.",
  },
  dell: {
    id: "dell-path",
    kicker: "Dell",
    title: "Dell's slowest page became its fastest.",
    claim: dellClaim,
    body: "The configurator was slow enough that Michael Dell made fixing it a company priority. I led the tiger team and the architecture. We tested it like-for-like, with the same look and content and only the speed changed, so the lift was down to speed alone. Then I rolled the same architecture through home, product, and cart as micro frontends, with the first launch shipping in under a month. The proof of concept I designed along the way pushed Dell's brand from budget toward premium.",
    viewerHint:
      "These are the original builds, running live. Scroll inside the frame to explore.",
    demos: [
      {
        id: "concept",
        title: "XPS concept",
        caption:
          "The proof of concept that got leadership to fund premium branding.",
        desktop: "/dell/xps/",
        mobile: "/dell/xpsMobile/",
      },
      {
        id: "xps",
        title: "XPS landing",
        caption:
          "Designed by Dell's design team after the concept, built on the same architecture.",
        desktop: "/dell/franchise/",
      },
      {
        id: "home-poc",
        title: "Home concept",
        caption:
          "The home-page proof of concept that shaped the shipped redesign.",
        desktop: "/dell/home/",
      },
      {
        id: "home",
        title: "Shipped home",
        caption: "The home page as it shipped globally, shown as a screenshot.",
        img: "/imgs/port/home-dell.jpg",
        alt: "Dell home page desktop shot",
      },
    ],
  },
  rentpath: {
    id: "rentpath",
    kicker: "RentPath",
    title: "Stop sending the browser a job.",
    scoreLabel: "Lighthouse 41→98",
    before: "41",
    after: "98",
    body: "Rent.com was a client-side React app, which means every visitor's browser got a template and a pile of data and had to build the page itself. That took 5–6 seconds. I moved it to Next.js server rendering so the browser gets finished HTML and only does the work that has to happen there. Search rankings, responsiveness, and engagement all went up.",
    img: "/imgs/rentpath.jpg",
    alt: "Rent.com apartment search with listings beside a map",
  },
  scale: {
    id: "scale",
    kicker: "Scale Computing",
    title: "Pulling a live UI out of a C++ monolith.",
    body: "HyperCore runs virtual machines in places where downtime isn't an option. I led its front-end architecture, pulled the UI and Node.js services out of a C++ monolith, rebuilt it in Vue and Vuex with live VM state over sockets, and built the shared component library the rest of the team works from. I also rebuilt the test pipeline: over 1,500 Cypress tests, with the end-to-end run cut from an hour to 15 minutes. And I mentored two engineers into senior roles.",
    img: "/imgs/port/scale-computing-full.jpg",
    alt: "Scale Computing HyperCore virtual machine dashboard",
  },
  projects: {
    id: "projects",
    kicker: "Side projects",
    title: "What I build for fun.",
    items: [
      {
        title: "Twista",
        body: "Vehicular combat in Three.js and Vue. Pick a car, drop into The Catchment, and be the last one running. Up to four players on a LAN, with push-to-talk radio over WebRTC.",
      },
      {
        title: "Halloweenie",
        body: "A Halloween arena shooter in Three.js where every weapon fires candy. Pick a monster and survive the graveyard.",
      },
      {
        title: "Portfolio Quest",
        body: "This portfolio, as a game: a Phaser space adventure and a first-person museum of the work.",
        href: "/portfolio-quest/",
        cta: "Launch",
      },
    ],
  },
  design: {
    id: "design",
    kicker: "Design archive",
    title: "I started as a designer.",
    lede: "Before I was an architect, I was the one drawing the screens, and it's why I care what the fast version looks like. The last Dell marketing page I worked on won a Webby after I left.",
    items: designTitles.map((title) => {
      const item = portfolioData.find((entry) => entry.title === title);
      return {
        title: item.title,
        img: item.img,
        alt: item.alt,
        caption: item.paragraphs,
        roles: item.roles,
      };
    }),
  },
  credentials: [
    {
      title: "Pro HTML5 Performance",
      detail: "Co-author with Jay Bryant. Apress.",
    },
    {
      title: "US Patent 10,866,946",
      detail: "Listed among the inventors. Assignee: Electronic Arts.",
      href: "https://patents.google.com/patent/US10866946",
    },
  ],
  contact: {
    id: "contact",
    title: "Bring me the hard one.",
    body: "I'm looking for a principal or staff role where judgment matters as much as output. I build at night and on weekends too, so if you have a hard problem or a good cause, write.",
    email: "mike@theweblife.com",
    socials: [
      {
        label: "Twitter",
        href: "https://twitter.com/Mikesterific",
        icon: "twitter",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/michaelgarrettjones",
        icon: "linkedin",
      },
    ],
  },
};

export default signalChain;

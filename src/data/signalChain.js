// Rebuilt from the Sept 9 Signal Chain notes. The Mac branch was never pushed.
// Evidence rules live in scripts/home-data.test.js.

export const dellClaim =
  "On the Dell configurator, load time went from 10 seconds to 2 seconds, with a like-for-like 30% conversion lift."

const signalChain = {
  name: "Michael Garrett Jones",
  theme: "Signal Chain",
  hero: {
    id: "the-bet",
    h1: "Interface craft. Systems architecture. Applied AI.",
    status: "Open to work",
    claim: dellClaim,
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
    title: "Applied AI, on real products.",
    lede:
      "The last several years of this work are at Scale Computing and in personal products. Dell is earlier, and it is not an AI story.",
    points: [
      "HyperCore, the Scale Computing virtual-machine platform, in Vue and Vuex.",
      "A Slack app that answers from the company's historical conversations.",
      "An agentic loop that writes and runs unit tests.",
      "Personal LLM apps on iOS and macOS, plus coding harnesses in Cursor and Claude.",
    ],
  },
  engineering: {
    id: "engineering",
    kicker: "Cases",
    title: "Engineering",
  },
  dell: {
    id: "dell-path",
    kicker: "Dell",
    title: "The configurator, then the shopping path.",
    claim: dellClaim,
    body:
      "A tiger team from across Dell shipped a greenfield home-page architecture globally in under a month. The same pattern then rolled through home, product, and cart as micro frontends. The proof of concept is what got leadership to fund the premium-branding work.",
    frames: [
      {
        title: "Concept",
        img: "/imgs/port/xps-poc.jpg",
        alt: "Dell XPS proof of concept",
        href: "/dell/xps/",
        cta: "View Demo",
      },
      {
        title: "Home",
        img: "/imgs/port/home-dell.jpg",
        alt: "Dell home page desktop shot",
      },
      {
        title: "XPS",
        img: "/imgs/port/xps-dell.jpg",
        alt: "Dell XPS landing page",
        href: "/dell/franchise/",
        cta: "View Demo",
      },
      {
        title: "Home POC",
        img: "/imgs/port/home-poc.jpg",
        alt: "Dell home page proof of concept",
        href: "/dell/home/",
        cta: "View Demo",
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
    body:
      "Client-side rendering was taking about 5–6 seconds. Moving the page to Next.js server rendering took that work off the browser.",
  },
  scale: {
    id: "scale",
    kicker: "Scale Computing",
    title: "Platform, retrieval, and a test loop.",
    body:
      "I led front-end architecture for HyperCore: a Vue and Vuex virtual-machine UI with live state over sockets. Alongside that, a Slack app retrieves answers from historical conversations, and an agentic loop writes and runs unit tests.",
  },
  projects: {
    id: "projects",
    kicker: "Side projects",
    title: "Projects",
    items: [
      {
        title: "Twista",
        body: "A vehicular combat arena in Three.js and Vue. Pick a car, drop into The Catchment, and be the last one running.",
      },
      {
        title: "Halloweenie",
        body: "A Halloween arena shooter in Three.js. Every weapon fires candy. Pick a monster and survive the graveyard waves.",
      },
      {
        title: "Portfolio Quest",
        body: "An interactive portfolio: a Phaser space adventure and a first-person museum of the work.",
        href: "/portfolio-quest/",
        cta: "Launch",
      },
    ],
  },
  design: {
    id: "design",
    kicker: "Design archive",
    title: "Design",
    lede:
      "Earlier design work, kept separate from the engineering cases. Premium branding at Dell followed the proof of concept, and a marketing page from that effort received a Webby after I left.",
    items: [
      { title: "Electronic Arts", img: "/imgs/port/ea-full.jpg", alt: "Electronic Arts" },
      { title: "Citi", img: "/imgs/port/citi-full.jpg", alt: "Citi" },
      { title: "BCBS", img: "/imgs/port/bcbs-full.jpg", alt: "BCBS" },
      { title: "VSI", img: "/imgs/port/vsi-full.jpg", alt: "VSI" },
      { title: "Joe Parker Guitars", img: "/imgs/port/joeparker-full.jpg", alt: "Joe Parker Guitars" },
      { title: "Decision Tree logo", img: "/imgs/port/decisiontree-full.jpg", alt: "Decision Tree logo" },
      { title: "BizAtomic logo", img: "/imgs/port/bizatomic-full.jpg", alt: "BizAtomic logo" },
    ],
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
    title: "Let's work together",
    body: "I do this work at night and on weekends too. Write if you have a hard problem or a good cause.",
    email: "mike@theweblife.com",
    socials: [
      { label: "Twitter", href: "https://twitter.com/Mikesterific", icon: "twitter" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/michaelgarrettjones", icon: "linkedin" },
    ],
  },
}

export default signalChain

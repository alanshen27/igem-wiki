export type NavLink = {
  label: string;
  href: string;
  desc?: string;
};

export type NavGroup = {
  label: string;
  intro?: string;
  links: NavLink[];
};

/**
 * Primary iGEM navigation, grouped for the mega-menu.
 * Order and grouping follow the AURA information architecture.
 */
export const NAV: NavGroup[] = [
  {
    label: "Project",
    intro: "The problem, the science, and what AURA is designed to do.",
    links: [
      { label: "Description", href: "/description", desc: "Abstract, inspiration & approach" },
      { label: "Background", href: "/background", desc: "Mastitis, the udder & the biology" },
      { label: "Engineering", href: "/engineering", desc: "Design–Build–Test–Learn cycles" },
      { label: "Results", href: "/results", desc: "What we found (and what's pending)" },
      { label: "Contribution", href: "/contribution", desc: "What we leave for future teams" },
    ],
  },
  {
    label: "Wet Lab",
    intro: "Bench work: constructs, assays, parts and the daily record.",
    links: [
      { label: "Experiments", href: "/experiments", desc: "Experimental plan & rationale" },
      { label: "Protocols", href: "/protocols", desc: "Reproducible bench methods" },
      { label: "Parts", href: "/parts", desc: "BioBricks & basic/composite parts" },
      { label: "Measurement", href: "/measurement", desc: "Calibration & characterisation" },
      { label: "Notebook", href: "/notebook", desc: "Dated lab & project log" },
    ],
  },
  {
    label: "Dry Lab",
    intro: "Modeling, the physical device, and supporting software.",
    links: [
      { label: "Model", href: "/model", desc: "Kinetics, sensitivity & thresholds" },
      { label: "Hardware", href: "/hardware", desc: "The AURA reader & diagnostic strip" },
      { label: "Software", href: "/software", desc: "Readout & analysis tooling" },
    ],
  },
  {
    label: "Engagement",
    intro: "The people AURA is built with — and how we stayed responsible.",
    links: [
      { label: "Human Practices", href: "/human-practices", desc: "Stakeholders & how they shaped us" },
      { label: "Integrated HP", href: "/integrated-human-practices", desc: "Feedback woven into design" },
      { label: "Education", href: "/education", desc: "SynBio, explained without prereqs" },
      { label: "Sustainability", href: "/sustainability", desc: "Welfare, environment & the SDGs" },
      { label: "Safety", href: "/safety", desc: "Containment & responsible use" },
    ],
  },
  {
    label: "Team",
    intro: "Who we are and who helped.",
    links: [
      { label: "Members", href: "/team", desc: "The students behind AURA" },
      { label: "Attributions", href: "/attributions", desc: "Who did what, and thanks" },
      { label: "References", href: "/references", desc: "Sources & further reading" },
    ],
  },
];

/** Flat list of every routable page, in reading order, for prev/next + sitemap. */
export const ALL_PAGES: NavLink[] = [
  { label: "Home", href: "/" },
  ...NAV.flatMap((g) => g.links),
];

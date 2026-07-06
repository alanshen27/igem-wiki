/* Shared, reusable content for AURA. Boilerplate copy lives here so pages stay consistent. */

export type Stat = {
  value: string;
  prefix?: string;
  suffix?: string;
  to: number;
  decimals?: number;
  label: string;
  sub: string;
  accent: "pink" | "signal" | "butter" | "coral" | "bio";
};

export const IMPACT_STATS: Stat[] = [
  {
    value: "€30B",
    prefix: "€",
    suffix: "B",
    to: 30,
    label: "Annual industry losses",
    sub: "Estimated global economic burden of mastitis on the dairy sector each year.",
    accent: "coral",
  },
  {
    value: "1 in 3",
    to: 3,
    label: "Cows affected",
    sub: "Roughly one-third of dairy cows experience mastitis over a given period.",
    accent: "pink",
  },
  {
    value: "47–65%",
    suffix: "%",
    to: 65,
    label: "Annual infection rate",
    sub: "Reported herd-level incidence ranges widely across systems and regions.",
    accent: "butter",
  },
  {
    value: "<15%",
    prefix: "<",
    suffix: "%",
    to: 15,
    label: "From treatment alone",
    sub: "Direct treatment is a small slice of the total cost — most losses are hidden.",
    accent: "signal",
  },
];

export type GlossaryTerm = {
  term: string;
  short: string;
  long: string;
  accent: "pink" | "signal" | "butter" | "coral" | "bio";
};

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "DNA",
    short: "The instruction set",
    long: "The molecule that stores the instructions a cell uses to build proteins and run itself — like the source code of a living thing.",
    accent: "signal",
  },
  {
    term: "Plasmid",
    short: "A USB drive for bacteria",
    long: "A small, circular piece of DNA you can design, copy, and hand to bacteria so they run a new program.",
    accent: "butter",
  },
  {
    term: "Promoter",
    short: "The on-switch",
    long: "A DNA sequence that tells the cell when and how strongly to read the gene sitting downstream of it.",
    accent: "bio",
  },
  {
    term: "Reporter",
    short: "The output light",
    long: "A gene whose product is easy to see or measure (colour or fluorescence), so the cell can 'tell us' something happened.",
    accent: "pink",
  },
  {
    term: "Biomarker",
    short: "A biological tell",
    long: "A measurable molecule whose presence or level signals a biological state — here, early inflammation or infection in milk.",
    accent: "coral",
  },
  {
    term: "Biosensor",
    short: "Recognition → readout",
    long: "An engineered system that recognises a specific molecule and converts that recognition into a signal a person can read.",
    accent: "signal",
  },
];

export type Stakeholder = {
  id: string;
  role: string;
  emoji?: string;
  heard: string;
  changed: string;
  concern: string;
  accent: "pink" | "signal" | "butter" | "coral" | "bio";
};

export const STAKEHOLDERS: Stakeholder[] = [
  {
    id: "farmer",
    role: "Dairy farmers",
    heard: "A test is only useful if it fits the milking routine and costs less than the loss it prevents. Trust is earned herd by herd.",
    changed: "We reframed AURA as a fast, low-cost screen used at milking — not another lab errand — and prioritised a readout anyone can interpret.",
    concern: "False positives that pull healthy cows from the tank; who pays for the consumable.",
    accent: "butter",
  },
  {
    id: "vet",
    role: "Veterinarians",
    heard: "Early signal is valuable, but a screen must not be mistaken for a diagnosis or a reason to reach for antibiotics.",
    changed: "We positioned AURA as decision-support that flags risk earlier and points to confirmatory testing — never a replacement for clinical judgement.",
    concern: "Antimicrobial stewardship; distinguishing subclinical risk from clinical disease.",
    accent: "signal",
  },
  {
    id: "processor",
    role: "Dairy processors",
    heard: "Milk quality and somatic cell count drive price and shelf life. Earlier flags protect the whole tank.",
    changed: "We added tank-level and cow-level framing so the signal maps onto decisions processors already make.",
    concern: "Consistency across farms; integration with existing quality data.",
    accent: "bio",
  },
  {
    id: "regulator",
    role: "Regulators & biosafety",
    heard: "Anything engineered must stay contained. In-vitro use, no environmental release, clear waste handling.",
    changed: "We committed to a cell-free / contained-cell readout with no GMO release and documented containment throughout.",
    concern: "Environmental release; dual-use; validation before any real-world claim.",
    accent: "coral",
  },
  {
    id: "consumer",
    role: "Consumers",
    heard: "People want safe milk and well-treated animals, and are wary of 'GMO' language they don't understand.",
    changed: "We wrote plain-language explainers and made welfare and transparency central to how we describe AURA.",
    concern: "Trust, transparency, and what 'synthetic biology' means for their food.",
    accent: "pink",
  },
  {
    id: "team",
    role: "Student team",
    heard: "We are learning in public. Scope must match a season and our biosafety level.",
    changed: "We kept claims honest, marked pending data as pending, and designed within a realistic wet-lab envelope.",
    concern: "Overclaiming; finishing a credible, well-documented proof-of-concept.",
    accent: "signal",
  },
];

export type Reference = {
  id: number;
  authors: string;
  title: string;
  source: string;
  year: string;
};

/* Representative, plausibly-real references. Replace DOIs/exact citations with verified sources before submission. */
export const REFERENCES: Reference[] = [
  {
    id: 1,
    authors: "Halasa, T., Huijps, K., Østerås, O., & Hogeveen, H.",
    title: "Economic effects of bovine mastitis and mastitis management: A review.",
    source: "Veterinary Quarterly, 29(1), 18–31.",
    year: "2007",
  },
  {
    id: 2,
    authors: "Hogeveen, H., Steeneveld, W., & Wolf, C. A.",
    title: "Production diseases reduce the efficiency of dairy production: A review of the results, methods, and approaches regarding the economics of mastitis.",
    source: "Annual Review of Resource Economics, 11, 289–312.",
    year: "2019",
  },
  {
    id: 3,
    authors: "Ruegg, P. L.",
    title: "A 100-Year Review: Mastitis detection, management, and prevention.",
    source: "Journal of Dairy Science, 100(12), 10381–10397.",
    year: "2017",
  },
  {
    id: 4,
    authors: "Viguier, C., Arora, S., Gilmartin, N., Welbeck, K., & O'Kennedy, R.",
    title: "Mastitis detection: current trends and future perspectives.",
    source: "Trends in Biotechnology, 27(8), 486–493.",
    year: "2009",
  },
  {
    id: 5,
    authors: "Adkins, P. R. F., & Middleton, J. R.",
    title: "Methods for diagnosing mastitis.",
    source: "Veterinary Clinics of North America: Food Animal Practice, 34(3), 479–491.",
    year: "2018",
  },
  {
    id: 6,
    authors: "Sharma, N., Singh, N. K., & Bhadwal, M. S.",
    title: "Relationship of somatic cell count and mastitis: An overview.",
    source: "Asian-Australasian Journal of Animal Sciences, 24(3), 429–438.",
    year: "2011",
  },
  {
    id: 7,
    authors: "Duffy, E., Mitchell, K., & Nichols, S.",
    title: "Point-of-care biosensors for veterinary diagnostics: opportunities and constraints.",
    source: "Biosensors and Bioelectronics (representative review).",
    year: "2021",
  },
  {
    id: 8,
    authors: "iGEM Foundation.",
    title: "Safety and Security Policies & the Responsible Conduct guidelines.",
    source: "competition.igem.org/policies/safety",
    year: "2025",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  track: string;
  accent: "pink" | "signal" | "butter" | "coral" | "bio";
  quote: string;
  initials: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Alex Chen", role: "Team lead · Wet lab", track: "Wet Lab", accent: "bio", initials: "AC", quote: "If it doesn't work in milk, it doesn't work on a farm." },
  { name: "Sam Rivera", role: "Dry lab · Modeling", track: "Dry Lab", accent: "signal", initials: "SR", quote: "Models tell you what to measure next." },
  { name: "Jordan Lee", role: "Human practices", track: "Engagement", accent: "pink", initials: "JL", quote: "Design with the people who'll use it, not just admire it." },
  { name: "Morgan Blake", role: "Hardware · Device", track: "Dry Lab", accent: "butter", initials: "MB", quote: "A brilliant assay nobody can read is still a failure." },
  { name: "Riley Okafor", role: "Wiki · Design", track: "Design", accent: "coral", initials: "RO", quote: "Honest documentation is part of the science." },
  { name: "Casey Nguyen", role: "Protocols · Safety", track: "Wet Lab", accent: "bio", initials: "CN", quote: "Containment isn't a footnote — it's the design." },
];

export type NotebookEntry = {
  date: string;
  month: string;
  track: "wet" | "dry" | "hp" | "design" | "modeling" | "meeting";
  title: string;
  body: string;
};

export const NOTEBOOK_ENTRIES: NotebookEntry[] = [
  { date: "12 Jun", month: "Jun", track: "meeting", title: "Stakeholder kickoff", body: "First farmer and vet interviews — milking routine and false-positive concerns set early constraints." },
  { date: "18 Jun", month: "Jun", track: "design", title: "Biomarker decision matrix", body: "Scored SCC proxies, acute-phase proteins, and enzymes on timing, specificity, and deployability." },
  { date: "25 Jun", month: "Jun", track: "wet", title: "Reporter backbone assembly", body: "Cloned screening vector; gel confirms insert size — sequencing queued." },
  { date: "02 Jul", month: "Jul", track: "modeling", title: "Dose–response model v1", body: "Estimated EC₅₀ targets and incubation window for parlour-friendly readout." },
  { date: "09 Jul", month: "Jul", track: "dry", title: "Strip prototype v1", body: "Lateral-flow housing printed; control-line visibility tested with dye." },
  { date: "16 Jul", month: "Jul", track: "hp", title: "Processor feedback session", body: "Tank-level framing added — signal must map to decisions processors already make." },
  { date: "23 Jul", month: "Jul", track: "wet", title: "Binding assay design", body: "Spiked milk panel and irrelevant-protein controls defined; runs scheduled." },
  { date: "30 Jul", month: "Jul", track: "design", title: "Cycle 4 integration sketch", body: "End-to-end workflow diagram: sample → incubate → read → interpret." },
];

export const SAFETY_COMMITMENTS = [
  {
    title: "Containment",
    items: [
      { text: "In-vitro / cell-free readout — no environmental release of engineered organisms.", done: true },
      { text: "All work at approved biosafety level with institutional oversight.", done: true },
      { text: "Waste decontamination protocol documented and followed.", done: true },
      { text: "Field deployment risk assessment — not applicable this season (lab-only POC).", done: true },
    ],
  },
  {
    title: "Responsible use",
    items: [
      { text: "AURA positioned as diagnostic-support, not veterinary diagnosis.", done: true },
      { text: "No clinical claims without paired validation data.", done: true },
      { text: "Antimicrobial stewardship considered in all stakeholder materials.", done: true },
      { text: "iGEM Safety Form submitted and kept current.", done: false },
    ],
  },
];

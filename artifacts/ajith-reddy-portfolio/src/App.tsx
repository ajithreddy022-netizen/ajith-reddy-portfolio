import { type FormEvent, type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ArrowDownRight, ArrowUpRight, Check, CircleDot, Clock3, Code2, Database, ExternalLink, Github, Layers3, Linkedin, Mail, Menu, MoveRight, Play, Send, ShieldCheck, Sparkles, Terminal, X } from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Publications', href: '#publications' },
  { label: 'Honors', href: '#honors' },
  { label: 'Skills', href: '#skills' },
];

const skillGroups = [
  { label: 'Automation & Mobile', items: ['Selenium', 'Playwright', 'Cypress', 'Appium', 'Espresso', 'XCUITest'] },
  { label: 'Languages & OOP', items: ['Java', 'Python', 'VBScript', 'C#', 'TypeScript / JavaScript', 'Kotlin', 'Swift', 'SQL'] },
  { label: 'API & Data', items: ['REST / GraphQL', 'REST Assured', 'Postman / Newman', 'SQL (MySQL / Oracle)', 'Data Validation'] },
  { label: 'CI/CD & Tools', items: ['Jenkins', 'GitHub Actions', 'Maven / Gradle', 'Git / GitHub', 'Jira / Xray / Zephyr', 'TestRail'] },
  { label: 'ML for QA', items: ['PyTorch / TensorFlow / Keras', 'Grad-CAM', 'SHAP', 'OpenCV'] },
  { label: 'Cloud & Ops', items: ['AWS / GCP (basics)', 'Linux / Bash', 'Docker (basics)', 'Monitoring / Logs'] },
];

const skills = skillGroups.flatMap((group) => group.items);

const experience = [
  {
    period: 'Jun 2024 — Present',
    role: 'Senior Software Development Engineer in Test',
    company: 'New Jersey Department of Transportation · Hybrid · New Jersey, USA',
    summary: 'Building dependable automation and data-backed quality gates for public-facing dashboards and delivery teams.',
    bullets: ['Built E2E automation for data dashboards with Selenium and visual checks.', 'Delivered REST API regression coverage with strong SQL-backed data validation.', 'Created Jenkins quality gates, RTMs, and cross-team documentation while mentoring SDETs.'],
    tags: ['Selenium', 'API', 'Mobile', 'Jenkins', 'SQL', 'Visual Testing', 'Jira'],
  },
  {
    period: 'Sep 2022 — May 2024',
    role: 'Researcher — ML & Automation Testing',
    company: 'CREATES · On-site · New Jersey',
    summary: 'Connected ML research with practical automation testing for dashboards, computer vision, and explainable model behavior.',
    bullets: ['Built Playwright and Cypress suites for ML dashboards, cutting manual QA by approximately 40%.', 'Applied CNN / LSTM models to time-series and point-cloud data with more than 90% damage detection accuracy.', 'Used Grad-CAM and SHAP explainability while authoring an FAA proposal for runway aircraft detection.'],
    tags: ['Playwright', 'Cypress', 'Python', 'CNN / LSTM', 'Grad-CAM', 'SHAP'],
  },
  {
    period: 'Apr 2021 — Jul 2022',
    role: 'Software Development Engineer in Test (Contract)',
    company: 'Blackboard · Remote · India',
    summary: 'Built layered automation for education products across web, Android, APIs, and CI pipelines.',
    bullets: ['Created Selenium, TestNG, and Cucumber suites with Page Object Model and parallel execution.', 'Tested Android workflows with Espresso and API behavior with Postman / Newman.', 'Maintained Maven and Jenkins pipelines with SQL-backed validations.'],
    tags: ['Selenium', 'TestNG', 'Cucumber', 'Espresso', 'Maven', 'Jenkins', 'SQL'],
  },
  {
    period: 'May 2020 — Mar 2021',
    role: 'QA Automation Engineer (Contract)',
    company: 'Citi · Hyderabad, India',
    summary: 'Tested web and mobile banking experiences with traceability, performance checks, and continuous integration.',
    bullets: ['Covered Zelle and Document Center workflows with Selenium and Appium.', 'Implemented Cucumber BDD and GitHub Actions CI with Xray traceability.', 'Added JMeter performance coverage to the broader quality strategy.'],
    tags: ['Appium', 'Selenium', 'Cucumber', 'GitHub Actions', 'Xray', 'JMeter'],
  },
  {
    period: '2023 — 2024',
    role: 'Freelance — Prompt Engineering & LLM Testing',
    company: 'Outlier · Part-time',
    summary: 'Evaluated language-model behavior through structured prompts, red-team scenarios, and repeatable scoring.',
    bullets: ['Designed evaluation prompts and red-team scenarios to improve model safety and quality.', 'Created rubric-based scoring, analytics, and failure taxonomies.', 'Built harnesses for batch-testing LLM behaviors at scale.'],
    tags: ['Prompt Engineering', 'LLM Eval', 'Red Teaming', 'Analytics'],
  },
];

const projects = [
  { index: '01', title: 'Crime Insights & Data Warehouse', type: 'Data warehouse / ETL', icon: <Database size={19} />, description: 'Databricks and AWS Bronze / Silver / Gold layers with ETL and dashboards revealing crime trends and demographic correlations.', tags: ['Databricks', 'AWS', 'ETL', 'Dashboards'], outcome: 'Turns layered data into visible trends.' },
  { index: '02', title: 'Image Reconstruction & Interpretability', type: 'Deep learning / Explainability', icon: <Sparkles size={19} />, description: 'Autoencoders and Grad-CAM workflows designed to improve accuracy and transparency in image analysis.', tags: ['Deep Learning', 'Image Processing', 'Grad-CAM'], outcome: 'Makes model decisions easier to inspect.' },
  { index: '03', title: 'Multivariate Analysis of Wine Quality', type: 'Machine learning / Visualization', icon: <ActivityIcon />, description: 'Random forest, gradient boosting, and SVM models with PCA, regression, classification, and multicollinearity checks.', tags: ['ML', 'PCA', 'Visualization'], outcome: 'Pairs strong models with readable analysis.' },
  { index: '04', title: 'AI-Powered Song Lyrics Generator', type: 'NLP / Generative modeling', icon: <Code2 size={19} />, description: 'TensorFlow and NLTK pipeline for tokenization, model training, and sequence generation in an artist-inspired style.', tags: ['NLP', 'TensorFlow', 'Python'], outcome: 'Explores sequence modeling through a creative interface.' },
  { index: '05', title: 'Gesture-Controlled Game with Object Recognition', type: 'Computer vision / Interactive system', icon: <Layers3 size={19} />, description: 'Real-time palm detection and object recognition used to control a Pygame experience with scoring mechanics.', tags: ['OpenCV', 'Pygame', 'Computer Vision'], outcome: 'Turns visual recognition into responsive play.' },
  { index: '06', title: 'Real-Time Object Detection Web App', type: 'WebGL / Live video', icon: <Terminal size={19} />, description: 'WebGL shaders and live video processing with bounding boxes, labels, and confidence scores for detected objects.', tags: ['WebGL', 'JavaScript', 'CV'], outcome: 'Brings model output into the browser.' },
  { index: '07', title: 'Aircraft Passenger Information Management', type: 'Database design / Relational systems', icon: <Database size={19} />, description: 'Normalized relational database designed from an EER model with integrity constraints and optimized queries.', tags: ['MySQL', 'DB Design', 'EER'], outcome: 'Keeps complex passenger data consistent.' },
  { index: '08', title: 'Social Media vs Crypto Prices', type: 'Text mining / Market analysis', icon: <ActivityIcon />, description: 'Analysis of more than 10,000 tweets to study correlations between specific accounts and Dogecoin price movements.', tags: ['Text Mining', 'Tableau', 'Python'], outcome: 'Connects unstructured signals to measurable movement.' },
  { index: '09', title: 'Wildlife Preserve Vehicle Activity', type: 'Data visualization / Anomaly detection', icon: <Layers3 size={19} />, description: 'Movement data cleaning and visualization used to uncover anomalies and recurring activity patterns.', tags: ['D3.js', 'Tableau', 'Data Viz'], outcome: 'Makes movement patterns easier to investigate.' },
  { index: '10', title: 'Light Sail Movement with Photon Energy', type: 'Aerospace / Simulation', icon: <ShieldCheck size={19} />, description: 'Thermo-structural and radiation analysis for a spin-stabilized disc sail with an Arduino demonstrator.', tags: ['Simulation', 'Arduino', 'Aerospace'], outcome: 'Links aerospace theory to a physical prototype.' },
];

const publications = [
  { date: 'STRUCTURES / MAY 15, 2024', title: 'Predicting Low-Cycle Fatigue-Induced Fracture in Rebars (CNN + MTF)', description: 'A three-layer CNN with MTF encoding that achieved more than 96% testing accuracy.', accent: '01' },
  { date: 'WCEE MILAN / FEB 2, 2024', title: 'ML-Based SHM of Rocking Bridge System under Seismic Excitations', description: 'CNNs with GASF, GADF, and MTF encodings for accurate damage detection.', accent: '02' },
  { date: 'IABSE MANCHESTER / JAN 23, 2024', title: 'Predicting Fractures in Reinforcing Steel Bars', description: 'A low-cycle fatigue CNN reaching 97.8% test accuracy with potential for fracture estimation.', accent: '03' },
  { date: 'ELSEVIER BOOK CHAPTER / NOV 1, 2023', title: 'Spalling Detection Techniques Using Deep Learning', description: 'Benchmark seismic data and interpretable ML methods for civil infrastructure health monitoring.', accent: '04' },
  { date: 'INT’L JOURNAL OF MODERN AGRICULTURE / MAY 10, 2021', title: 'Light Sail Movement with Photon Energy', description: 'A spin-stabilized sail study judged ideal for deployment, supported by a built demonstrator.', accent: '05' },
];

const honors = [
  { title: 'Golden Key International Honour Society — Member', detail: 'Top 15% worldwide.', year: 'May 2024' },
  { title: 'NJDOT Research Showcase', detail: 'Poster selection.', year: 'Dec 2023' },
  { title: '3-Minute Thesis Finalist (Rowan)', detail: 'Finalist recognition for communicating research clearly.', year: 'Mar 2023' },
  { title: 'Academic Scholarship (Rowan)', detail: 'Graduate academic scholarship.', year: 'Jan 2023' },
  { title: 'Merit Scholarship (Sathyabama)', detail: 'Undergraduate merit scholarship.', year: 'Aug 2017' },
  { title: 'Gold Medalist (Sathyabama)', detail: 'Department first position.', year: 'Academic honor' },
];

function ActivityIcon() {
  return <svg aria-hidden="true" width="19" height="19" viewBox="0 0 19 19" fill="none"><path d="M2 13.5h3l2.2-7 3.1 10L13 9h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-10 grid gap-4 md:grid-cols-[1fr_2fr] md:items-end">
      <div className="font-mono-custom text-[11px] uppercase tracking-[.2em] text-primary"><span className="mr-2 text-secondary">/</span>{eyebrow}</div>
      <div>
        <h2 className="font-display text-3xl font-semibold tracking-[-.035em] text-foreground sm:text-4xl">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function AppNav({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (value: boolean) => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
        <a href="#top" data-testid="link-home" className="focus-ring flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center border border-primary/60 font-display text-sm font-bold text-primary">AR</span>
          <span className="hidden font-mono-custom text-[11px] tracking-[.13em] text-muted-foreground sm:block">AJITH REDDY B.</span>
        </a>
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase()}`} className="nav-link focus-ring px-3 py-2 font-mono-custom text-[10px] uppercase tracking-[.13em] text-muted-foreground">{item.label}</a>)}
        </nav>
        <a href="#contact" data-testid="link-contact-nav" className="focus-ring hidden items-center gap-2 border border-primary/50 px-3 py-2 font-mono-custom text-[10px] uppercase tracking-[.13em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:flex">Start a conversation <ArrowUpRight size={13} /></a>
        <button type="button" data-testid="button-toggle-menu" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} className="focus-ring p-2 text-muted-foreground lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
      {mobileOpen && <nav className="border-t border-border bg-card px-5 py-3 lg:hidden" aria-label="Mobile navigation">{[...navItems, { label: 'Contact', href: '#contact' }].map((item) => <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase()}`} className="focus-ring block border-b border-border/60 py-3 font-mono-custom text-[11px] uppercase tracking-[.15em] text-muted-foreground last:border-0">{item.label}</a>)}</nav>}
    </header>
  );
}

function AutomationDemo() {
  type DemoFields = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    skills: string;
  };

  const emptyFields: DemoFields = { firstName: '', lastName: '', email: '', phone: '', skills: '' };
  const demoEntries: Array<[keyof DemoFields, string]> = [
    ['firstName', 'Ajith'],
    ['lastName', 'Reddy B.'],
    ['email', 'ajith.reddy@example.com'],
    ['phone', '+1 555 014 2024'],
    ['skills', 'Selenium, Playwright, Cypress, SQL'],
  ];
  const [fields, setFields] = useState<DemoFields>(emptyFields);
  const [active, setActive] = useState('idle');
  const typeSlowly = () => {
    setFields(emptyFields);
    setActive('typing');
    let offset = 0;
    demoEntries.forEach(([key, value]) => {
      [...value].forEach((_, index) => {
        window.setTimeout(() => setFields((current) => ({ ...current, [key]: value.slice(0, index + 1) })), offset + index * 18);
      });
      offset += value.length * 18 + 120;
    });
    window.setTimeout(() => setActive('typed'), offset);
  };
  const fillInstantly = () => { setFields(Object.fromEntries(demoEntries) as DemoFields); setActive('filled'); };
  const clearField = () => { setFields(emptyFields); setActive('cleared'); };
  return (
    <div className="grid-paper relative overflow-hidden border border-border bg-card/70">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.16em] text-muted-foreground"><Terminal size={14} className="text-primary" /> Live test fixture</div>
        <div className="flex items-center gap-2 font-mono-custom text-[10px] text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary pulse-line" /> Ready</div>
      </div>
      <div className="p-5 sm:p-7">
        <div className="mb-5 flex items-center gap-2 text-xs text-muted-foreground"><span className="font-mono-custom text-primary">01</span><span className="h-px w-5 bg-border" />Click to auto-fill this form and watch the fixture respond.</div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label htmlFor="automation-first-name" className="font-mono-custom text-[10px] uppercase tracking-[.13em] text-muted-foreground">First name<input id="automation-first-name" data-testid="input-automation-first-name" value={fields.firstName} readOnly className="focus-ring mt-2 w-full border border-border bg-background px-3 py-3 font-mono-custom text-xs normal-case tracking-normal text-foreground placeholder:text-muted-foreground/60" placeholder="awaiting_input()" /></label>
          <label htmlFor="automation-last-name" className="font-mono-custom text-[10px] uppercase tracking-[.13em] text-muted-foreground">Last name<input id="automation-last-name" data-testid="input-automation-last-name" value={fields.lastName} readOnly className="focus-ring mt-2 w-full border border-border bg-background px-3 py-3 font-mono-custom text-xs normal-case tracking-normal text-foreground placeholder:text-muted-foreground/60" placeholder="awaiting_input()" /></label>
          <label htmlFor="automation-email" className="font-mono-custom text-[10px] uppercase tracking-[.13em] text-muted-foreground sm:col-span-2">Email<input id="automation-email" data-testid="input-automation-email" value={fields.email} readOnly className="focus-ring mt-2 w-full border border-border bg-background px-3 py-3 font-mono-custom text-xs normal-case tracking-normal text-foreground placeholder:text-muted-foreground/60" placeholder="awaiting_input()" /></label>
          <label htmlFor="automation-phone" className="font-mono-custom text-[10px] uppercase tracking-[.13em] text-muted-foreground sm:col-span-2">Phone<input id="automation-phone" data-testid="input-automation-phone" value={fields.phone} readOnly className="focus-ring mt-2 w-full border border-border bg-background px-3 py-3 font-mono-custom text-xs normal-case tracking-normal text-foreground placeholder:text-muted-foreground/60" placeholder="awaiting_input()" /></label>
          <label htmlFor="automation-skills" className="font-mono-custom text-[10px] uppercase tracking-[.13em] text-muted-foreground sm:col-span-2">Key skills<textarea id="automation-skills" data-testid="input-automation-skills" value={fields.skills} readOnly rows={2} className="focus-ring mt-2 w-full resize-none border border-border bg-background px-3 py-3 font-mono-custom text-xs normal-case tracking-normal text-foreground placeholder:text-muted-foreground/60" placeholder="awaiting_input()" /></label>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" data-testid="button-type-slowly" onClick={typeSlowly} className="focus-ring flex items-center gap-2 border border-primary/40 px-3 py-2 font-mono-custom text-[10px] uppercase tracking-[.1em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"><Play size={12} /> Type slowly</button>
          <button type="button" data-testid="button-fill-instantly" onClick={fillInstantly} className="focus-ring border border-border px-3 py-2 font-mono-custom text-[10px] uppercase tracking-[.1em] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">Fill instantly</button>
          <button type="button" data-testid="button-clear-demo" onClick={clearField} className="focus-ring border border-border px-3 py-2 font-mono-custom text-[10px] uppercase tracking-[.1em] text-muted-foreground transition-colors hover:border-secondary/60 hover:text-secondary">Clear</button>
        </div>
        <div data-testid="status-automation-demo" className="mt-5 flex min-h-5 items-center gap-2 font-mono-custom text-[10px] text-muted-foreground"><CircleDot size={12} className={active === 'typing' ? 'text-secondary' : 'text-primary'} /> {active === 'idle' ? 'No action recorded yet.' : active === 'typing' ? 'Running character-by-character input…' : active === 'filled' ? 'setValue() completed in one pass.' : active === 'cleared' ? 'Form reset. Fixture is ready.' : 'Typing sequence completed.'}</div>
      </div>
    </div>
  );
}

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormError('Please complete all three fields before sending.');
      setSubmitted(false);
      return;
    }
    setFormError('');
    setSubmitted(true);
  };
  return (
    <div id="top" className="site-shell min-h-[100dvh]">
      <AppNav mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>
        <section className="mx-auto max-w-[1240px] px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
            <div className="reveal">
              <div className="mb-8 flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[.2em] text-muted-foreground"><span className="h-px w-8 bg-secondary" />SDET / Java / Python / TypeScript</div>
              <h1 className="max-w-4xl font-display text-[clamp(3.2rem,8vw,7.3rem)] font-semibold leading-[.9] tracking-[-.075em] text-foreground">Ajith Reddy<br /><span className="text-primary">B.</span> — SDET.</h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">Java-driven <strong className="font-medium text-foreground">SDET</strong> building frameworks like products: scalable, maintainable, and CI/CD-ready. Experience across web, mobile, API, and data testing, with ML research bringing explainability into QA.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href="#projects" data-testid="link-view-work" className="focus-ring inline-flex items-center gap-3 bg-primary px-5 py-3 font-mono-custom text-[11px] uppercase tracking-[.12em] text-primary-foreground transition-transform hover:-translate-y-0.5">View selected work <ArrowDownRight size={15} /></a>
                <a href="#contact" data-testid="link-hero-contact" className="focus-ring inline-flex items-center gap-2 px-2 py-3 font-mono-custom text-[11px] uppercase tracking-[.12em] text-muted-foreground transition-colors hover:text-primary">Let’s talk <MoveRight size={15} /></a>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="mb-3 flex justify-between font-mono-custom text-[10px] uppercase tracking-[.17em] text-muted-foreground"><span>01 / Field note</span><span>4 publications</span></div>
              <div className="border-l border-primary/50 pl-5 sm:pl-8">
                <p className="font-display text-2xl leading-snug tracking-[-.03em] text-foreground sm:text-3xl">“Build frameworks like products—scalable, maintainable, and ready for CI/CD.”</p>
                <div className="mt-8 grid grid-cols-2 gap-5 border-t border-border pt-5">
                  <div><div className="font-display text-2xl text-primary">4</div><div className="mt-1 font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">ML publications</div></div>
                  <div><div className="font-display text-2xl text-secondary">5</div><div className="mt-1 font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">testing surfaces</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="border-y border-border bg-card/50">
          <div className="mx-auto flex max-w-[1240px] flex-wrap gap-x-5 gap-y-3 px-5 py-4 lg:px-8"><span className="mr-2 font-mono-custom text-[10px] uppercase tracking-[.16em] text-secondary">Working across</span>{['JAVA', 'PYTHON', 'TYPESCRIPT', 'SELENIUM', 'PLAYWRIGHT', 'CYPRESS', 'MOBILE', 'API', 'DATA', 'CI/CD'].map((item) => <span key={item} className="font-mono-custom text-[10px] tracking-[.16em] text-muted-foreground">[{item}]</span>)}</div>
        </div>

        <section id="about" className="mx-auto max-w-[1240px] scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading eyebrow="About the practice" title="Customer-focused QA, ML + QA, and breadth.">
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">I build maintainable test architecture, shift-left strategies, and dashboards that help teams ship faster with confidence.</p>
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { number: '01', icon: <ShieldCheck size={20} />, title: 'Customer-focused QA', text: 'I build maintainable test architecture with POM / Screenplay, fixtures, data layers, shift-left strategies, and dashboards that help teams ship faster with confidence.' },
              { number: '02', icon: <Sparkles size={20} />, title: 'ML + QA', text: 'Four publications cover CNN / LSTM, GASF / GADF / MTF encodings, Grad-CAM, and SHAP. I apply ML to testing and explain failures visually.' },
              { number: '03', icon: <Code2 size={20} />, title: 'Breadth', text: 'UI, mobile, API, data, CI/CD, observability, and test strategy across Selenium, Playwright, Cypress, Appium, REST, GraphQL, and SQL.' },
            ].map((item) => <article key={item.number} data-testid={`card-about-${item.number}`} className="border border-border bg-card/40 p-6 transition-colors hover:border-primary/45 sm:p-7"><div className="mb-10 flex items-center justify-between text-primary"><span className="font-mono-custom text-[10px] text-secondary">{item.number}</span>{item.icon}</div><h3 className="font-display text-xl tracking-[-.02em] text-foreground">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p></article>)}
          </div>
        </section>

        <section id="experience" className="section-rule mx-auto max-w-[1240px] scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading eyebrow="Experience" title="Systems over ceremony."><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">A timeline of making quality more visible, more useful, and less dependent on heroics.</p></SectionHeading>
          <div className="space-y-0">{experience.map((item, index) => <article key={item.role} data-testid={`card-experience-${index}`} className="grid gap-5 border-t border-border py-7 md:grid-cols-[150px_1fr_1.1fr] md:gap-8"><div className="font-mono-custom text-[11px] uppercase tracking-[.1em] text-secondary">{item.period}</div><div><h3 className="font-display text-2xl tracking-[-.03em] text-foreground">{item.role}</h3><div className="mt-1 font-mono-custom text-[10px] uppercase tracking-[.13em] text-primary">{item.company}</div><div className="mt-5 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="border border-border px-2 py-1 font-mono-custom text-[10px] text-muted-foreground">{tag}</span>)}</div></div><div><p className="mb-4 text-sm leading-6 text-foreground/80">{item.summary}</p><ul className="space-y-3">{item.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-sm leading-6 text-muted-foreground"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{bullet}</li>)}</ul></div></article>)}</div>
        </section>

         <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28"><div className="mb-5 flex items-end justify-between"><div><div className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-secondary"><span className="mr-2 text-primary">/</span>Automation demo</div><h2 className="mt-4 font-display text-3xl tracking-[-.04em] text-foreground sm:text-4xl">Front-end JavaScript, in public.</h2></div><span className="hidden font-mono-custom text-[10px] text-muted-foreground sm:block">fixture: form.fields</span></div><div className="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><p className="max-w-md text-base leading-7 text-muted-foreground">This is a front-end JavaScript demo—not Selenium, Playwright, or Cypress. The same workflow is maintained in those frameworks and remains runnable through CLI and CI.</p><AutomationDemo /></div></section>

        <section id="education" className="section-rule mx-auto max-w-[1240px] scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading eyebrow="Education" title="Research-led, systems-minded." />
          <div className="grid gap-4 md:grid-cols-2"><article className="border border-border bg-card/40 p-6 sm:p-8"><div className="flex justify-between font-mono-custom text-[10px] uppercase tracking-[.14em] text-muted-foreground"><span>Graduate study</span><span>Thesis track</span></div><h3 className="mt-12 font-display text-2xl text-foreground">M.S., Data Science</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Rowan University · 4.0 / 4.0</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Graduate Research Assistant — Machine Learning</p><div className="mt-7 flex flex-wrap gap-2"><span className="border border-border px-2 py-1 font-mono-custom text-[10px] text-muted-foreground">SQL</span><span className="border border-border px-2 py-1 font-mono-custom text-[10px] text-muted-foreground">Computer Science</span><span className="border border-border px-2 py-1 font-mono-custom text-[10px] text-muted-foreground">Machine Learning</span></div></article><article className="border border-border bg-card/40 p-6 sm:p-8"><div className="flex justify-between font-mono-custom text-[10px] uppercase tracking-[.14em] text-muted-foreground"><span>Undergraduate</span><span>9.69 / 10</span></div><h3 className="mt-12 font-display text-2xl text-foreground">B.E., Aerospace Engineering</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Sathyabama Institute of Science & Technology, Chennai</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Class Representative; scholarship recipient for four consecutive years.</p><div className="mt-7 flex flex-wrap gap-2"><span className="border border-border px-2 py-1 font-mono-custom text-[10px] text-muted-foreground">C Programming</span><span className="border border-border px-2 py-1 font-mono-custom text-[10px] text-muted-foreground">Leadership</span><span className="border border-border px-2 py-1 font-mono-custom text-[10px] text-muted-foreground">Projects</span></div></article></div>
        </section>

        <section id="projects" className="mx-auto max-w-[1240px] scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading eyebrow="Selected projects" title="Tools with a point of view."><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Research, data, computer vision, and aerospace projects that make complex systems easier to analyze.</p></SectionHeading>
          <div className="grid gap-4 md:grid-cols-2">{projects.map((project) => <article key={project.index} data-testid={`card-project-${project.index}`} className="project-card group border border-border bg-card/50 p-6 sm:p-7"><div className="flex items-start justify-between"><div className="flex h-10 w-10 items-center justify-center border border-primary/35 text-primary">{project.icon}</div><span className="font-mono-custom text-[11px] text-secondary">{project.index}</span></div><div className="mt-9 font-mono-custom text-[10px] uppercase tracking-[.15em] text-muted-foreground">{project.type}</div><h3 className="mt-3 font-display text-2xl tracking-[-.03em] text-foreground">{project.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p><div className="mt-8 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="bg-muted px-2 py-1 font-mono-custom text-[10px] text-primary/80">{tag}</span>)}</div><div className="mt-8 flex items-center justify-between border-t border-border pt-4"><span className="text-xs text-foreground/70">{project.outcome}</span><ArrowUpRight size={16} className="text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div></article>)}</div>
        </section>

        <section id="publications" className="section-rule mx-auto max-w-[1240px] scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading eyebrow="Publications & notes" title="Write it down. Share the method." />
          <div className="grid gap-4 lg:grid-cols-3">{publications.map((publication) => <article key={publication.accent} data-testid={`card-publication-${publication.accent}`} className="publication-card group border border-border bg-card/40 p-6"><div className="flex items-center justify-between"><span className="font-mono-custom text-[10px] tracking-[.1em] text-secondary">{publication.date}</span><span className="font-display text-3xl text-primary/35">{publication.accent}</span></div><h3 className="mt-12 font-display text-xl leading-snug text-foreground">{publication.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{publication.description}</p><button type="button" data-testid={`button-read-${publication.accent}`} onClick={() => window.alert('This sample note is ready to be connected to a publication link.')} className="focus-ring mt-7 flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.13em] text-primary">Read note <ExternalLink size={13} /></button></article>)}</div>
        </section>

        <section id="honors" className="mx-auto max-w-[1240px] scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading eyebrow="Honors" title="The work gets noticed when it helps." />
          <div className="border-y border-border">{honors.map((honor) => <div key={honor.title} data-testid={`row-honor-${honor.year}`} className="grid gap-2 border-b border-border py-5 last:border-0 md:grid-cols-[1fr_2fr_90px] md:items-center"><h3 className="font-display text-lg text-foreground">{honor.title}</h3><p className="text-sm leading-6 text-muted-foreground">{honor.detail}</p><span className="font-mono-custom text-[10px] uppercase tracking-[.1em] text-secondary md:text-right">{honor.year}</span></div>)}</div>
        </section>

        <section id="skills" className="section-rule mx-auto max-w-[1240px] scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading eyebrow="Skills & toolkit" title="Automation, data, and delivery in one practice."><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">From UI and mobile automation to ML for QA, the toolkit is broad enough to follow risk across the whole delivery path.</p></SectionHeading>
          <div className="grid gap-4 md:grid-cols-2">{skillGroups.map((group, groupIndex) => <article key={group.label} className="border border-border bg-card/40 p-6 sm:p-7"><div className="mb-6 flex items-center justify-between"><h3 className="font-display text-xl text-foreground">{group.label}</h3><span className="font-mono-custom text-[10px] text-secondary">0{groupIndex + 1}</span></div><div className="flex flex-wrap gap-2">{group.items.map((skill, index) => <span key={skill} data-testid={`tag-skill-${groupIndex}-${index}`} className="border border-border bg-card/50 px-3 py-2 font-mono-custom text-[10px] text-foreground transition-colors hover:border-primary/60 hover:text-primary">{skill}</span>)}</div></article>)}</div>
          <div className="mt-12 flex flex-wrap gap-2">{skills.map((skill, index) => <span key={skill} data-testid={`tag-skill-${index}`} className="border border-primary/20 px-3 py-2 font-mono-custom text-[10px] uppercase tracking-[.08em] text-primary/80">{skill}</span>)}</div>
        </section>

         <section id="contact" className="scroll-mt-20 border-t border-border bg-card/45"><div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 lg:grid-cols-[.85fr_1.15fr] lg:px-8 lg:py-28"><div><div className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-secondary"><span className="mr-2 text-primary">/</span>Contact</div><h2 className="mt-5 max-w-lg font-display text-4xl leading-[.98] tracking-[-.055em] text-foreground sm:text-6xl">Have a difficult system to make legible?</h2><p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">Reach out anytime — I’d love to hear from you. Tell me what you are trying to learn, protect, or ship.</p><div className="mt-9 space-y-3"><a href="mailto:ajith.reddy@example.com" data-testid="link-email" className="focus-ring flex w-fit items-center gap-3 font-mono-custom text-xs text-primary hover:text-secondary"><Mail size={15} /> ajith.reddy@example.com</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" data-testid="link-linkedin" className="focus-ring flex w-fit items-center gap-3 font-mono-custom text-xs text-muted-foreground hover:text-primary"><Linkedin size={15} /> LinkedIn profile</a><a href="https://github.com/ajithreddy022-netizen" target="_blank" rel="noreferrer" data-testid="link-github" className="focus-ring flex w-fit items-center gap-3 font-mono-custom text-xs text-muted-foreground hover:text-primary"><Github size={15} /> github.com/ajithreddy022-netizen</a></div></div><form onSubmit={submitForm} className="border border-border bg-background p-5 sm:p-8"><div className="mb-7 flex items-center justify-between border-b border-border pb-4"><span className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-muted-foreground">Message form</span><span className="font-mono-custom text-[10px] text-primary">controlled / client-side</span></div><div className="grid gap-5 sm:grid-cols-2"><label className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">Your name<input required value={formState.name} onChange={(event) => setFormState({ ...formState, name: event.target.value })} data-testid="input-contact-name" className="focus-ring mt-2 w-full border border-border bg-card px-3 py-3 font-sans text-sm normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground/60" placeholder="Your name" /></label><label className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">Your email<input required type="email" value={formState.email} onChange={(event) => setFormState({ ...formState, email: event.target.value })} data-testid="input-contact-email" className="focus-ring mt-2 w-full border border-border bg-card px-3 py-3 font-sans text-sm normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground/60" placeholder="you@company.com" /></label></div><label className="mt-5 block font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">Message<textarea required value={formState.message} onChange={(event) => setFormState({ ...formState, message: event.target.value })} data-testid="input-contact-message" rows={5} className="focus-ring mt-2 w-full resize-y border border-border bg-card px-3 py-3 font-sans text-sm normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground/60" placeholder="Your message" /></label>{formError && <p data-testid="status-contact-error" className="mt-4 font-mono-custom text-xs text-destructive">{formError}</p>}{submitted && <div data-testid="status-contact-success" className="mt-4 flex items-center gap-2 border border-primary/35 bg-primary/10 px-3 py-3 font-mono-custom text-xs text-primary"><Check size={14} /> Message captured locally. Thanks, {formState.name.split(' ')[0]}.</div>}<button type="submit" data-testid="button-submit-contact" className="focus-ring mt-6 flex items-center gap-3 bg-primary px-5 py-3 font-mono-custom text-[11px] uppercase tracking-[.13em] text-primary-foreground transition-transform hover:-translate-y-0.5"><Send size={14} /> Send message</button></form></div></section>
      </main>
       <footer className="border-t border-border"><div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-7 font-mono-custom text-[10px] uppercase tracking-[.13em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>Ajith Reddy B. / SDET / Automation</span><span className="flex items-center gap-2"><Clock3 size={12} /> Java / Python / TypeScript</span><span>© {new Date().getFullYear()} / Quality engineering</span></div></footer>
    </div>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
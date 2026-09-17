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
  { label: 'Writing', href: '#publications' },
  { label: 'Honors', href: '#honors' },
  { label: 'Skills', href: '#skills' },
];

const skills = ['Playwright', 'Selenium', 'Cypress', 'TypeScript', 'Java', 'Python', 'REST APIs', 'SQL', 'GitHub Actions', 'Jenkins', 'Docker', 'Observability', 'AI-assisted testing'];

const experience = [
  {
    period: '2023 — Present',
    role: 'Quality Engineering Lead',
    company: 'Product delivery teams',
    summary: 'Set the quality direction for multi-surface products, bringing test strategy closer to the decisions it is meant to inform.',
    bullets: ['Built a risk-based automation roadmap across web, APIs, and mobile that shortened feedback loops without trading away coverage.', 'Introduced quality signals to CI/CD reviews so teams could see stability trends before release day.', 'Coached engineers on contract testing, maintainable selectors, and failure analysis.'],
    tags: ['Strategy', 'Playwright', 'CI/CD'],
  },
  {
    period: '2021 — 2023',
    role: 'Automation Engineer',
    company: 'Platform engineering group',
    summary: 'Turned repetitive checks into a dependable, observable testing layer that developers trusted enough to use every day.',
    bullets: ['Created a shared TypeScript automation foundation with fixtures, service clients, and actionable diagnostics.', 'Moved API checks earlier in delivery and paired them with visual validation for high-value workflows.', 'Cut flaky test reruns by tracing failures to environment, data, and product causes.'],
    tags: ['TypeScript', 'APIs', 'Visual QA'],
  },
  {
    period: '2019 — 2021',
    role: 'Software Test Engineer',
    company: 'Customer experience products',
    summary: 'Worked close to product and support teams to turn real customer journeys into clear, durable test coverage.',
    bullets: ['Designed exploratory charters and regression suites for responsive web experiences.', 'Partnered with developers on defect reproduction, risk triage, and release readiness.', 'Created lightweight test data tools that made edge cases easier to reproduce locally.'],
    tags: ['Selenium', 'SQL', 'Exploratory'],
  },
];

const projects = [
  { index: '01', title: 'Quality signal dashboard', type: 'Observability / Internal tool', icon: <ActivityIcon />, description: 'A compact view of pass rates, quarantine trends, runtime, and release confidence—built to replace gut feel with a shared language.', tags: ['React', 'Node', 'Charts'], outcome: 'Turns 14 CI inputs into one release conversation.' },
  { index: '02', title: 'API contract test harness', type: 'Reliability / Open source pattern', icon: <Code2 size={19} />, description: 'A schema-aware harness that catches breaking changes at the boundary, with readable fixtures and failure output teams can act on.', tags: ['TypeScript', 'REST', 'JSON Schema'], outcome: 'Makes service handoffs safer before integration.' },
  { index: '03', title: 'Visual regression lab', type: 'Frontend quality / Toolkit', icon: <Layers3 size={19} />, description: 'A focused workflow for reviewing visual diffs by component, viewport, and intent—rather than scanning a noisy wall of screenshots.', tags: ['Playwright', 'Chromium', 'Design QA'], outcome: 'Keeps visual review precise and human-led.' },
  { index: '04', title: 'Defect intelligence notebook', type: 'Data / Research note', icon: <Database size={19} />, description: 'A small Python notebook for finding recurring defect themes across releases, severity, surface area, and escape point.', tags: ['Python', 'Pandas', 'SQL'], outcome: 'Converts defect history into prevention ideas.' },
];

const publications = [
  { date: 'RESEARCH NOTE / 2024', title: 'The shape of a trustworthy test', description: 'Why reliability is more than a green check: a field guide to signal, setup, isolation, and the quality of failure evidence.', accent: '01' },
  { date: 'RESEARCH NOTE / 2023', title: 'Visual validation without the screenshot wall', description: 'A practical approach to choosing visual assertions that protect customer experience without creating review fatigue.', accent: '02' },
  { date: 'RESEARCH NOTE / 2023', title: 'Making quality metrics explain themselves', description: 'A note on pairing release metrics with context, confidence, and a next action so dashboards stay useful after launch.', accent: '03' },
];

const honors = [
  { title: 'Quality Champion', detail: 'Recognized for making quality a shared product practice across engineering and support.', year: '2024' },
  { title: 'Automation Impact Award', detail: 'Awarded for a test platform that improved signal while lowering maintenance cost.', year: '2022' },
  { title: 'Open Source Contributor', detail: 'Contributed patterns and fixes around browser automation, test data, and developer tooling.', year: 'Ongoing' },
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
  const [value, setValue] = useState('');
  const [active, setActive] = useState('idle');
  const instant = 'Ajith is checking the path, not just the page.';
  const typeSlowly = () => {
    setValue('');
    setActive('typing');
    [...instant].forEach((_, index) => window.setTimeout(() => setValue(instant.slice(0, index + 1)), index * 24));
    window.setTimeout(() => setActive('typed'), instant.length * 24 + 50);
  };
  const fillInstantly = () => { setValue(instant); setActive('filled'); };
  const clearField = () => { setValue(''); setActive('cleared'); };
  return (
    <div className="grid-paper relative overflow-hidden border border-border bg-card/70">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.16em] text-muted-foreground"><Terminal size={14} className="text-primary" /> Live test fixture</div>
        <div className="flex items-center gap-2 font-mono-custom text-[10px] text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary pulse-line" /> Ready</div>
      </div>
      <div className="p-5 sm:p-7">
        <div className="mb-5 flex items-center gap-2 text-xs text-muted-foreground"><span className="font-mono-custom text-primary">01</span><span className="h-px w-5 bg-border" />Type into the field to see the harness respond.</div>
        <label htmlFor="automation-input" className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.13em] text-muted-foreground">message.input</label>
        <input id="automation-input" data-testid="input-automation-demo" value={value} readOnly className="focus-ring w-full border border-border bg-background px-3 py-3 font-mono-custom text-xs text-foreground placeholder:text-muted-foreground/60" placeholder="awaiting_action()" />
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" data-testid="button-type-slowly" onClick={typeSlowly} className="focus-ring flex items-center gap-2 border border-primary/40 px-3 py-2 font-mono-custom text-[10px] uppercase tracking-[.1em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"><Play size={12} /> Type slowly</button>
          <button type="button" data-testid="button-fill-instantly" onClick={fillInstantly} className="focus-ring border border-border px-3 py-2 font-mono-custom text-[10px] uppercase tracking-[.1em] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">Fill instantly</button>
          <button type="button" data-testid="button-clear-demo" onClick={clearField} className="focus-ring border border-border px-3 py-2 font-mono-custom text-[10px] uppercase tracking-[.1em] text-muted-foreground transition-colors hover:border-secondary/60 hover:text-secondary">Clear</button>
        </div>
        <div data-testid="status-automation-demo" className="mt-5 flex min-h-5 items-center gap-2 font-mono-custom text-[10px] text-muted-foreground"><CircleDot size={12} className={active === 'typing' ? 'text-secondary' : 'text-primary'} /> {active === 'idle' ? 'No action recorded yet.' : active === 'typing' ? 'Running character-by-character input…' : active === 'filled' ? 'setValue() completed in one pass.' : active === 'cleared' ? 'Field reset. Fixture is ready.' : 'Typing sequence completed.'}</div>
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
              <div className="mb-8 flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[.2em] text-muted-foreground"><span className="h-px w-8 bg-secondary" />Quality engineering / 09:42 local time</div>
              <h1 className="max-w-4xl font-display text-[clamp(3.2rem,8vw,7.3rem)] font-semibold leading-[.9] tracking-[-.075em] text-foreground">Make the<br /><span className="text-primary">unknown</span> testable.</h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">I’m <strong className="font-medium text-foreground">Ajith Reddy B.</strong>, a quality engineer and automation builder. I make complex web, API, mobile, and delivery work easier to understand—and harder to break.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href="#projects" data-testid="link-view-work" className="focus-ring inline-flex items-center gap-3 bg-primary px-5 py-3 font-mono-custom text-[11px] uppercase tracking-[.12em] text-primary-foreground transition-transform hover:-translate-y-0.5">View selected work <ArrowDownRight size={15} /></a>
                <a href="#contact" data-testid="link-hero-contact" className="focus-ring inline-flex items-center gap-2 px-2 py-3 font-mono-custom text-[11px] uppercase tracking-[.12em] text-muted-foreground transition-colors hover:text-primary">Let’s talk <MoveRight size={15} /></a>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="mb-3 flex justify-between font-mono-custom text-[10px] uppercase tracking-[.17em] text-muted-foreground"><span>01 / Field note</span><span>2024—25</span></div>
              <div className="border-l border-primary/50 pl-5 sm:pl-8">
                <p className="font-display text-2xl leading-snug tracking-[-.03em] text-foreground sm:text-3xl">“A green build is a useful event. A trustworthy signal is a system.”</p>
                <div className="mt-8 grid grid-cols-2 gap-5 border-t border-border pt-5">
                  <div><div className="font-display text-2xl text-primary">13+</div><div className="mt-1 font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">surfaces tested</div></div>
                  <div><div className="font-display text-2xl text-secondary">4</div><div className="mt-1 font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">systems in the lab</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="border-y border-border bg-card/50">
          <div className="mx-auto flex max-w-[1240px] flex-wrap gap-x-5 gap-y-3 px-5 py-4 lg:px-8"><span className="mr-2 font-mono-custom text-[10px] uppercase tracking-[.16em] text-secondary">Working across</span>{['WEB', 'API', 'MOBILE', 'DATA', 'CI/CD', 'OBSERVABILITY'].map((item) => <span key={item} className="font-mono-custom text-[10px] tracking-[.16em] text-muted-foreground">[{item}]</span>)}</div>
        </div>

        <section id="about" className="mx-auto max-w-[1240px] scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading eyebrow="About the practice" title="Quality is a way of making decisions.">
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">The best testing work is not a gate at the end. It is a clear, shared way to ask better questions earlier.</p>
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { number: '01', icon: <ShieldCheck size={20} />, title: 'Customer-focused quality', text: 'Start with the moments customers depend on. Trace risk from the real journey to the smallest useful check.' },
              { number: '02', icon: <Code2 size={20} />, title: 'Automation architecture', text: 'Build test systems with boundaries, diagnostics, and ownership—so adding coverage does not add a second product.' },
              { number: '03', icon: <Sparkles size={20} />, title: 'Practical AI-assisted testing', text: 'Use AI to explore, summarize, and find patterns. Keep judgment, intent, and the final signal human.' },
            ].map((item) => <article key={item.number} data-testid={`card-about-${item.number}`} className="border border-border bg-card/40 p-6 transition-colors hover:border-primary/45 sm:p-7"><div className="mb-10 flex items-center justify-between text-primary"><span className="font-mono-custom text-[10px] text-secondary">{item.number}</span>{item.icon}</div><h3 className="font-display text-xl tracking-[-.02em] text-foreground">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p></article>)}
          </div>
        </section>

        <section id="experience" className="section-rule mx-auto max-w-[1240px] scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading eyebrow="Experience" title="Systems over ceremony."><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">A timeline of making quality more visible, more useful, and less dependent on heroics.</p></SectionHeading>
          <div className="space-y-0">{experience.map((item, index) => <article key={item.role} data-testid={`card-experience-${index}`} className="grid gap-5 border-t border-border py-7 md:grid-cols-[150px_1fr_1.1fr] md:gap-8"><div className="font-mono-custom text-[11px] uppercase tracking-[.1em] text-secondary">{item.period}</div><div><h3 className="font-display text-2xl tracking-[-.03em] text-foreground">{item.role}</h3><div className="mt-1 font-mono-custom text-[10px] uppercase tracking-[.13em] text-primary">{item.company}</div><div className="mt-5 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="border border-border px-2 py-1 font-mono-custom text-[10px] text-muted-foreground">{tag}</span>)}</div></div><div><p className="mb-4 text-sm leading-6 text-foreground/80">{item.summary}</p><ul className="space-y-3">{item.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-sm leading-6 text-muted-foreground"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{bullet}</li>)}</ul></div></article>)}</div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28"><div className="mb-5 flex items-end justify-between"><div><div className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-secondary"><span className="mr-2 text-primary">/</span>Try the thinking</div><h2 className="mt-4 font-display text-3xl tracking-[-.04em] text-foreground sm:text-4xl">A small test, in public.</h2></div><span className="hidden font-mono-custom text-[10px] text-muted-foreground sm:block">fixture: message.input</span></div><div className="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><p className="max-w-md text-base leading-7 text-muted-foreground">Good automation makes behavior legible. Use the controls to see three different input strategies on the same field.</p><AutomationDemo /></div></section>

        <section id="education" className="section-rule mx-auto max-w-[1240px] scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading eyebrow="Education" title="Keep learning close to the work." />
          <div className="grid gap-4 md:grid-cols-2"><article className="border border-border bg-card/40 p-6 sm:p-8"><div className="flex justify-between font-mono-custom text-[10px] uppercase tracking-[.14em] text-muted-foreground"><span>Graduate study</span><span>Sample profile</span></div><h3 className="mt-12 font-display text-2xl text-foreground">M.S. in Computer Science / Data Analytics</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">A foundation in analytical thinking, systems, and using data to frame better engineering questions.</p></article><article className="border border-border bg-card/40 p-6 sm:p-8"><div className="flex justify-between font-mono-custom text-[10px] uppercase tracking-[.14em] text-muted-foreground"><span>Undergraduate</span><span>Sample profile</span></div><h3 className="mt-12 font-display text-2xl text-foreground">B.Tech. in Computer Science</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Where software fundamentals became a habit: understand the system, then decide what to verify.</p></article></div>
        </section>

        <section id="projects" className="mx-auto max-w-[1240px] scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading eyebrow="Selected projects" title="Tools with a point of view."><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Four working ideas for reducing uncertainty at different points in the delivery path.</p></SectionHeading>
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
          <SectionHeading eyebrow="Skills & toolkit" title="The stack is a means, not the story."><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Tools change. The useful habits stay: model the risk, isolate the signal, explain the failure.</p></SectionHeading>
          <div className="flex flex-wrap gap-2">{skills.map((skill, index) => <span key={skill} data-testid={`tag-skill-${index}`} className="border border-border bg-card/50 px-4 py-3 font-mono-custom text-xs text-foreground transition-colors hover:border-primary/60 hover:text-primary">{skill}</span>)}</div>
          <div className="mt-12 grid gap-4 md:grid-cols-3"><div className="border-l-2 border-primary p-4"><div className="font-mono-custom text-[10px] uppercase tracking-[.15em] text-primary">Build</div><p className="mt-2 text-sm text-muted-foreground">TypeScript, Java, Python, REST APIs, SQL</p></div><div className="border-l-2 border-secondary p-4"><div className="font-mono-custom text-[10px] uppercase tracking-[.15em] text-secondary">Verify</div><p className="mt-2 text-sm text-muted-foreground">Playwright, Selenium, Cypress, visual validation</p></div><div className="border-l-2 border-accent-foreground p-4"><div className="font-mono-custom text-[10px] uppercase tracking-[.15em] text-accent-foreground">Deliver</div><p className="mt-2 text-sm text-muted-foreground">GitHub Actions, Jenkins, Docker, observability</p></div></div>
        </section>

        <section id="contact" className="scroll-mt-20 border-t border-border bg-card/45"><div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 lg:grid-cols-[.85fr_1.15fr] lg:px-8 lg:py-28"><div><div className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-secondary"><span className="mr-2 text-primary">/</span>Contact</div><h2 className="mt-5 max-w-lg font-display text-4xl leading-[.98] tracking-[-.055em] text-foreground sm:text-6xl">Have a difficult system to make legible?</h2><p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">Tell me what you are trying to learn, protect, or ship. I’ll reply with a useful next question.</p><div className="mt-9 space-y-3"><a href="mailto:ajith.reddy@example.com" data-testid="link-email" className="focus-ring flex w-fit items-center gap-3 font-mono-custom text-xs text-primary hover:text-secondary"><Mail size={15} /> ajith.reddy@example.com</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" data-testid="link-linkedin" className="focus-ring flex w-fit items-center gap-3 font-mono-custom text-xs text-muted-foreground hover:text-primary"><Linkedin size={15} /> linkedin.com/in/ajith-reddy-b</a><a href="https://github.com" target="_blank" rel="noreferrer" data-testid="link-github" className="focus-ring flex w-fit items-center gap-3 font-mono-custom text-xs text-muted-foreground hover:text-primary"><Github size={15} /> github.com/ajith-reddy-b</a></div></div><form onSubmit={submitForm} className="border border-border bg-background p-5 sm:p-8"><div className="mb-7 flex items-center justify-between border-b border-border pb-4"><span className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-muted-foreground">Message form</span><span className="font-mono-custom text-[10px] text-primary">controlled / client-side</span></div><div className="grid gap-5 sm:grid-cols-2"><label className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">Name<input required value={formState.name} onChange={(event) => setFormState({ ...formState, name: event.target.value })} data-testid="input-contact-name" className="focus-ring mt-2 w-full border border-border bg-card px-3 py-3 font-sans text-sm normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground/60" placeholder="Your name" /></label><label className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">Email<input required type="email" value={formState.email} onChange={(event) => setFormState({ ...formState, email: event.target.value })} data-testid="input-contact-email" className="focus-ring mt-2 w-full border border-border bg-card px-3 py-3 font-sans text-sm normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground/60" placeholder="you@company.com" /></label></div><label className="mt-5 block font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground">Message<textarea required value={formState.message} onChange={(event) => setFormState({ ...formState, message: event.target.value })} data-testid="input-contact-message" rows={5} className="focus-ring mt-2 w-full resize-y border border-border bg-card px-3 py-3 font-sans text-sm normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground/60" placeholder="What are you working through?" /></label>{formError && <p data-testid="status-contact-error" className="mt-4 font-mono-custom text-xs text-destructive">{formError}</p>}{submitted && <div data-testid="status-contact-success" className="mt-4 flex items-center gap-2 border border-primary/35 bg-primary/10 px-3 py-3 font-mono-custom text-xs text-primary"><Check size={14} /> Message captured locally. Thanks, {formState.name.split(' ')[0]}.</div>}<button type="submit" data-testid="button-submit-contact" className="focus-ring mt-6 flex items-center gap-3 bg-primary px-5 py-3 font-mono-custom text-[11px] uppercase tracking-[.13em] text-primary-foreground transition-transform hover:-translate-y-0.5"><Send size={14} /> Send message</button></form></div></section>
      </main>
      <footer className="border-t border-border"><div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-7 font-mono-custom text-[10px] uppercase tracking-[.13em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>Ajith Reddy B. / Quality Engineering</span><span className="flex items-center gap-2"><Clock3 size={12} /> Built for clearer signals</span><span>© {new Date().getFullYear()} / editable sample</span></div></footer>
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
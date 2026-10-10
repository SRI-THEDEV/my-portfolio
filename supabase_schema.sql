-- ==============================================================================
-- SUPABASE SCHEMA SETUP FOR CREATIVE DEVELOPER PORTFOLIO
-- ==============================================================================
-- Copy and paste this script directly into your Supabase SQL Editor:
-- Supabase Dashboard -> Your Project -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. ENABLE EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. CREATE TABLES

-- Projects Table
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  number text,
  title text not null,
  subtitle text,
  category text,
  description text,
  tags text[] default '{}',
  "mockupText" jsonb default '{"heading": "", "subheading": ""}'::jsonb,
  "badgeColor" text default '#a855f7',
  "previewGradient" text default 'from-purple-900/50 via-[#18122B] to-[#0d0b14]',
  "liveUrl" text,
  "githubUrl" text,
  featured boolean default true,
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Services Table ("What I Do")
create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  number text,
  title text not null,
  description text,
  icon text,
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Toolkit Table (Technologies & Skills)
create table if not exists public.toolkit (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  "shortLabel" text,
  category text,
  "iconKey" text,
  level text default 'Advanced',
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Processes Table (Agile Timeline)
create table if not exists public.processes (
  id uuid default gen_random_uuid() primary key,
  step text,
  title text not null,
  description text,
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Profile Table (Developer Profile & Stats)
create table if not exists public.profile (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text,
  headline text,
  tagline text,
  "availableForProjects" boolean default true,
  "badgeInitials" text default 'SN',
  "badgeText" text default 'SRI NATARAJ Y • CODE • DEPLOY •',
  phone text,
  location text,
  summary text,
  education text,
  stats jsonb default '{"experience": "1+", "projectsDelivered": "15+", "happyClients": "10+", "technologies": "10+"}'::jsonb,
  "whatIDoDescription" text,
  "ctaText" jsonb default '{"title": "LET''S BUILD SOMETHING AMAZING TOGETHER.", "description": "I''m open to new opportunities and exciting collaborations."}'::jsonb,
  socials jsonb default '{}'::jsonb,
  "resumeUrl" text default '/Sri_Nataraj_Y_Resume.pdf',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Messages Table (Contact Inquiries)
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text default 'General Inquiry',
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.toolkit enable row level security;
alter table public.processes enable row level security;
alter table public.profile enable row level security;
alter table public.messages enable row level security;

-- Drop existing policies if re-running
drop policy if exists "Allow public read projects" on public.projects;
drop policy if exists "Allow all on projects" on public.projects;
drop policy if exists "Allow public read services" on public.services;
drop policy if exists "Allow all on services" on public.services;
drop policy if exists "Allow public read toolkit" on public.toolkit;
drop policy if exists "Allow all on toolkit" on public.toolkit;
drop policy if exists "Allow public read processes" on public.processes;
drop policy if exists "Allow all on processes" on public.processes;
drop policy if exists "Allow public read profile" on public.profile;
drop policy if exists "Allow all on profile" on public.profile;
drop policy if exists "Allow public insert messages" on public.messages;
drop policy if exists "Allow all on messages" on public.messages;

-- Public can read content
create policy "Allow public read projects" on public.projects for select using (true);
create policy "Allow public read services" on public.services for select using (true);
create policy "Allow public read toolkit" on public.toolkit for select using (true);
create policy "Allow public read processes" on public.processes for select using (true);
create policy "Allow public read profile" on public.profile for select using (true);

-- Allow public to send messages (Contact form)
create policy "Allow public insert messages" on public.messages for insert with check (true);

-- Allow anon & service role full write/read access (Managed securely by backend API)
create policy "Allow all on projects" on public.projects for all using (true) with check (true);
create policy "Allow all on services" on public.services for all using (true) with check (true);
create policy "Allow all on toolkit" on public.toolkit for all using (true) with check (true);
create policy "Allow all on processes" on public.processes for all using (true) with check (true);
create policy "Allow all on profile" on public.profile for all using (true) with check (true);
create policy "Allow all on messages" on public.messages for all using (true) with check (true);

-- 4. INSERT INITIAL DATA (Only if tables are empty)

-- Projects Seed
insert into public.projects (number, title, subtitle, category, description, tags, "mockupText", "badgeColor", "previewGradient", "liveUrl", "githubUrl", featured, "order")
select
  '01',
  'BRANDIX STUDIO',
  'Elevate Your Brand',
  'Web Design & Development',
  'A cutting-edge agency website featuring a dark luxury purple aesthetic, smooth micro-interactions, responsive typography, and high-performance serverless endpoints.',
  array['React', 'Tailwind CSS', 'Framer Motion', 'Node.js'],
  '{"heading": "Elevate Your Brand", "subheading": "Digital experiences engineered for ambitious brands"}'::jsonb,
  '#a855f7',
  'from-purple-900/50 via-[#18122B] to-[#0d0b14]',
  'https://brandix-studio-preview.vercel.app',
  'https://github.com/developer/brandix-studio',
  true,
  1
where not exists (select 1 from public.projects limit 1);

insert into public.projects (number, title, subtitle, category, description, tags, "mockupText", "badgeColor", "previewGradient", "liveUrl", "githubUrl", featured, "order")
select
  '02',
  'TASKLY APP',
  'Manage Projects Like a Pro',
  'Dashboard Design & Development',
  'A cloud-based project management dashboard equipped with interactive Kanban boards, automated workflow triggers, sprint tracking, and team productivity analytics.',
  array['React', 'Express', 'Supabase', 'Chart.js'],
  '{"heading": "Manage Projects Like a Pro", "subheading": "Agile sprints, custom stages & instant activity feeds"}'::jsonb,
  '#8b5cf6',
  'from-violet-950/60 via-[#1d1533] to-[#0d0b14]',
  'https://taskly-app-demo.vercel.app',
  'https://github.com/developer/taskly-app',
  true,
  2
where not exists (select 1 from public.projects where title = 'TASKLY APP');

insert into public.projects (number, title, subtitle, category, description, tags, "mockupText", "badgeColor", "previewGradient", "liveUrl", "githubUrl", featured, "order")
select
  '03',
  'HOSTERIA',
  'Ultra Fast Web Hosting',
  'Landing Page Design & Development',
  'A high-converting SaaS landing page for next-gen serverless hosting, featuring instant domain search lookup, live ping latency monitors, and pricing calculators.',
  array['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
  '{"heading": "Ultra Fast Web Hosting", "subheading": "Deploy globally with sub-millisecond edge latency"}'::jsonb,
  '#7c3aed',
  'from-indigo-950/60 via-[#19142b] to-[#0d0b14]',
  'https://hosteria-cloud-demo.vercel.app',
  'https://github.com/developer/hosteria-cloud',
  true,
  3
where not exists (select 1 from public.projects where title = 'HOSTERIA');

-- Services Seed
insert into public.services (number, title, description, icon, "order")
select '01', 'WEB DESIGN', 'Pixel-perfect designs that combine creativity with strategy.', 'Compass', 1
where not exists (select 1 from public.services limit 1);

insert into public.services (number, title, description, icon, "order")
select '02', 'WEB DEVELOPMENT', 'Clean, scalable code with modern frameworks and best practices.', 'Code', 2
where not exists (select 1 from public.services where number = '02');

insert into public.services (number, title, description, icon, "order")
select '03', 'UI/UX DESIGN', 'Intuitive interfaces designed for seamless user experiences.', 'Layers', 3
where not exists (select 1 from public.services where number = '03');

insert into public.services (number, title, description, icon, "order")
select '04', 'OPTIMIZATION', 'Speed, SEO and performance tweaks that drive results.', 'Zap', 4
where not exists (select 1 from public.services where number = '04');

-- Toolkit Seed
insert into public.toolkit (name, "shortLabel", category, "iconKey", level, "order")
select 'HTML5', '5', 'frontend', 'html5', 'Expert', 1 where not exists (select 1 from public.toolkit limit 1);
insert into public.toolkit (name, "shortLabel", category, "iconKey", level, "order")
select 'CSS3', '3', 'frontend', 'css3', 'Expert', 2 where not exists (select 1 from public.toolkit where name = 'CSS3');
insert into public.toolkit (name, "shortLabel", category, "iconKey", level, "order")
select 'JavaScript', 'JS', 'frontend', 'javascript', 'Expert', 3 where not exists (select 1 from public.toolkit where name = 'JavaScript');
insert into public.toolkit (name, "shortLabel", category, "iconKey", level, "order")
select 'TypeScript', 'TS', 'frontend', 'typescript', 'Advanced', 4 where not exists (select 1 from public.toolkit where name = 'TypeScript');
insert into public.toolkit (name, "shortLabel", category, "iconKey", level, "order")
select 'React', '⚛', 'frontend', 'react', 'Expert', 5 where not exists (select 1 from public.toolkit where name = 'React');
insert into public.toolkit (name, "shortLabel", category, "iconKey", level, "order")
select 'Next.js', 'N', 'frontend', 'nextjs', 'Advanced', 6 where not exists (select 1 from public.toolkit where name = 'Next.js');
insert into public.toolkit (name, "shortLabel", category, "iconKey", level, "order")
select 'Tailwind CSS', '≋', 'frontend', 'tailwind', 'Expert', 7 where not exists (select 1 from public.toolkit where name = 'Tailwind CSS');
insert into public.toolkit (name, "shortLabel", category, "iconKey", level, "order")
select 'Node.js', '⬢', 'backend', 'nodejs', 'Expert', 8 where not exists (select 1 from public.toolkit where name = 'Node.js');
insert into public.toolkit (name, "shortLabel", category, "iconKey", level, "order")
select 'Git & GitHub', '🐙', 'tools', 'git', 'Advanced', 9 where not exists (select 1 from public.toolkit where name = 'Git & GitHub');
insert into public.toolkit (name, "shortLabel", category, "iconKey", level, "order")
select 'Figma', '❖', 'design', 'figma', 'Advanced', 10 where not exists (select 1 from public.toolkit where name = 'Figma');
insert into public.toolkit (name, "shortLabel", category, "iconKey", level, "order")
select 'VS Code', '><', 'tools', 'vscode', 'Expert', 11 where not exists (select 1 from public.toolkit where name = 'VS Code');
insert into public.toolkit (name, "shortLabel", category, "iconKey", level, "order")
select 'Supabase', '⚡', 'database', 'database', 'Advanced', 12 where not exists (select 1 from public.toolkit where name = 'Supabase');

-- Processes Seed
insert into public.processes (step, title, description, "order")
select '01', 'DISCOVER', 'Understanding your goals, audience and requirements.', 1 where not exists (select 1 from public.processes limit 1);
insert into public.processes (step, title, description, "order")
select '02', 'DESIGN', 'Creating wireframes and visuals that communicate.', 2 where not exists (select 1 from public.processes where step = '02');
insert into public.processes (step, title, description, "order")
select '03', 'DEVELOP', 'Building clean, responsive and scalable solutions.', 3 where not exists (select 1 from public.processes where step = '03');
insert into public.processes (step, title, description, "order")
select '04', 'DELIVER', 'Testing, optimizing and launching with care.', 4 where not exists (select 1 from public.processes where step = '04');

-- Profile Seed
insert into public.profile (name, role, headline, tagline, "availableForProjects", "badgeInitials", "badgeText", phone, location, summary, education, stats, "whatIDoDescription", "ctaText", socials, "resumeUrl")
select
  'SRI NATARAJ Y',
  'CREATIVE DEVELOPER',
  'I DESIGN & CODE DIGITAL EXPERIENCES THAT INSPIRE.',
  '</ CODE. DESIGN. DEPLOY />',
  true,
  'SN',
  'SRI NATARAJ Y • CODE • DEPLOY •',
  '+91 7639989629',
  'Thanjavur, Tamil Nadu',
  'Motivated Computer Science graduate proficient in Python, JavaScript, and database management. Experienced in full-stack web development through internships and hands-on projects. Combines strong problem-solving skills with modern developer tools to build scalable, efficient web applications. Seeking an entry-level Software Engineering role.',
  'B.Sc. Computer Science — SRM Trichy Arts and Science College, Trichy | CGPA: 6.6/10',
  '{"experience": "1+", "projectsDelivered": "15+", "happyClients": "10+", "technologies": "10+"}'::jsonb,
  'I design, build and ship modern websites and web applications that are fast, responsive and user-focused.',
  '{"title": "LET''S BUILD SOMETHING AMAZING TOGETHER.", "description": "I''m open to new opportunities and exciting collaborations."}'::jsonb,
  '{"github": "https://github.com/SRI-THEDEV", "linkedin": "https://www.linkedin.com/in/sri-nataraj2006", "twitter": "https://x.com/SRINATARAJ39", "email": "srinataraj39@gmail.com", "phone": "+91 7639989629", "location": "Thanjavur, Tamil Nadu"}'::jsonb,
  '/Sri_Nataraj_Y_Resume.pdf'
where not exists (select 1 from public.profile limit 1);

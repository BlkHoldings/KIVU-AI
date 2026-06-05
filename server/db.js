import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'data.db'));

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    location TEXT NOT NULL,
    bio TEXT,
    skills TEXT DEFAULT '[]',
    github TEXT,
    linkedin TEXT,
    twitter TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    tech_stack TEXT DEFAULT '[]',
    github_url TEXT,
    demo_url TEXT,
    author_id INTEGER,
    author_name TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (author_id) REFERENCES members(id)
  );
`);

function seed() {
  const { count } = db.prepare('SELECT COUNT(*) as count FROM members').get();
  if (count > 0) return;

  const insertMember = db.prepare(
    `INSERT INTO members (name, role, location, bio, skills, github, linkedin, twitter)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );

  const members = [
    ['Amara Diallo', 'ML Engineer', 'Dakar, Senegal', 'Building AI solutions for healthcare in West Africa. Passionate about making ML accessible to everyone.', JSON.stringify(['Python', 'TensorFlow', 'PyTorch', 'FastAPI']), 'amaradiallo', 'amara-diallo', 'amaradiallo_ai'],
    ['Kwame Mensah', 'Full Stack Developer', 'Accra, Ghana', 'Founder of two startups. Love building products that solve real African problems with elegant code.', JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'Docker']), 'kwamemensah', 'kwame-mensah', null],
    ['Fatima Al-Rashid', 'AI Researcher', 'Casablanca, Morocco', 'Researching NLP for low-resource African languages. PhD candidate at Mohammed V University.', JSON.stringify(['NLP', 'Transformers', 'Python', 'HuggingFace']), 'fatimaalrashid', null, 'fatima_nlp'],
    ['Chidi Okonkwo', 'Startup Founder', 'Lagos, Nigeria', 'Serial entrepreneur building the future of fintech in Africa. YC Alum W23. Previously Paystack.', JSON.stringify(['Product', 'Fintech', 'Strategy', 'Fundraising']), 'chidiokonkwo', 'chidi-okonkwo', 'chidiokonkwo'],
    ['Aisha Kamara', 'Data Scientist', 'Kigali, Rwanda', 'Using data to drive development policy across East Africa. World Bank consultant and open data advocate.', JSON.stringify(['Python', 'R', 'SQL', 'Tableau', 'Statistics']), 'aishakamara', 'aisha-kamara', null],
    ['Tendai Moyo', 'DevOps Engineer', 'Harare, Zimbabwe', 'Cloud infrastructure specialist helping African startups scale reliably. AWS Solutions Architect certified.', JSON.stringify(['AWS', 'Kubernetes', 'Terraform', 'CI/CD']), 'tendaimoyo', 'tendai-moyo', 'tendai_devops'],
    ['Nadia Osei', 'UX Designer', 'Accra, Ghana', 'Designing human-centered products for African users. Previously at Jumia and Paystack. Design systems nerd.', JSON.stringify(['Figma', 'Design Systems', 'User Research', 'Prototyping']), null, 'nadia-osei', 'nadia_designs'],
    ['Ibrahim Touré', 'Backend Engineer', 'Bamako, Mali', 'Distributed systems engineer building resilient infrastructure for low-connectivity environments across the Sahel.', JSON.stringify(['Go', 'Rust', 'PostgreSQL', 'Redis', 'gRPC']), 'ibrahimtoure', 'ibrahim-toure', null],
  ];

  const insertAllMembers = db.transaction(() => {
    for (const m of members) insertMember.run(...m);
  });
  insertAllMembers();

  const insertProject = db.prepare(
    `INSERT INTO projects (title, description, category, tech_stack, github_url, demo_url, author_id, author_name)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );

  const projects = [
    ['CropSense', 'AI-powered crop disease detection using smartphone cameras. Helps smallholder farmers identify plant diseases early and receive treatment recommendations in their local language.', 'AI/ML', JSON.stringify(['Python', 'TensorFlow', 'React Native', 'FastAPI']), 'github.com/example/cropsense', null, 1, 'Amara Diallo'],
    ['AfriPay', 'Cross-border payment infrastructure enabling instant, low-cost transactions across 54 African countries using blockchain technology and local mobile money integrations.', 'Fintech', JSON.stringify(['Solidity', 'React', 'Node.js', 'Web3.js']), 'github.com/example/afripay', 'afripay.demo', 4, 'Chidi Okonkwo'],
    ['TunaHealth', 'AI health diagnostic assistant trained on African disease patterns. Provides triage recommendations in 12 local languages via SMS and WhatsApp.', 'HealthTech', JSON.stringify(['Python', 'NLP', 'React', 'PostgreSQL']), 'github.com/example/tunahealth', null, 3, 'Fatima Al-Rashid'],
    ['EduBot', 'Adaptive learning platform powered by AI that personalizes education for students in resource-constrained schools. Works offline and syncs when connected.', 'EdTech', JSON.stringify(['Python', 'React', 'Node.js', 'MongoDB']), 'github.com/example/edubot', 'edubot.demo', 2, 'Kwame Mensah'],
    ['JuaData', 'Open dataset platform aggregating African economic, climate, and social data for researchers and policy makers. 500+ curated datasets.', 'Data', JSON.stringify(['Python', 'PostgreSQL', 'FastAPI', 'React', 'D3.js']), 'github.com/example/juadata', 'juadata.demo', 5, 'Aisha Kamara'],
    ['SafeRoute', 'Real-time urban safety mapping using crowdsourced incident reports and ML to suggest safer routes in African cities. Currently live in Lagos and Nairobi.', 'AI/ML', JSON.stringify(['Python', 'React Native', 'Node.js', 'Maps API']), 'github.com/example/saferoute', null, 1, 'Amara Diallo'],
    ['KuberAfrica', 'Managed Kubernetes platform optimised for African cloud providers with automatic failover for unreliable connectivity and bandwidth-aware scheduling.', 'DevOps', JSON.stringify(['Go', 'Kubernetes', 'Terraform', 'Prometheus']), 'github.com/example/kuberafrica', null, 6, 'Tendai Moyo'],
    ['AfriLang', 'Large language model pre-trained on 25 African languages. Open source, fine-tunable for downstream NLP tasks including translation, classification, and summarisation.', 'AI/ML', JSON.stringify(['Python', 'PyTorch', 'Transformers', 'CUDA']), 'github.com/example/afrilang', null, 3, 'Fatima Al-Rashid'],
  ];

  const insertAllProjects = db.transaction(() => {
    for (const p of projects) insertProject.run(...p);
  });
  insertAllProjects();

  console.log('Database seeded with sample data.');
}

seed();

export default db;

import Link from 'next/link';
import MemberCard from '@/components/MemberCard';
import ProjectCard from '@/components/ProjectCard';
import { MEMBERS_DATA, PROJECTS_DATA } from '@/lib/seed-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchMembers() {
  try {
    const res = await fetch(`${API_URL}/api/members`, { next: { revalidate: 60 } });
    return res.ok ? res.json() : MEMBERS_DATA;
  } catch {
    return MEMBERS_DATA;
  }
}

async function fetchProjects() {
  try {
    const res = await fetch(`${API_URL}/api/projects`, { next: { revalidate: 60 } });
    return res.ok ? res.json() : PROJECTS_DATA;
  } catch {
    return PROJECTS_DATA;
  }
}

const features = [
  {
    icon: '🤝',
    title: 'Discover Talent',
    description: 'Find skilled AI engineers, founders, and developers from across Africa building the next generation of products.',
  },
  {
    icon: '🚀',
    title: 'Showcase Projects',
    description: "Share what you're building with the community. Get feedback, find collaborators, and inspire others.",
  },
  {
    icon: '🌍',
    title: 'Build Together',
    description: 'Connect with builders who share your passion for solving African problems with cutting-edge technology.',
  },
];

export default async function HomePage() {
  const [members, projects] = await Promise.all([fetchMembers(), fetchProjects()]);

  const featuredMembers = members.slice(0, 3);
  const featuredProjects = projects.slice(0, 3);
  const countries = new Set(members.map(m => m.location.split(',').slice(-1)[0].trim())).size;

  return (
    <main>
      <section className="relative overflow-hidden bg-brand-dark border-b border-brand-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.12),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(245,158,11,0.08),_transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-700/40 rounded-full px-4 py-1.5 text-sm text-emerald-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Now in open beta — join the community
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6">
            <span className="gradient-text">Build. Connect. Scale.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The premier community for AI engineers, founders, and innovators
            across Africa. Discover talent, showcase projects, and shape the
            continent's tech future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/members"
              className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors"
            >
              Explore Members
            </Link>
            <Link
              href="/projects"
              className="px-8 py-3.5 bg-brand-surface hover:bg-gray-700 border border-brand-border text-white font-semibold rounded-lg transition-colors"
            >
              Browse Projects
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            {[
              { value: `${members.length}+`, label: 'Builders' },
              { value: `${projects.length}+`, label: 'Projects' },
              { value: `${countries}+`, label: 'Countries' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What We Offer</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Everything you need to grow as a builder in Africa's AI ecosystem.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(f => (
            <div
              key={f.title}
              className="bg-brand-surface border border-brand-border rounded-xl p-8 card-hover"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {featuredMembers.length > 0 && (
        <section className="bg-brand-surface border-y border-brand-border">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Builders</h2>
                <p className="text-gray-400">Meet some of our talented community members.</p>
              </div>
              <Link
                href="/members"
                className="hidden sm:inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                View all members <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMembers.map(member => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
            <div className="mt-8 sm:hidden text-center">
              <Link href="/members" className="text-emerald-400 hover:text-emerald-300 font-medium">
                View all members →
              </Link>
            </div>
          </div>
        </section>
      )}

      {featuredProjects.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
              <p className="text-gray-400">Innovative solutions built by our community.</p>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              View all projects <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-8 sm:hidden text-center">
            <Link href="/projects" className="text-emerald-400 hover:text-emerald-300 font-medium">
              View all projects →
            </Link>
          </div>
        </section>
      )}

      <section className="bg-gradient-to-br from-emerald-900/40 to-amber-900/20 border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to build the future of Africa?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of builders, founders, and innovators who are shaping
            Africa's AI and startup ecosystem.
          </p>
          <Link
            href="/members"
            className="inline-flex items-center gap-2 px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg text-lg transition-colors"
          >
            Join the Community
          </Link>
        </div>
      </section>
    </main>
  );
}

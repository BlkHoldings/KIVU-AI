import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MEMBERS_DATA, PROJECTS_DATA } from '@/lib/seed-data';
import { avatarColor } from '@/lib/utils';

const CATEGORY_STYLES = {
  'AI/ML':      'bg-purple-900/40 text-purple-300 border-purple-700/40',
  'Fintech':    'bg-emerald-900/40 text-emerald-300 border-emerald-700/40',
  'HealthTech': 'bg-red-900/40 text-red-300 border-red-700/40',
  'EdTech':     'bg-blue-900/40 text-blue-300 border-blue-700/40',
  'Data':       'bg-amber-900/40 text-amber-300 border-amber-700/40',
  'DevOps':     'bg-cyan-900/40 text-cyan-300 border-cyan-700/40',
};

export function generateStaticParams() {
  return PROJECTS_DATA.map(p => ({ id: String(p.id) }));
}

export function generateMetadata({ params }) {
  const project = PROJECTS_DATA.find(p => String(p.id) === params.id);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectPage({ params }) {
  const project = PROJECTS_DATA.find(p => String(p.id) === params.id);
  if (!project) notFound();

  const author = MEMBERS_DATA.find(m => m.id === project.author_id);
  const categoryClass = CATEGORY_STYLES[project.category] || 'bg-gray-800 text-gray-300 border-gray-700';

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-10 transition-colors"
      >
        ← Back to Projects
      </Link>

      <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-3">{project.title}</h1>
            <span className={`text-sm font-medium px-3 py-1 rounded-full border ${categoryClass}`}>
              {project.category}
            </span>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            {project.github_url && (
              <a
                href={`https://${project.github_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg border border-gray-700 text-sm transition-colors"
              >
                GitHub →
              </a>
            )}
            {project.demo_url && (
              <a
                href={`https://${project.demo_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Live Demo →
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">About</h2>
          <p className="text-gray-300 leading-relaxed">{project.description}</p>
        </div>

        {/* Tech stack */}
        {project.tech_stack?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-full border border-gray-700 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author */}
        {author && (
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Built by</h2>
            <Link
              href={`/members/${author.id}`}
              className="inline-flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 transition-colors"
            >
              <div
                className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColor(author.name)} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}
              >
                {author.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{author.name}</p>
                <p className="text-gray-500 text-xs">{author.role}</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

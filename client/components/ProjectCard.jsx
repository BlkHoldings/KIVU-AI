import Link from 'next/link';

const CATEGORY_STYLES = {
  'AI/ML':      'bg-purple-900/40 text-purple-300 border-purple-700/40',
  'Fintech':    'bg-emerald-900/40 text-emerald-300 border-emerald-700/40',
  'HealthTech': 'bg-red-900/40 text-red-300 border-red-700/40',
  'EdTech':     'bg-blue-900/40 text-blue-300 border-blue-700/40',
  'Data':       'bg-amber-900/40 text-amber-300 border-amber-700/40',
  'DevOps':     'bg-cyan-900/40 text-cyan-300 border-cyan-700/40',
};

export default function ProjectCard({ project }) {
  const categoryClass = CATEGORY_STYLES[project.category] || 'bg-gray-800 text-gray-300 border-gray-700';

  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl p-6 flex flex-col gap-4 card-hover">
      {/* Category badge + external links */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryClass}`}>
          {project.category}
        </span>
        <div className="flex gap-2">
          {project.github_url && (
            <a
              href={`https://${project.github_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="GitHub repository"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}
          {project.demo_url && (
            <a
              href={`https://${project.demo_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-emerald-400 transition-colors"
              aria-label="Live demo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Title & description */}
      <div>
        <Link href={`/projects/${project.id}`} className="hover:text-emerald-400 transition-colors">
          <h3 className="text-white font-semibold text-lg mb-2">{project.title}</h3>
        </Link>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{project.description}</p>
      </div>

      {/* Tech stack */}
      {project.tech_stack?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.tech_stack.slice(0, 4).map(tech => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded border border-gray-700"
            >
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="text-xs px-2 py-0.5 text-gray-600">
              +{project.tech_stack.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Author + view details */}
      <div className="mt-auto pt-3 border-t border-brand-border flex items-center justify-between">
        {project.author_name ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{project.author_name}</span>
          </div>
        ) : <div />}
        <Link
          href={`/projects/${project.id}`}
          className="text-xs text-emerald-500 hover:text-emerald-400 font-medium transition-colors"
        >
          View details →
        </Link>
      </div>
    </div>
  );
}

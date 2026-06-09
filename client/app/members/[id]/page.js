import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MEMBERS_DATA, PROJECTS_DATA } from '@/lib/seed-data';
import { avatarColor } from '@/lib/utils';

export function generateStaticParams() {
  return MEMBERS_DATA.map(m => ({ id: String(m.id) }));
}

export function generateMetadata({ params }) {
  const member = MEMBERS_DATA.find(m => String(m.id) === params.id);
  if (!member) return { title: 'Member Not Found' };
  return {
    title: member.name,
    description: member.bio,
  };
}

export default function MemberPage({ params }) {
  const member = MEMBERS_DATA.find(m => String(m.id) === params.id);
  if (!member) notFound();

  const memberProjects = PROJECTS_DATA.filter(p => p.author_id === member.id);
  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/members"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-10 transition-colors"
      >
        ← Back to Members
      </Link>

      <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 mb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
          <div
            className={`w-20 h-20 rounded-full bg-gradient-to-br ${avatarColor(member.name)} flex items-center justify-center text-white font-bold text-2xl flex-shrink-0`}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-white mb-1">{member.name}</h1>
            <p className="text-emerald-400 font-medium mb-2">{member.role}</p>
            <p className="text-gray-500 text-sm">📍 {member.location}</p>
          </div>
        </div>

        {/* Bio */}
        {member.bio && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">About</h2>
            <p className="text-gray-300 leading-relaxed">{member.bio}</p>
          </div>
        )}

        {/* Skills */}
        {member.skills?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {member.skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-full border border-gray-700 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Connect */}
        {(member.github || member.linkedin || member.twitter) && (
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Connect</h2>
            <div className="flex flex-wrap gap-3">
              {member.github && (
                <a
                  href={`https://github.com/${member.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg border border-gray-700 text-sm transition-colors"
                >
                  GitHub →
                </a>
              )}
              {member.linkedin && (
                <a
                  href={`https://linkedin.com/in/${member.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg border border-gray-700 text-sm transition-colors"
                >
                  LinkedIn →
                </a>
              )}
              {member.twitter && (
                <a
                  href={`https://twitter.com/${member.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg border border-gray-700 text-sm transition-colors"
                >
                  Twitter / X →
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Member's projects */}
      {memberProjects.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-6">
            Projects by {member.name.split(' ')[0]}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {memberProjects.map(project => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="bg-brand-surface border border-brand-border rounded-xl p-5 card-hover block"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-white font-semibold">{project.title}</h3>
                  <span className="text-xs px-2 py-1 bg-purple-900/40 text-purple-300 border border-purple-700/40 rounded-full flex-shrink-0">
                    {project.category}
                  </span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

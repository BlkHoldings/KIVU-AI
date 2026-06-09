import Link from 'next/link';
import { avatarColor } from '@/lib/utils';

const ROLE_BADGE_COLORS = {
  'ML Engineer':          'bg-purple-900/40 text-purple-300 border border-purple-700/40',
  'AI Researcher':        'bg-indigo-900/40 text-indigo-300 border border-indigo-700/40',
  'Full Stack Developer': 'bg-blue-900/40 text-blue-300 border border-blue-700/40',
  'Backend Engineer':     'bg-cyan-900/40 text-cyan-300 border border-cyan-700/40',
  'Startup Founder':      'bg-amber-900/40 text-amber-300 border border-amber-700/40',
  'Data Scientist':       'bg-teal-900/40 text-teal-300 border border-teal-700/40',
  'DevOps Engineer':      'bg-orange-900/40 text-orange-300 border border-orange-700/40',
  'UX Designer':          'bg-pink-900/40 text-pink-300 border border-pink-700/40',
};

export default function MemberCard({ member }) {
  const initials = member.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const badgeClass = ROLE_BADGE_COLORS[member.role] || 'bg-gray-800 text-gray-300 border border-gray-700';

  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl p-6 flex flex-col gap-4 card-hover">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link href={`/members/${member.id}`} className="flex-shrink-0">
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarColor(member.name)} flex items-center justify-center text-white font-bold text-sm hover:opacity-80 transition-opacity`}
          >
            {initials}
          </div>
        </Link>
        <div className="min-w-0">
          <Link href={`/members/${member.id}`} className="hover:text-emerald-400 transition-colors">
            <h3 className="text-white font-semibold text-base leading-tight truncate">
              {member.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{member.location}</span>
          </div>
        </div>
      </div>

      {/* Role */}
      <span className={`self-start text-xs font-medium px-2.5 py-1 rounded-full ${badgeClass}`}>
        {member.role}
      </span>

      {/* Bio */}
      {member.bio && (
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{member.bio}</p>
      )}

      {/* Skills */}
      {member.skills?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {member.skills.slice(0, 4).map(skill => (
            <span
              key={skill}
              className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded border border-gray-700"
            >
              {skill}
            </span>
          ))}
          {member.skills.length > 4 && (
            <span className="text-xs px-2 py-0.5 text-gray-600">
              +{member.skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Social links + view profile */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-brand-border">
        <div className="flex gap-3">
          {member.github && (
            <a
              href={`https://github.com/${member.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}
          {member.linkedin && (
            <a
              href={`https://linkedin.com/in/${member.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
          {member.twitter && (
            <a
              href={`https://twitter.com/${member.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-sky-400 transition-colors"
              aria-label="Twitter / X"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          )}
        </div>
        <Link
          href={`/members/${member.id}`}
          className="text-xs text-emerald-500 hover:text-emerald-400 font-medium transition-colors"
        >
          View profile →
        </Link>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { PROJECTS_DATA } from '@/lib/seed-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const CATEGORIES = ['All', 'AI/ML', 'Fintech', 'HealthTech', 'EdTech', 'Data', 'DevOps'];

const CATEGORY_COLORS = {
  'AI/ML':      'bg-purple-900/40 text-purple-300 border-purple-700/50',
  'Fintech':    'bg-emerald-900/40 text-emerald-300 border-emerald-700/50',
  'HealthTech': 'bg-red-900/40 text-red-300 border-red-700/50',
  'EdTech':     'bg-blue-900/40 text-blue-300 border-blue-700/50',
  'Data':       'bg-amber-900/40 text-amber-300 border-amber-700/50',
  'DevOps':     'bg-cyan-900/40 text-cyan-300 border-cyan-700/50',
};

function filterLocally(data, { search, category }) {
  return data.filter(p => {
    if (category && category !== 'All' && p.category !== category) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.author_name?.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (category !== 'All') params.set('category', category);
      const res = await fetch(`${API_URL}/api/projects?${params}`);
      if (!res.ok) throw new Error();
      setProjects(await res.json());
    } catch {
      setProjects(filterLocally(PROJECTS_DATA, { search, category }));
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    const timer = setTimeout(fetchProjects, 250);
    return () => clearTimeout(timer);
  }, [fetchProjects]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">Project Showcase</h1>
        <p className="text-gray-400 text-lg">
          Explore innovative solutions being built by African AI engineers and founders.
        </p>
      </div>

      <div className="relative mb-6">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search projects…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-brand-surface border border-brand-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              category === cat
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : cat === 'All'
                  ? 'bg-transparent border-brand-border text-gray-400 hover:border-emerald-500 hover:text-emerald-400'
                  : `${CATEGORY_COLORS[cat] || 'bg-transparent border-brand-border text-gray-400'} hover:opacity-80`
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-brand-surface border border-brand-border rounded-xl p-6 animate-pulse">
              <div className="h-5 bg-gray-700 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-700 rounded w-full mb-2" />
              <div className="h-3 bg-gray-700 rounded w-5/6 mb-2" />
              <div className="h-3 bg-gray-700 rounded w-4/6" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <div className="text-5xl mb-4">🔭</div>
          <p className="text-lg">No projects found matching your filters.</p>
          <button
            onClick={() => { setSearch(''); setCategory('All'); }}
            className="mt-4 text-emerald-400 hover:text-emerald-300 font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-sm mb-6">
            {projects.length} project{projects.length !== 1 ? 's' : ''} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

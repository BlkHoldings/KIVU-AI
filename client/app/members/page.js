'use client';

import { useState, useEffect, useCallback } from 'react';
import MemberCard from '@/components/MemberCard';
import { MEMBERS_DATA } from '@/lib/seed-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const ROLES = ['All', 'ML Engineer', 'AI Researcher', 'Full Stack Developer', 'Backend Engineer', 'Startup Founder', 'Data Scientist', 'DevOps Engineer', 'UX Designer'];

function filterLocally(data, { search, role }) {
  return data.filter(m => {
    if (role && role !== 'All' && m.role !== role) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.bio?.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q) ||
        (m.skills || []).some(s => s.toLowerCase().includes(q))
      );
    }
    return true;
  });
}

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All');

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (role !== 'All') params.set('role', role);
      const res = await fetch(`${API_URL}/api/members?${params}`);
      if (!res.ok) throw new Error();
      setMembers(await res.json());
    } catch {
      setMembers(filterLocally(MEMBERS_DATA, { search, role }));
    } finally {
      setLoading(false);
    }
  }, [search, role]);

  useEffect(() => {
    const timer = setTimeout(fetchMembers, 250);
    return () => clearTimeout(timer);
  }, [fetchMembers]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">Member Directory</h1>
        <p className="text-gray-400 text-lg">
          Discover talented AI builders, founders, and innovators from across Africa.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1">
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
            placeholder="Search by name, skill, or location…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-brand-surface border border-brand-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {ROLES.map(r => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              role === r
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'bg-transparent border-brand-border text-gray-400 hover:border-emerald-500 hover:text-emerald-400'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-brand-surface border border-brand-border rounded-xl p-6 animate-pulse">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-700" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-700 rounded w-1/2" />
                </div>
              </div>
              <div className="h-3 bg-gray-700 rounded w-full mb-2" />
              <div className="h-3 bg-gray-700 rounded w-5/6" />
            </div>
          ))}
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">No members found matching your filters.</p>
          <button
            onClick={() => { setSearch(''); setRole('All'); }}
            className="mt-4 text-emerald-400 hover:text-emerald-300 font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-sm mb-6">
            {members.length} member{members.length !== 1 ? 's' : ''} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

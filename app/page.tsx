'use client';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    state: 'Colorado',
    subject: 'ELA / Reading',
    grade: 'Grade 6',
    standardText: '',
    sampleQuestion: '',
    accommodations: 'ELL Sentence Frames',
  });
  const [loading, setLoading] = useState(false);
  const [drillOutput, setDrillOutput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDrillOutput('');

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setDrillOutput(data.result);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12 max-w-5xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-blue-400 tracking-tight">skilldrill.tech</h1>
        <p className="text-slate-400 mt-2">The Pedagogical Order of Operations Engine</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300">State</label>
              <input
                className="w-full bg-slate-700 p-2 rounded text-sm text-white mt-1 border border-slate-600"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300">Subject</label>
              <input
                className="w-full bg-slate-700 p-2 rounded text-sm text-white mt-1 border border-slate-600"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300">Grade</label>
              <input
                className="w-full bg-slate-700 p-2 rounded text-sm text-white mt-1 border border-slate-600"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300">State Standard Text</label>
            <textarea
              required
              rows={3}
              placeholder="e.g., Cite textual evidence to support analysis of what the text says explicitly..."
              className="w-full bg-slate-700 p-2 rounded text-sm text-white mt-1 border border-slate-600"
              value={formData.standardText}
              onChange={(e) => setFormData({ ...formData, standardText: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300">Sample Test Question (Optional)</label>
            <textarea
              rows={2}
              placeholder="Paste a state sample test item..."
              className="w-full bg-slate-700 p-2 rounded text-sm text-white mt-1 border border-slate-600"
              value={formData.sampleQuestion}
              onChange={(e) => setFormData({ ...formData, sampleQuestion: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300">Accommodations / Supports</label>
            <input
              className="w-full bg-slate-700 p-2 rounded text-sm text-white mt-1 border border-slate-600"
              value={formData.accommodations}
              onChange={(e) => setFormData({ ...formData, accommodations: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded font-bold text-white transition duration-200"
          >
            {loading ? 'Isolating Skill & Crafting Gameplay Loop...' : 'Generate Skill Drill'}
          </button>
        </form>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 overflow-y-auto max-h-[600px]">
          <h2 className="text-xl font-bold text-blue-300 mb-4">Generated Active Drill</h2>
          {drillOutput ? (
            <div className="prose prose-invert text-slate-200 whitespace-pre-line text-sm leading-relaxed">
              {drillOutput}
            </div>
          ) : (
            <p className="text-slate-500 italic text-sm">
              Input a standard and click generate to view the isolated micro-skill, gameplay loop, and targeted assessment items.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

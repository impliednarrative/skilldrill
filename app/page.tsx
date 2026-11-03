'use client';

import { useState } from 'react';

interface CurriculumBlock {
  blockNumber: number;
  title: string;
  duration: string;
  objective: string;
  activity: string;
  inclusiveDesign: string;
}

interface CurriculumResult {
  unitTitle: string;
  blocks: CurriculumBlock[];
}

export default function Home() {
  const [standard, setStandard] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [curriculum, setCurriculum] = useState<CurriculumResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCurriculum(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ standard, gradeLevel }),
      });

      const data = await res.json();
      if (res.ok) {
        setCurriculum(data.result);
      } else {
        setError(data.error || 'Failed to generate curriculum.');
      }
    } catch (err) {
      setError('An unexpected network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-2 text-slate-800">SkillDrill</h1>
      <p className="text-slate-600 mb-6">5-Block Inclusive Curriculum & Micro-Skill Generator</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-sm font-semibold mb-1 text-slate-700">Standard / Topic</label>
          <input
            type="text"
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
            placeholder="e.g., Introduction to Arc Welding Safety or Essay Thesis Construction"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-slate-700">Grade Level / Context (Optional)</label>
          <input
            type="text"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            placeholder="e.g., 10th Grade Vocational Track"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Designing 5-Block Framework...' : 'Generate 50-Minute Curriculum'}
        </button>
      </form>

      {error && <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}

      {curriculum && (
        <div className="mt-10 space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold text-slate-900">{curriculum.unitTitle}</h2>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mt-2">
              5 × 10-Minute Blocks (Universal Design Integrated)
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {curriculum.blocks?.map((block) => (
              <div 
                key={block.blockNumber} 
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-slate-800">
                    Block {block.blockNumber}: {block.title}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded">
                    {block.duration}
                  </span>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-700">Objective:</span> {block.objective}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Activity Sequence:</span> {block.activity}
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-700">Inclusive Design:</span> {block.inclusiveDesign}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

'use client';

import { useState } from 'react';

interface SkillBlock {
  blockNumber: number;
  title: string;
  duration: string;
  objective: string;
  skillDemoExample: string;
  framingContext: string;
  activitySteps: string[];
  inclusiveDesign: string;
  dataDeck: string[];
}

interface LessonSequence {
  topic?: string;
  gradeLevel: string;
  standard: string;
  blocks: SkillBlock[];
}

function DrillSpinner({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={`${className} animate-spin`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 9h5v6h-5z" />
      <path d="M19 11h3l2 1-2 1h-3" />
      <path d="M14 10H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h9" />
      <path d="M7 16v3h2l1-3" />
    </svg>
  );
}

export default function HomePage() {
  const [standard, setStandard] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Grade 8');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sequence, setSequence] = useState<LessonSequence | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!standard.trim()) return;

    setLoading(true);
    setError('');
    setSequence(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          standard: standard.trim(),
          topic: standard.trim(),
          gradeLevel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate skill sequence.');
      }

      setSequence(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-6 md:p-10 space-y-8">
      <section className="bg-white border border-stone-200 rounded-xl p-6 md:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
            30-Minute Micro-Skill Sequence
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight pt-1">
            Build a 3-Block Activity Plan
          </h1>
          <p className="text-sm text-stone-600">
            Enter a curriculum standard code to generate three progressive 10-minute student execution blocks with raw 9-card input decks.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Curriculum Standard *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., SC.8.N.1.1 or CCSS.ELA-LITERACY.RI.8.1"
                value={standard}
                onChange={(e) => setStandard(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-stone-50/50 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/20 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Grade Band
              </label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-stone-50/50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/20 transition"
              >
                <option value="Grades 4-5">Grades 4-5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grades 9-10">Grades 9-10</option>
                <option value="Grades 11-12">Grades 11-12</option>
                <option value="Adult / Vocational">Adult / Vocational</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-stone-500">
              Generates 3 progressive 10-min blocks + 27 raw input cards
            </span>
            <button
              type="submit"
              disabled={loading || !standard.trim()}
              className="bg-amber-700 hover:bg-amber-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-2.5 rounded-lg shadow-xs transition cursor-pointer flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <DrillSpinner className="w-4 h-4" />
                  <span>Drilling Standard...</span>
                </>
              ) : (
                <span>Generate Sequence</span>
              )}
            </button>
          </div>
        </form>

        {loading && (
          <div className="border-t border-stone-200 pt-6 flex flex-col items-center justify-center space-y-3 text-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-amber-100/80 border border-amber-300 text-amber-800">
              <DrillSpinner className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">
                Unpacking {standard.trim()} &amp; isolating micro-skills...
              </p>
              <p className="text-xs text-stone-500 mt-0.5">
                Building three 10-minute blocks and 27 raw input cards
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800">
            {error}
          </div>
        )}
      </section>

      {sequence && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-stone-900">
                {sequence.standard || sequence.topic}
              </h2>
              <p className="text-sm text-stone-600">
                {sequence.gradeLevel}
                {sequence.topic && sequence.standard && sequence.topic !== sequence.standard
                  ? ` - ${sequence.topic}`
                  : ''}
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="self-start sm:self-auto bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-medium text-xs px-4 py-2 rounded-lg shadow-2xs transition cursor-pointer"
            >
              Print / Save PDF
            </button>
          </div>

          {sequence.blocks?.map((block, index) => (
            <section
              key={block.blockNumber || index}
              className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs"
            >
              <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="bg-amber-600 text-white text-xs font-bold px-2.5 py-1 rounded">
                    BLOCK {block.blockNumber || index + 1}
                  </span>
                  <h3 className="font-bold text-lg tracking-tight">{block.title}</h3>
                </div>
                <span className="text-xs font-medium text-stone-300 bg-stone-800 px-2.5 py-1 rounded">
                  {block.duration || '10 Mins'}
                </span>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                      Target Objective
                    </h4>
                    <p className="text-sm text-stone-800 leading-relaxed">{block.objective}</p>
                  </div>

                  <div className="bg-amber-50/50 border border-amber-200/70 rounded-lg p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                      Teacher Skill Demo Example
                    </h4>
                    <p className="text-sm text-stone-800 leading-relaxed">{block.skillDemoExample}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                      Framing Context
                    </h4>
                    <p className="text-sm text-stone-700 leading-relaxed">{block.framingContext}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                      Student Execution Steps
                    </h4>
                    <ol className="list-decimal list-inside space-y-1.5 text-sm text-stone-800">
                      {block.activitySteps?.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-lg p-3.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1">
                      Inclusive Design &amp; Scaffolding
                    </h4>
                    <p className="text-xs text-emerald-950 leading-relaxed">{block.inclusiveDesign}</p>
                  </div>
                </div>

                {block.dataDeck && block.dataDeck.length > 0 && (
                  <div className="pt-2 border-t border-stone-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                        9-Card Raw Input Deck (3x3 Cut Grid)
                      </h4>
                      <span className="text-xs text-stone-400">
                        Raw data items for student sorting/application
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {block.dataDeck.map((card, cIdx) => (
                        <div
                          key={cIdx}
                          className="border border-dashed border-stone-300 bg-[#F7F5F2] rounded-lg p-3.5 text-xs text-stone-800 font-medium flex flex-col justify-between min-h-[84px]"
                        >
                          <span className="text-[10px] font-bold text-stone-400 mb-1">
                            CARD {cIdx + 1}
                          </span>
                          <p className="leading-snug">{card}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}

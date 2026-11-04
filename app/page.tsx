'use client';

import { useState } from 'react';

interface BlockCard {
  cardNumber: number;
  content: string;
}

interface CurriculumBlock {
  blockNumber: number;
  title: string;
  duration: string;
  objective: string;
  readyToUseContent: string;
  activitySteps: string;
  inclusiveDesign: string;
  blockCards: BlockCard[];
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
        setError(data.error || 'Failed to generate micro-skill plan.');
      }
    } catch (err) {
      setError('An unexpected network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 font-sans text-slate-900">
      <h1 className="text-3xl font-bold mb-1 text-slate-800">SkillDrill</h1>
      <p className="text-slate-600 mb-6">3-Block Inclusive Micro-Skill Generator</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-sm font-semibold mb-1 text-slate-700">Standard / Topic:</label>
          <input
            type="text"
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
            placeholder="SC.8.E.5.1"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-slate-700">Grade Level / Context:</label>
          <input
            type="text"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            placeholder="8th science"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Generating 3 10-minute activity blocks...' : 'Generate 3 10-minute activity blocks'}
        </button>
      </form>

      {error && <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}

      {curriculum && (
        <div className="mt-10 space-y-8">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold text-slate-900">{curriculum.unitTitle}</h2>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mt-2">
              3 × 10-Minute Skill Blocks with Embedded 9-Card Data Decks
            </span>
          </div>

          {/* 3-Block Sequence with Embedded Block Cards */}
          <div className="space-y-8">
            {curriculum.blocks?.map((block) => (
              <div 
                key={block.blockNumber} 
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition relative overflow-hidden space-y-5"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                      Block {block.blockNumber}
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 mt-1">
                      {block.title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded">
                    {block.duration}
                  </span>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-700">Objective:</span> {block.objective}
                  </div>
                  <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                    <span className="font-semibold text-blue-900">Framing Context:</span> 
                    <p className="mt-1 text-slate-700">{block.readyToUseContent}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Activity Steps (Skill Builder):</span> {block.activitySteps}
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-700">Inclusive Design:</span> {block.inclusiveDesign}
                  </div>
                </div>

                {/* Embedded 9-Card Data Deck for this Block */}
                {block.blockCards && block.blockCards.length > 0 && (
                  <div className="border-t pt-4 mt-4 border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Block {block.blockNumber} Raw Data Deck (9 Cards)
                      </h4>
                      <span className="text-xs text-slate-400">Inputs / References for Activity</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {block.blockCards.map((card) => (
                        <div key={card.cardNumber} className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 shadow-2xs flex flex-col justify-between">
                          <span className="text-[10px] font-bold text-blue-600 mb-1">CARD #{card.cardNumber}</span>
                          <p className="text-xs text-slate-800 leading-snug">{card.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

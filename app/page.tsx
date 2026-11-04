'use client';

import { useState } from 'react';

interface CurriculumBlock {
  blockNumber: number;
  title: string;
  duration: string;
  objective: string;
  readyToUseContent: string;
  activitySteps: string;
  inclusiveDesign: string;
}

interface PrintableCard {
  cardNumber: number;
  front: string;
  back: string;
}

interface CurriculumResult {
  unitTitle: string;
  blocks: CurriculumBlock[];
  printableCards: PrintableCard[];
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
    <main className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-2 text-slate-800">SkillDrill</h1>
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
          {loading ? 'Generating 3 10-minute activities...' : 'Generate 3 10-minute activities'}
        </button>
      </form>

      {error && <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}

      {curriculum && (
        <div className="mt-10 space-y-8">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold text-slate-900">{curriculum.unitTitle}</h2>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mt-2">
              3 × 10-Minute Blocks + Printable 3x3 Card Deck
            </span>
          </div>

          {/* Printable Cards Section (3x3 Table Layout Support) */}
          {curriculum.printableCards && curriculum.printableCards.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-800">Printable Card Deck (3x3 Table Format)</h3>
                <p className="text-sm text-slate-600">Cut and paste these items directly into your 3x3 card templates.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {curriculum.printableCards.map((card) => (
                  <div key={card.cardNumber} className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs flex flex-col justify-between">
                    <div className="text-xs font-bold text-slate-400 mb-2">CARD #{card.cardNumber}</div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-semibold text-blue-600">Front:</span> {card.front}
                      </div>
                      <div className="border-t pt-2 mt-2 border-slate-100">
                        <span className="font-semibold text-emerald-600">Back:</span> {card.back}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3-Block Instructional Arc */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800">30-Minute Block Sequence</h3>
            <div className="grid grid-cols-1 gap-6">
              {curriculum.blocks?.map((block) => (
                <div 
                  key={block.blockNumber} 
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-slate-800">
                      Block {block.blockNumber}: {block.title}
                    </h4>
                    <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded">
                      {block.duration}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm text-slate-600">
                    <div>
                      <span className="font-semibold text-slate-700">Objective:</span> {block.objective}
                    </div>
                    <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                      <span className="font-semibold text-blue-900">Ready-to-Use Content:</span> 
                      <p className="mt-1 text-slate-700 whitespace-pre-wrap">{block.readyToUseContent}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Execution Steps:</span> {block.activitySteps}
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-700">Inclusive Design:</span> {block.inclusiveDesign}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

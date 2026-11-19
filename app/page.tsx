'use client';

import { useState } from 'react';

interface BlockCardItem {
  cardNumber?: number;
  content: string;
}

interface SkillBlock {
  blockNumber?: number;
  title: string;
  duration?: string;
  objective: string;
  skillDemoExample: string;
  framingContext: string;
  activitySteps: string[];
  inclusiveDesign: string;
  dataDeck: string[];
}

interface LessonSequence {
  unitTitle?: string;
  topic?: string;
  gradeLevel?: string;
  standard?: string;
  blocks: SkillBlock[];
}

function CoreDrillVortex({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <span className="inline-flex items-center justify-center">
      <style>{`
        @keyframes skilldrillVortexSpin {
          0% {
            transform: rotate(-18deg) scaleX(1) skewX(-6deg);
          }
          25% {
            transform: rotate(-18deg) scaleX(0.35) skewX(8deg);
          }
          50% {
            transform: rotate(-18deg) scaleX(1) skewX(6deg);
          }
          75% {
            transform: rotate(-18deg) scaleX(0.35) skewX(-8deg);
          }
          100% {
            transform: rotate(-18deg) scaleX(1) skewX(-6deg);
          }
        }
        .skilldrill-vortex-active {
          display: inline-block;
          transform-origin: center center;
          animation: skilldrillVortexSpin 0.55s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
      <svg
        className={`${className} skilldrill-vortex-active`}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M14 10C14 7.5 22 6 32 6C42 6 50 7.5 50 10L47 16H17L14 10Z"
          fill="#2C2A29"
        />
        <path
          d="M17 16C26 19 41 18 47 15L44.5 23C36 26 23 26 19.5 23L17 16Z"
          fill="#B45309"
        />
        <path
          d="M19.5 23C27 26 40 25 44.5 23L42 31C34 34 25 34 22 31L19.5 23Z"
          fill="#D97706"
        />
        <path
          d="M22 31C28.5 34 38 33 42 31L39 39C33 41.5 27 41.5 24.5 39L22 31Z"
          fill="#B45309"
        />
        <path
          d="M24.5 39C29.5 41.5 36.5 41 39 39L35.5 48C33 49 31 49 28.5 48L24.5 39Z"
          fill="#D97706"
        />
        <path
          d="M28.5 48C30.5 49 33.5 49 35.5 48L32 60L28.5 48Z"
          fill="#2C2A29"
        />
        <path
          d="M15 19.5C24 22.5 40 21.5 46 18.5"
          stroke="#FEF3C7"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M18.5 27C26.5 29.5 39 28.5 43.5 26"
          stroke="#FEF3C7"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M21.5 34.5C28 36.8 37.5 36 41 34"
          stroke="#FEF3C7"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M24 42C29 44 36 43.5 38.5 41.8"
          stroke="#FEF3C7"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function toStepsArray(steps: unknown): string[] {
  if (Array.isArray(steps)) {
    return steps
      .map((s) => (typeof s === 'string' ? s.trim() : String(s ?? '').trim()))
      .filter(Boolean);
  }
  if (typeof steps === 'string' && steps.trim()) {
    const splitLines = steps
      .split(/\n+|\s*(?:\d+[\).\s]+)\s*/)
      .map((s) => s.trim())
      .filter(Boolean);
    return splitLines.length > 0 ? splitLines : [steps.trim()];
  }
  return [];
}

function toCardsArray(block: any): string[] {
  const rawCards = Array.isArray(block?.blockCards)
    ? block.blockCards
    : Array.isArray(block?.dataDeck)
      ? block.dataDeck
      : [];

  return rawCards
    .map((item: BlockCardItem | string) => {
      if (typeof item === 'string') return item.trim();
      if (item && typeof item === 'object') {
        return String(item.content ?? '').trim();
      }
      return '';
    })
    .filter(Boolean);
}

function normalizeSequence(
  raw: any,
  fallbackStandard: string,
  fallbackGrade: string
): LessonSequence | null {
  if (!raw || typeof raw !== 'object') return null;

  const container =
    raw.result && typeof raw.result === 'object'
      ? raw.result
      : raw.sequence && typeof raw.sequence === 'object'
        ? raw.sequence
        : raw.data && typeof raw.data === 'object'
          ? raw.data
          : raw;

  const rawBlocks = Array.isArray(container.blocks) ? container.blocks : [];

  const blocks: SkillBlock[] = rawBlocks.map((b: any, idx: number) => ({
    blockNumber: b.blockNumber ?? idx + 1,
    title: b.title ?? `Block ${idx + 1}`,
    duration: b.duration ?? '10 Mins',
    objective: b.objective ?? '',
    skillDemoExample: b.skillDemoExample ?? '',
    framingContext: b.readyToUseContent ?? b.framingContext ?? '',
    activitySteps: toStepsArray(b.activitySteps),
    inclusiveDesign: b.inclusiveDesign ?? '',
    dataDeck: toCardsArray(b),
  }));

  return {
    unitTitle: container.unitTitle,
    standard: container.standard || fallbackStandard,
    topic: container.topic,
    gradeLevel: container.gradeLevel || fallbackGrade,
    blocks,
  };
}

export default function HomePage() {
  const [standard, setStandard] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Grade 8');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugPayload, setDebugPayload] = useState('');
  const [sequence, setSequence] = useState<LessonSequence | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!standard.trim()) return;

    setLoading(true);
    setError('');
    setDebugPayload('');
    setSequence(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          standard: standard.trim(),
          gradeLevel,
        }),
      });

      const rawText = await response.text();
      let data: any = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch {
        setDebugPayload(rawText.slice(0, 1200));
        throw new Error('Server returned non-JSON response.');
      }

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to generate skill sequence.');
      }

      const normalized = normalizeSequence(data, standard.trim(), gradeLevel);
      if (!normalized || normalized.blocks.length === 0) {
        setDebugPayload(JSON.stringify(data, null, 2).slice(0, 1500));
        throw new Error('Generation completed, but no skill blocks were returned by /api/generate.');
      }

      setSequence(normalized);
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred.');
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
                  <CoreDrillVortex className="w-5 h-5" />
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
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 border border-amber-200">
              <CoreDrillVortex className="w-14 h-14" />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">
                Pierce the standard: {standard.trim()}
              </p>
              <p className="text-xs text-stone-500 mt-0.5">
                Isolating micro-skills, building 3 blocks, and cutting 27 raw input cards
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800 space-y-2">
            <p className="font-semibold">{error}</p>
            {debugPayload && (
              <pre className="text-xs bg-white/80 border border-red-200 rounded p-2.5 overflow-x-auto text-stone-800">
                {debugPayload}
              </pre>
            )}
          </div>
        )}
      </section>

      {sequence && sequence.blocks.length > 0 && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-stone-900">
                {sequence.unitTitle || sequence.standard || sequence.topic}
              </h2>
              <p className="text-sm text-stone-600">
                {sequence.standard} • {sequence.gradeLevel}
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="self-start sm:self-auto bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-medium text-xs px-4 py-2 rounded-lg shadow-2xs transition cursor-pointer"
            >
              Print / Save PDF
            </button>
          </div>

          {sequence.blocks.map((block, index) => (
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

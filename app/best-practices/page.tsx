import Link from 'next/link';

export default function BestPracticesPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">
      {/* Intro / Philosophy */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 md:p-8 shadow-xs space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
            Classroom Implementation &amp; Pedagogy
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight pt-1">
            How SkillDrill Fits Into a Complete Classroom System
          </h1>
        </div>
        <p className="text-sm md:text-base text-stone-700 leading-relaxed">
          While <strong className="text-stone-900">SkillDrill</strong> focuses on a specific task—translating curriculum standards into structured student activities—understanding how those blocks fit into your broader classroom routine makes them far more effective. Whether teaching English, science, social studies, or any other subject, a consistent daily rhythm lets students focus on mastering the skill rather than guessing the rules.
        </p>
      </section>

      {/* Daily Classroom Flow (Steps 1-4) */}
      <section className="space-y-4">
        <div className="border-b border-stone-200 pb-2">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            The Daily Classroom Rhythm
          </h2>
          <p className="text-xs text-stone-500">
            A repeatable four-part lesson structure that frames each 3-block SkillDrill sequence
          </p>
        </div>

        {/* Step 1 */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              <span className="bg-stone-900 text-white text-xs font-bold px-2.5 py-1 rounded">
                STEP 1
              </span>
              <h3 className="font-bold text-lg text-stone-900">Setting the Tone</h3>
            </div>
            <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
              At the Door
            </span>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed">
            Stand at the threshold—half in and half out of the classroom—to welcome students and check in before class begins. If a student looks overwhelmed, give them space in accordance with school guidelines so they can reset.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            Students are asked to leave outside troubles at the door—not because those struggles do not matter, but because counselors, deans, and administrators are better equipped to support them there. Inside the room, neither the teacher nor the student is number one: <strong className="text-stone-900">the content is number one</strong>, and the classroom is a safe workspace dedicated to exploring it.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              <span className="bg-stone-900 text-white text-xs font-bold px-2.5 py-1 rounded">
                STEP 2
              </span>
              <h3 className="font-bold text-lg text-stone-900">Calibrating with Bellwork</h3>
            </div>
            <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
              7 Mins Max
            </span>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed">
            As soon as students sit down, they begin a short 4-question digital warm-up targeting the week&apos;s standard alongside one spiral review question. Using standards-aligned question banks (such as{' '}
            <a
              href="https://progresslearning.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-800 underline hover:text-amber-900 font-medium"
            >
              Progress Learning
            </a>
            ) mirrors the digital testing environment.
          </p>
          <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-3.5 text-xs text-stone-700 space-y-1.5">
            <p>
              <strong className="text-stone-900">The 75% Rule:</strong> Any student who scores 75% or higher earns quiet free time for the remainder of the 7-minute window.
            </p>
            <p>
              <strong className="text-stone-900">No Answer Giveaways:</strong> The system flags incorrect responses without handing over the answer—just like an exam—pushing students to verify and defend why their reasoning is right.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              <span className="bg-stone-900 text-white text-xs font-bold px-2.5 py-1 rounded">
                STEP 3
              </span>
              <h3 className="font-bold text-lg text-stone-900">Introducing the Day &amp; Grouping</h3>
            </div>
            <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
              Screens Down
            </span>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed">
            Bring the whole class together, have students close their laptops, and outline the day&apos;s tasks. Bellwork doubles as accountability: students who hit 75% or better already have their homework credit for the day; anyone below 75% completes it as homework with unlimited attempts on randomized questions tied to that same standard, allowing any student willing to put in the effort to earn 100%.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            Once devices are closed, students transition into <strong className="text-stone-900">cooperative groups of 3 or 4</strong> to tackle the hands-on SkillDrill blocks.
          </p>
        </div>

        {/* Step 4: Try-Talk-Try */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              <span className="bg-amber-700 text-white text-xs font-bold px-2.5 py-1 rounded">
                STEP 4
              </span>
              <h3 className="font-bold text-lg text-stone-900">Running Blocks 1, 2 &amp; 3: Try–Talk–Try</h3>
            </div>
            <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
              3 × 10-Min Blocks
            </span>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed">
            Each SkillDrill sequence builds through three progressively more demanding tasks. Rather than front-loading a long lecture, run each block using the <strong className="text-stone-900">Try–Talk–Try</strong> cycle:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#F7F5F2] border border-stone-200 rounded-lg p-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                1. First Try (Explore)
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                Model the skill briefly using the Teacher Demo Example, then let groups work with the 9-card input deck. This serves as a live pre-assessment and low-stakes exploration.
              </p>
            </div>
            <div className="bg-[#F7F5F2] border border-stone-200 rounded-lg p-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                2. Talk (Targeted Coaching)
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                Deliver a concise mini-lecture focused on the <em>hows</em> and <em>whys</em>, anchored directly in what you observed during their first attempt.
              </p>
            </div>
            <div className="bg-[#F7F5F2] border border-stone-200 rounded-lg p-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                3. Second Try (Spotlight)
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                Students apply your feedback to complete the task. Give enough time for every student to demonstrate the skill—putting them in the spotlight, never on the spot.
              </p>
            </div>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed">
            At the close of a Try–Talk–Try cycle, run a quick formative check (such as Kahoot or Plickers), then put devices away again before moving into the next block.
          </p>
        </div>
      </section>

      {/* Weekly Pacing & Flexibility (Step 5) */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 md:p-8 shadow-xs space-y-5">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
            Weekly Pacing &amp; Adaptation
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 tracking-tight pt-1">
            Stretching One Standard Across a Full Week
          </h2>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed">
          Currently, SkillDrill generates 3 progressive blocks per standard. When teaching one standard per week, you can rotate cooperative groups, spread the three blocks across the week, and blend in subject-specific practice tools—such as custom sentence-unscrambling spreadsheets for language exam prep or hands-on labs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-4 space-y-1">
            <h3 className="font-bold text-stone-900">Mondays</h3>
            <p className="text-stone-600 leading-relaxed">
              Heavier emphasis on digital baseline calibration and introducing Block 1 foundational sorting.
            </p>
          </div>
          <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-4 space-y-1">
            <h3 className="font-bold text-stone-900">Tuesdays &amp; Thursdays</h3>
            <p className="text-stone-600 leading-relaxed">
              Deeper &ldquo;Talk&rdquo; coaching cycles working through Blocks 1, 2, and 3 with different skill emphases.
            </p>
          </div>
          <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-4 space-y-1">
            <h3 className="font-bold text-stone-900">Wednesdays &amp; Fridays</h3>
            <p className="text-stone-600 leading-relaxed">
              Dedicated to labs, subject-specific drills, and higher-order application tasks.
            </p>
          </div>
        </div>

        <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-4 text-sm text-stone-800 leading-relaxed">
          <strong className="text-stone-900">Structure Without Rigidity:</strong> Students stay comfortable because the weekly rhythm is predictable, yet they never get bored because both the content and the activities evolve each week. SkillDrill isn&apos;t meant to lock you into one rigid script—it&apos;s built to free up your planning energy so you can curate, coach, and facilitate instead of simply managing a textbook.
        </div>

        <div className="pt-2 flex justify-end">
          <Link
            href="/"
            className="bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-xs transition"
          >
            Build a 3-Block Sequence
          </Link>
        </div>
      </section>
    </main>
  );
}

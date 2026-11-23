import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">
      <section className="bg-white border border-stone-200 rounded-xl p-6 md:p-8 shadow-xs space-y-5">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
            About the Project
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight pt-1">
            Bridging the Gap Between Standards and Practice
          </h1>
        </div>

        <div className="space-y-4 text-sm md:text-base text-stone-700 leading-relaxed">
          <p>
            Over more than 20 years of teaching in the United States and abroad, I have always been drawn to the mechanics of how people actually learn—the clear, step-by-step process that moves a learner from confusion to mastery, not just in mathematics, but across every subject.
          </p>

          <p>
            Long before frameworks like student-centered classrooms, cooperative learning, or skills-based instruction became widespread, I was experimenting with ways to break complex ideas down into concrete actions students could practice together. Today, those instructional approaches are widely encouraged, yet teachers are rarely given the dedicated training or planning time needed to consistently dissect state standards and translate them into hands-on tasks across an entire academic year.
          </p>

          <p>
            Teaching is a deeply skill-based craft, and translating dense standards into repeatable student practice takes serious design work. I built <strong className="text-stone-900">SkillDrill</strong> to shoulder that heavy lifting—turning any curriculum standard into focused 10-minute execution blocks and tangible input cards so educators can spend less time reverse-engineering standards and more time coaching students.
          </p>
        </div>

        <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-stone-500">
            Designed around 10-minute active practice cycles and 3×3 raw data decks.
          </div>
          <Link
            href="/"
            className="bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-xs transition"
          >
            Try the Generator
          </Link>
        </div>
      </section>

      <section className="bg-white border border-stone-200 rounded-xl p-6 md:p-8 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-stone-900">
          Where SkillDrill Is Heading Next
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-4 space-y-1">
            <h3 className="font-bold text-stone-900">Full-Week &amp; Multi-Standard Arcs</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Expanding beyond a single 30-minute sequence into multi-day lesson arcs that weave together complementary standards taught in the same week.
            </p>
          </div>
          <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-4 space-y-1">
            <h3 className="font-bold text-stone-900">Adult, Vocational &amp; PD Workshops</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Adapting the 10-minute micro-drill format for workforce training, skilled trades pathways, and hands-on educator professional development.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

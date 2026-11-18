export default function BestPracticesPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Best Practices Guide</h1>
        <p className="text-stone-600 mt-2">
          Operational principles for deploying the block system and maximizing student engagement in modern classrooms.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-3">
          <h2 className="text-xl font-bold text-stone-900">1. Shift from Scripting to Systems</h2>
          <p className="text-stone-700 leading-relaxed text-sm">
            Traditional lesson plans act like rigid scripts that break under real classroom variability. Modular 10-minute blocks absorb disruptions naturally while maintaining strict instructional momentum. Keep direct lecture bounded: talk exists exclusively to guide, focus, and correct.
          </p>
        </section>

        <section className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-3">
          <h2 className="text-xl font-bold text-stone-900">2. The Opening "Bellwork Block"</h2>
          <p className="text-stone-700 leading-relaxed text-sm">
            Settle students instantly upon entry with low-stakes digital retrieval practice. Expose them to upcoming content early, gather immediate diagnostic data, and build daily fluency with digital assessment interfaces.
          </p>
        </section>

        <section className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-3">
          <h2 className="text-xl font-bold text-stone-900">3. Inter-Block Formative Checkpoints</h2>
          <p className="text-stone-700 leading-relaxed text-sm">
            Insert rapid, high-engagement data checks between blocks (such as Kahoot, Plickers, or whiteboard checks). Use real-time results to determine if a 2-minute targeted teacher intervention is necessary before advancing to the next skill tier.
          </p>
        </section>
      </div>
    </main>
  );
}

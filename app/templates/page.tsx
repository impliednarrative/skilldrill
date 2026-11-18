export default function TemplatesPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Printable Activity Templates</h1>
        <p className="text-stone-600 mt-2">
          Ready-to-use print layouts for student data cards, sorting matrices, and 3-block lesson tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Template Card 1 */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
            Grid Layout
          </span>
          <h3 className="text-xl font-bold text-stone-900">3×3 Raw Data Card Sheet</h3>
          <p className="text-sm text-stone-600">
            Standard 9-up index grid designed for quick paper-cutter splitting. Perfect for distributing unformatted input cards for Block 1, 2, or 3.
          </p>
          <div className="pt-2">
            <span className="text-xs text-stone-400 font-medium">Format: PDF / Printable Browser View</span>
          </div>
        </div>

        {/* Template Card 2 */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
            Tracking Sheet
          </span>
          <h3 className="text-xl font-bold text-stone-900">3-Block Sequence Log</h3>
          <p className="text-sm text-stone-600">
            A structured student recording sheet with dedicated spaces for tracking objective responses, working notes, and inter-block formative checks.
          </p>
          <div className="pt-2">
            <span className="text-xs text-stone-400 font-medium">Format: Printable Handout</span>
          </div>
        </div>
      </div>
    </main>
  );
}

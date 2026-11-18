import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'SkillDrill | Standards-Aligned Micro-Skill Generator',
  description: 'Generate 30-minute inclusive skill blocks and raw data decks instantly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F7F5F2] text-[#2C2A29] min-h-screen flex flex-col font-sans selection:bg-amber-200">
        {/* Warm Professional Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="bg-amber-700 text-white font-bold text-lg w-9 h-9 rounded-lg flex items-center justify-center shadow-xs">
                SD
              </span>
              <div>
                <Link href="/" className="font-bold text-lg text-stone-900 tracking-tight hover:text-amber-700 transition">
                  SkillDrill
                </Link>
                <span className="hidden sm:inline-block text-xs text-stone-500 ml-2 font-medium">
                  Instructional Design Engine
                </span>
              </div>
            </div>

            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className="text-stone-700 hover:text-amber-700 transition">
                Generator
              </Link>
              <Link href="/templates" className="text-stone-700 hover:text-amber-700 transition">
                Templates
              </Link>
              <Link href="/best-practices" className="text-stone-700 hover:text-amber-700 transition">
                Best Practices
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1">
          {children}
        </div>

        {/* Warm Footer */}
        <footer className="bg-white border-t border-stone-200 py-6 mt-12 text-center text-xs text-stone-500">
          <p>© {new Date().getFullYear()} SkillDrill.tech. Standards-aligned micro-skill architecture for modern classrooms.</p>
        </footer>
      </body>
    </html>
  );
}

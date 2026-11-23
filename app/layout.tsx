import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'SkillDrill | Micro-Skill Lesson Sequence Engine',
  description:
    'Dissect curriculum standards into three progressive 10-minute student execution blocks with raw 9-card input decks.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F7F5F2] text-[#2C2A29] antialiased flex flex-col">
        <header className="bg-white border-b border-stone-200 sticky top-0 z-10 print:hidden">
          <div className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2.5 text-stone-900 hover:opacity-90 transition"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#2C2A29] text-amber-500 font-bold text-sm tracking-tight">
                SD
              </span>
              <span className="font-bold text-lg tracking-tight">
                Skill<span className="text-[#B45309]">Drill</span>
              </span>
            </Link>

            <nav className="flex items-center space-x-6 text-sm font-medium text-stone-600">
              <Link
                href="/"
                className="hover:text-[#B45309] transition"
              >
                Generator
              </Link>
              <Link
                href="/templates"
                className="hover:text-[#B45309] transition"
              >
                Templates
              </Link>
              <Link
                href="/best-practices"
                className="hover:text-[#B45309] transition"
              >
                Best Practices
              </Link>
              <Link
                href="/about"
                className="hover:text-[#B45309] transition"
              >
                About
              </Link>
            </nav>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-stone-200 bg-white/60 py-6 mt-12 print:hidden">
          <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
            <span>SkillDrill — Standards-Aligned Micro-Skill Sequencing</span>
            <span>Built for active, skills-based classrooms</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

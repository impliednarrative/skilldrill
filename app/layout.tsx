export const metadata = {
  title: 'SkillDrill',
  description: 'Deconstruct state standards into actionable micro-skills and gameplay loops.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}

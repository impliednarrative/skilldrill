import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENROUTER_API_KEY is missing from server environment variables.' },
        { status: 500 }
      );
    }

    const { standard, gradeLevel } = await req.json();

    if (!standard || !gradeLevel) {
      return NextResponse.json({ error: 'Standard and Grade Level/Context are required.' }, { status: 400 });
    }

    const prompt = `You are an expert instructional designer specializing in skills-based micro-activities.
For the educational standard "${standard}" and grade level "${gradeLevel}", generate a 3-block micro-skill activity sequence AND a set of discrete, text-only content lines for card templates.

CRITICAL CONSTRAINTS:
1. Zero Prep / Stand-Alone: All prompts, text snippets, or problem sets must be fully written out.
2. 3 Instructional Blocks: Exactly 3 sequential 10-minute blocks (30 minutes total).
3. Text Card Lines: Generate between 9 and 18 discrete card text lines.
4. WORD LIMIT: Each card text line MUST NOT exceed 50 words. Ensure the text is clean, direct, and completely readable on a single index/printable card.

Return ONLY a valid JSON object with NO markdown code wrappers, using this exact schema:
{
  "unitTitle": "Title of micro-skill plan",
  "blocks": [
    {
      "blockNumber": 1,
      "title": "Block Title",
      "duration": "10 Mins",
      "objective": "Clear objective",
      "readyToUseContent": "Exact text or prompt for teacher/students",
      "activitySteps": "Step-by-step execution steps for 10 mins",
      "inclusiveDesign": "Universal design feature embedded"
    }
  ],
  "cardLines": [
    {
      "lineNumber": 1,
      "text": "Card content line (STRICTLY maximum 50 words)."
    }
  ]
}`;

    const apiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey.trim()}`,
        "HTTP-Referer": "https://skilldrill.tech",
        "X-Title": "SkillDrill",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      throw new Error(`OpenRouter API error: ${errorText}`);
    }

    const data = await apiResponse.json();
    const rawContent = data.choices?.[0]?.message?.content || '{}';
    
    // Clean up markdown code block wrappers if present
    const cleanedText = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanedText);

    return NextResponse.json({ result: parsedData });
  } catch (error: any) {
    console.error('Error generating micro-skill plan via OpenRouter:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate micro-skill plan.' },
      { status: 500 }
    );
  }
}

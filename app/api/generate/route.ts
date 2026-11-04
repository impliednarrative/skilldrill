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

    const prompt = `You are an expert instructional designer specializing in skills-based, active micro-activities.
For the educational standard "${standard}" and grade level "${gradeLevel}", generate:
1. A master deck of 9 to 18 discrete card text lines (max 50 words per line) containing actionable data, prompts, problem sets, or scenarios. These cards are the physical engine of the lesson used for sorting, drawing, and task execution.
2. Exactly 3 sequential 10-minute instructional blocks (30 minutes total). CRITICAL: Each block's "readyToUseContent" MUST explicitly instruct students and teachers on how to use specific cards from the deck to perform the hands-on task. 

Return ONLY a valid JSON object with NO markdown code wrappers, using this exact schema:
{
  "unitTitle": "Title of micro-skill plan",
  "cardLines": [
    {
      "lineNumber": 1,
      "text": "Actionable task, problem set, or scenario (STRICTLY max 50 words)."
    }
  ],
  "blocks": [
    {
      "blockNumber": 1,
      "title": "Block Title",
      "duration": "10 Mins",
      "objective": "Clear objective",
      "readyToUseContent": "Exact instructions leveraging specific card lines (e.g., 'Students draw Card 3 and Card 7 to calculate...')",
      "activitySteps": "Step-by-step execution for the 10 mins",
      "inclusiveDesign": "Universal design feature embedded"
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

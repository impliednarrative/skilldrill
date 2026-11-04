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
For the educational standard "${standard}" and grade level "${gradeLevel}", generate exactly 3 sequential 10-minute instructional blocks (30 minutes total).

CRITICAL PEDAGOGICAL RULES:
1. Cards are NEVER instructions or commands ("do this"). Cards ONLY provide raw materials, data points, values, terms, or scenarios that students use as inputs during the activity. The activity steps teach the skill; the cards provide the raw data.
2. Each block MUST include a "skillDemoExample": a concrete, live worked example demonstrating how the teacher models the target skill before students begin.
3. Each of the 3 blocks MUST contain its own unique set of EXACTLY 9 data cards (numbered 1 through 9).

Return ONLY a valid JSON object with NO markdown code wrappers, using this exact schema:
{
  "unitTitle": "Title of micro-skill plan",
  "blocks": [
    {
      "blockNumber": 1,
      "title": "Block Title",
      "duration": "10 Mins",
      "objective": "Clear objective",
      "skillDemoExample": "A concrete, step-by-step model or example the teacher performs live to demonstrate the skill to students.",
      "readyToUseContent": "Context, scenario, or framing for the block",
      "activitySteps": "Step-by-step execution steps explaining how students process the 9 block cards to build the skill",
      "inclusiveDesign": "Universal design feature embedded",
      "blockCards": [
        {
          "cardNumber": 1,
          "content": "Raw data, value, term, or scenario item (Strictly max 30 words, NO instructions/commands)"
        }
      ]
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

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { standard, gradeLevel } = await req.json();

    if (!standard || !gradeLevel) {
      return NextResponse.json({ error: 'Standard and Grade Level/Context are required.' }, { status: 400 });
    }

    const prompt = `You are an expert instructional designer specializing in skills-based micro-activities and vocational/academic training.
Deconstruct the given educational standard into exactly 3 sequential 10-minute instructional blocks (30 minutes total) AND provide a printable deck of content cards for a 3x3 grid (up to 9 double-sided cards).

CRITICAL REQUIREMENTS:
1. Zero Prep / Stand-Alone: Provide actual text, problem sets, or prompt content directly inside the card and block structures.
2. Structure: 3 distinct 10-minute blocks + up to 9 cards with Front/Back data.
3. Universal Design: Inherently incorporate accessible, multi-modal learning pathways.

Return ONLY a valid JSON object with NO markdown wrapper using this exact schema:
{
  "unitTitle": "Title of micro-skill plan",
  "blocks": [
    {
      "blockNumber": 1,
      "title": "Block Title",
      "duration": "10 Mins",
      "objective": "What students accomplish",
      "readyToUseContent": "Exact text or prompt for teacher/students",
      "activitySteps": "Step-by-step execution steps for 10 mins",
      "inclusiveDesign": "Universal design feature embedded"
    }
  ],
  "printableCards": [
    {
      "cardNumber": 1,
      "front": "Card front content",
      "back": "Card back content"
    }
  ]
}

Target Standard/Topic: ${standard}
Grade Level / Context: ${gradeLevel}`;

    const apiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://skilldrill.tech", // Optional for OpenRouter rankings
        "X-Title": "SkillDrill",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free", // Highly reliable free-tier model on OpenRouter
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
    
    // Clean up any markdown code block wrappers if the model includes them
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

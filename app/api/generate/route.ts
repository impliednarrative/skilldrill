import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const { standard, gradeLevel } = await req.json();

    if (!standard || !gradeLevel) {
      return NextResponse.json({ error: 'Standard and Grade Level/Context are required.' }, { status: 400 });
    }

    const systemPrompt = `You are an expert curriculum developer specializing in vocational, trades, and academic instruction. 
Deconstruct the given educational standard into exactly 5 sequential 10-minute instructional blocks (totaling 50 minutes).

CRITICAL REQUIREMENTS:
1. Zero Prep / Stand-Alone: Every block must contain fully realized, ready-to-use content. Do not tell the teacher to "create a handout" or "prepare questions"—provide the actual questions, text snippets, prompts, or problem sets right inside the block so the teacher can use it instantly with zero external prep.
2. Universal Design / Inclusive Design: Inherently incorporate accessible, multi-modal learning pathways addressing cognitive, physical, and sensory needs without a separate accommodations list.
3. Structure: Exactly 5 distinct blocks forming a cohesive 50-minute learning arc.

You MUST return your response as a valid JSON object with this exact structure:
{
  "unitTitle": "Title of the curriculum unit",
  "blocks": [
    {
      "blockNumber": 1,
      "title": "Block Title",
      "duration": "10 Mins",
      "objective": "What students will accomplish",
      "readyToUseContent": "The exact verbatim text, prompts, problem sets, or questions the teacher can project or hand out immediately (zero prep required).",
      "activitySteps": "Clear execution steps for the teacher and students during the 10 minutes.",
      "inclusiveDesign": "How universal design features (visual, tactile, auditory, or collaborative scaffolds) are natively embedded."
    }
  ]
}`;

    const userPrompt = `Target Standard/Topic: ${standard} \nGrade Level / Context: ${gradeLevel}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }, { text: userPrompt }] }
      ],
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    return NextResponse.json({ result: parsedData });
  } catch (error: any) {
    console.error('Error generating drill:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

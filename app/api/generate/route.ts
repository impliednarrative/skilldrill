import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const { standard, gradeLevel } = await req.json();

    if (!standard || !gradeLevel) {
      return NextResponse.json({ error: 'Standard and Grade Level/Context are required.' }, { status: 400 });
    }

    const prompt = `You are an expert instructional designer. For the educational standard "${standard}" and grade level/context "${gradeLevel}", generate a 3-block micro-skill activity and a 3x3 card deck.

You must output your response STRICTLY as a valid JSON object with no markdown code blocks around it, using this exact format:
{
  "unitTitle": "Short descriptive title",
  "blocks": [
    {
      "blockNumber": 1,
      "title": "Block Title",
      "duration": "10 Mins",
      "objective": "Clear objective",
      "readyToUseContent": "Exact text or prompt for teacher/students",
      "activitySteps": "Step-by-step execution",
      "inclusiveDesign": "Universal design feature"
    }
  ],
  "printableCards": [
    {
      "cardNumber": 1,
      "front": "Card front content",
      "back": "Card back content"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    let rawText = response.text || '{}';
    // Clean up any accidental markdown formatting if the model includes it
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

    const parsedData = JSON.parse(rawText);
    return NextResponse.json({ result: parsedData });
  } catch (error: any) {
    console.error('Error generating micro-skill plan:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate plan. Please try again.' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const { standard, gradeLevel } = await req.json();

    if (!standard || !gradeLevel) {
      return NextResponse.json({ error: 'Standard and Grade Level/Context are required.' }, { status: 400 });
    }

    const systemPrompt = `You are an expert instructional designer specializing in skills-based, hands-on micro-activities and vocational/academic training. 
Deconstruct the given educational standard into exactly 5 sequential 10-minute instructional blocks (totaling 50 minutes) AND provide a complete deck of printable, discrete content cards.

CRITICAL REQUIREMENTS:
1. Zero Prep / Stand-Alone: Every block must be fully realized. No referencing outside textbooks.
2. Printable Card Deck (3x3 Table Layout): Generate a set of discrete content cards (no more than 18 single cards, or up to 9 double-sided cards with a Front and Back) containing all necessary data, terms, problem sets, or materials. These are designed for teachers to cut and paste directly into 3x3 card templates for card-based activities (e.g., draw-and-answer, matching, sorting, data manipulation).
3. Universal Design / Inclusive Design: Inherently incorporate accessible, multi-modal learning pathways addressing cognitive, physical, and sensory needs.
4. Structure: Exactly 5 distinct 10-minute blocks forming a cohesive learning arc, paired with the card deck.

You MUST return your response as a valid JSON object with this exact structure:
{
  "unitTitle": "Title of the micro-skill module",
  "blocks": [
    {
      "blockNumber": 1,
      "title": "Block Title",
      "duration": "10 Mins",
      "objective": "What students will accomplish",
      "readyToUseContent": "Verbatim text, prompts, or instructions for this block.",
      "activitySteps": "Clear execution steps for the 10 minutes.",
      "inclusiveDesign": "How universal design features are natively embedded."
    }
  ],
  "printableCards": [
    {
      "cardNumber": 1,
      "front": "Content for card front (e.g., term, problem, or data point)",
      "back": "Content for card back (e.g., definition, answer, or complementary data)"
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

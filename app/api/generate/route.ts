import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const { standard, gradeLevel } = await req.json();

    if (!standard) {
      return NextResponse.json({ error: 'Standard or topic is required' }, { status: 400 });
    }

    const systemPrompt = `You are an expert curriculum developer specializing in vocational, trades, and academic instruction. 
Deconstruct the given educational standard or topic into exactly 5 sequential 10-minute instructional blocks (totaling 50 minutes, leaving buffer for transition and formative assessment).

Design principles:
1. Universal Design / Inclusive Design: Inherently incorporate accessible, multi-modal learning pathways.
2. Structure: Exactly 5 distinct blocks.

You MUST return your response as a valid JSON object with this exact structure:
{
  "unitTitle": "Title of the curriculum unit",
  "blocks": [
    {
      "blockNumber": 1,
      "title": "Block Title",
      "duration": "10 Mins",
      "objective": "What students will accomplish",
      "activity": "Step-by-step student activity description",
      "inclusiveDesign": "How universal design is embedded"
    }
  ]
}`;

    const userPrompt = `Target Standard/Topic: ${standard} ${gradeLevel ? `(Grade/Context: ${gradeLevel})` : ''}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
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

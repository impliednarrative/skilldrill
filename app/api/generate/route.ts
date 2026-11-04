import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Models to try in order if one returns a 503 or demand spike error
const MODELS_TO_TRY = ['gemini-3.8-flash', 'gemini-2.5-flash'];

async function generateWithRetry(prompt: string, retries = 2) {
  for (const modelName of MODELS_TO_TRY) {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
        });

        if (response && response.text) {
          return response.text;
        }
      } catch (err: any) {
        console.warn(`Attempt ${attempt + 1} with model ${modelName} failed:`, err?.message || err);
        // If it's a 503 or rate limit, wait 1 second before retrying
        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
  }
  throw new Error('All model endpoints are currently under high load. Please wait a moment and try again.');
}

export async function POST(req: Request) {
  try {
    const { standard, gradeLevel } = await req.json();

    if (!standard || !gradeLevel) {
      return NextResponse.json({ error: 'Standard and Grade Level/Context are required.' }, { status: 400 });
    }

    const prompt = `You are an expert instructional designer. For the educational standard "${standard}" and grade level/context "${gradeLevel}", generate a 3-block micro-skill activity and a 3x3 card deck.

You must output your response STRICTLY as a valid JSON object with no markdown formatting around it, using this exact format:
{
  "unitTitle": "Short descriptive title",
  "blocks": [
    {
      "blockNumber": 1,
      "title": "Block Title",
      "duration": "10 Mins",
      "objective": "Clear objective",
      "readyToUseContent": "Exact text, questions, or prompt for teacher/students",
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
}`;

    const rawResultText = await generateWithRetry(prompt);
    
    // Clean up markdown code fence wrapper if present
    const cleanedText = rawResultText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanedText);

    return NextResponse.json({ result: parsedData });
  } catch (error: any) {
    console.error('Error in generate route:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate micro-skill plan.' },
      { status: 500 }
    );
  }
}

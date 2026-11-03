import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { state, subject, grade, standardText, sampleQuestion, accommodations } = body;

    const tier1Prompt = `
    You are a Psychometrician and Lead Curriculum Specialist.
    Analyze this state standard and sample item:
    State: ${state} | Subject: ${subject} | Grade: ${grade}
    Standard: ${standardText}
    Sample Question: ${sampleQuestion || 'None provided.'}

    Return JSON strictly matching this schema:
    {
      "isolated_micro_skill": "1-2 sentence core actionable skill",
      "target_verb": "action verb",
      "dok_level": "1-4",
      "common_misconceptions": ["misconception 1", "misconception 2"]
    }
    `;

    const tier1Response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'system', content: tier1Prompt }],
      response_format: { type: 'json_object' },
    });

    const tier1Data = JSON.parse(tier1Response.choices[0].message.content || '{}');

    const tier2Prompt = `
    You are a Master Teacher specializing in zero-prep, highly active gameplay loops.
    Convert this micro-skill into a 10-15 minute active classroom drill:
    Isolated Skill: ${tier1Data.isolated_micro_skill}
    Target Verb: ${tier1Data.target_verb}
    Misconceptions to Target: ${tier1Data.common_misconceptions?.join(', ')}
    Grade: ${grade} | Subject: ${subject}
    Accommodations Needed: ${accommodations || 'Standard ELL sentence frames'}

    Output Markdown directly in this format:
    ## 🎯 Isolated Micro-Skill
    > **Target Skill:** [Isolated skill definition]
    > **Target DOK Level:** ${tier1Data.dok_level}

    ## 🎮 10-Minute Gameplay Loop
    * **Game Title:** [Action-oriented name]
    * **Core Mechanic:** [Turn-based, speed round, board race, etc.]
    * **Win Condition:** [Clear team or partner goal]

    ### Step-by-Step Instructions (Zero-Prep)
    1. **Setup (1 min):** [Teacher prompt]
    2. **Execution (8 mins):** [How students interact]
    3. **Verification (2 mins):** [Real-time check for understanding]

    ## 📝 Practice Drill Stems (Test Rigor)
    * **Item 1:** [Sample item matching standard rigor]
    * **Item 2:** [Sample item incorporating distractor trap]

    ## 💡 Instant Accommodations & ELL Supports
    * **ELL Sentence Frame:** [Ready-to-use sentence stem]
    * **Extension Tweak:** [Rapid challenge for fast-finishers]
    `;

    const tier2Response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'system', content: tier2Prompt }],
    });

    const markdownOutput = tier2Response.choices[0].message.content;

    return NextResponse.json({ result: markdownOutput, metadata: tier1Data });
  } catch (error) {
    console.error('Error generating drill:', error);
    return NextResponse.json({ error: 'Failed to generate skill drill.' }, { status: 500 });
  }
}

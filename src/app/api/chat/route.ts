// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: NextRequest) {
  try {
    const { message, chatHistory } = await req.json();
    
    // Convert chat history to OpenAI format
    const messages = [
      // System message to define the AI's role and capabilities
      {
        role: 'system',
        content: 'You are FitMind AI, an AI fitness and nutrition coach. Provide personalized advice about workouts, nutrition, and health goals. Be supportive, motivational, and evidence-based in your responses. Keep answers concise but informative.'
      },
      // Include previous conversation history
      ...chatHistory.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      // Add the current user message
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',  // or any other model you prefer
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000
    });

    // Extract the response
    const aiResponse = completion.choices[0].message.content;

    return NextResponse.json({ 
      success: true, 
      message: aiResponse 
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to get response from AI', error: (error as Error).message },
      { status: 500 }
    );
  }
}
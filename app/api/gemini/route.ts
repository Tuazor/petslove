import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { shelterInfo } = await request.json();
    
    // Create prompt for shelter description
    const prompt = `Write a friendly, informative paragraph about this animal shelter. Include what makes it special and its role in the community. Use these details:
    Name: ${shelterInfo.name}
    Location: ${shelterInfo.city}, ${shelterInfo.state}
    Additional context: This is an animal shelter that helps pets find their forever homes.
    Keep the tone warm and inviting, and keep it to 2-3 sentences.`;

    // Generate content using Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ description: text });
  } catch (error) {
    console.error('Error generating shelter description:', error);
    return NextResponse.json(
      { error: 'Failed to generate shelter description' },
      { status: 500 }
    );
  }
} 
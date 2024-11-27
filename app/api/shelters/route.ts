import { NextResponse } from 'next/server';
import sheltersData from '../../data/shelters.json';

export async function GET() {
  return NextResponse.json(sheltersData);
} 
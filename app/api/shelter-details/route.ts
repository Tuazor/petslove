import { NextResponse } from 'next/server';
import sheltersData from '../../data/shelters.json';

// This would ideally come from a database
const shelterDetails = new Map([
  // Example structure for one shelter
  ['ME118', {
    establishedYear: "1995",
    capacity: {
      dogs: 45,
      cats: 35,
      other: 15
    },
    adoptionRate: "78%",
    volunteerCount: 32,
    operatingHours: {
      weekday: "8:00 AM - 6:00 PM",
      weekend: "9:00 AM - 4:00 PM"
    },
    services: [
      "Pet Adoption",
      "Veterinary Services",
      "Pet Training",
      "Foster Program",
      "Pet Food Bank",
      "Microchipping",
      "Spay/Neuter Services"
    ],
    requirements: [
      "Valid Government ID",
      "Proof of Residence",
      "Veterinary Reference",
      "Home Visit Assessment",
      "Adoption Fee"
    ]
  }]
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shelterId = searchParams.get('id');

  if (!shelterId) {
    return NextResponse.json(
      { error: 'Shelter ID is required' },
      { status: 400 }
    );
  }

  const details = shelterDetails.get(shelterId);
  
  if (!details) {
    // Return default structure if no specific details found
    return NextResponse.json({
      establishedYear: "N/A",
      capacity: {
        dogs: "Contact shelter",
        cats: "Contact shelter",
        other: "Contact shelter"
      },
      adoptionRate: "Contact shelter",
      volunteerCount: "Contact shelter",
      operatingHours: {
        weekday: "Contact shelter",
        weekend: "Contact shelter"
      },
      services: [
        "Pet Adoption",
        "Contact shelter for more services"
      ],
      requirements: [
        "Valid ID",
        "Contact shelter for full requirements"
      ]
    });
  }

  return NextResponse.json(details);
} 
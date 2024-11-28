'use client';

import { Users, Calendar, Heart, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function VolunteerPage() {
  const volunteerOpportunities = [
    {
      title: 'Animal Care Assistant',
      description: 'Help with daily care, feeding, and enrichment activities for shelter animals.',
      commitment: 'Flexible, 4-8 hours per week',
      requirements: ['Must be 18+', 'Physical ability to lift 25lbs', 'Reliable transportation']
    },
    {
      title: 'Event Coordinator',
      description: 'Assist in organizing adoption events, fundraisers, and community outreach programs.',
      commitment: '5-10 hours per month',
      requirements: ['Strong organizational skills', 'Communication skills', 'Event planning experience']
    },
    {
      title: 'Foster Care Provider',
      description: 'Provide temporary homes for animals awaiting adoption.',
      commitment: 'Varies by animal needs',
      requirements: ['Stable home environment', 'Experience with animals', 'Veterinary transport ability']
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Volunteer With Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Make a difference in the lives of shelter animals. Join our network of dedicated volunteers.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {volunteerOpportunities.map((opportunity, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{opportunity.title}</h3>
            <p className="text-gray-600 mb-4">{opportunity.description}</p>
            <div className="flex items-center text-gray-600 mb-4">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              <span>{opportunity.commitment}</span>
            </div>
            <div className="space-y-2">
              {opportunity.requirements.map((req, i) => (
                <div key={i} className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section className="bg-green-50 rounded-lg p-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">How to Get Started</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Apply Online</h3>
              <p className="text-gray-600">Fill out our volunteer application form</p>
            </div>
            <div className="p-4">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Attend Orientation</h3>
              <p className="text-gray-600">Learn about our programs and policies</p>
            </div>
            <div className="p-4">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Start Volunteering</h3>
              <p className="text-gray-600">Begin making a difference</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <Link
          href="/contact"
          className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors"
        >
          Apply to Volunteer
        </Link>
      </section>
    </div>
  );
} 
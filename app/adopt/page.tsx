import React from 'react';
import Link from 'next/link';
import { Dog, Cat, HeartHandshake, ClipboardList, Home, Shield } from 'lucide-react';

export default function AdoptPage() {
  const adoptionSteps = [
    {
      icon: ClipboardList,
      title: 'Application',
      description: 'Fill out our comprehensive adoption questionnaire to help match you with the perfect pet.'
    },
    {
      icon: HeartHandshake,
      title: 'Meet & Greet',
      description: 'Schedule a meeting with potential pets to ensure a perfect connection and compatibility.'
    },
    {
      icon: Home,
      title: 'Home Visit',
      description: 'Our shelter representatives will conduct a brief home assessment to ensure a safe environment.'
    },
    {
      icon: Shield,
      title: 'Finalization',
      description: 'Complete adoption paperwork and bring your new family member home!'
    }
  ];

  const petTypes = [
    { 
      name: 'Dogs', 
      icon: Dog, 
      description: 'Loyal companions waiting for their forever home.' 
    },
    { 
      name: 'Cats', 
      icon: Cat, 
      description: 'Independent and loving felines seeking affection.' 
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Adopt, Don't Shop</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Every adoption saves a life. Find your perfect companion and make a difference today.
        </p>
      </div>

      {/* Pet Types */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Who Are You Looking to Adopt?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {petTypes.map((pet) => (
            <div 
              key={pet.name} 
              className="bg-white shadow-md rounded-lg p-8 text-center hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-6">
                <pet.icon size={64} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{pet.name}</h3>
              <p className="text-gray-600 mb-6">{pet.description}</p>
              <Link 
                href={`/search?type=${pet.name.toLowerCase()}`} 
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
              >
                Find {pet.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Adoption Process */}
      <section className="bg-green-50 rounded-lg p-12">
        <h2 className="text-3xl font-bold text-center mb-10">Our Adoption Process</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {adoptionSteps.map((step, index) => (
            <div 
              key={step.title} 
              className="bg-white rounded-lg p-6 text-center shadow-md"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <step.icon size={32} className="text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Change a Life?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Thousands of animals are waiting for their forever home. Start your adoption journey today.
        </p>
        <Link 
          href="/search" 
          className="bg-green-600 text-white px-10 py-4 rounded-full text-lg hover:bg-green-700 transition duration-300"
        >
          Browse Available Pets
        </Link>
      </section>
    </div>
  );
} 
import React from 'react';
import Link from 'next/link';
import { Heart, Globe, Users, Award } from 'lucide-react';

export default function AboutPage() {
  const missionStats = [
    { 
      icon: Heart, 
      number: '50,000+', 
      label: 'Animals Rescued' 
    },
    { 
      icon: Globe, 
      number: '500+', 
      label: 'Shelters Partnered' 
    },
    { 
      icon: Users, 
      number: '100,000+', 
      label: 'Adoptions Facilitated' 
    },
    { 
      icon: Award, 
      number: '10+', 
      label: 'Years of Service' 
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Our Mission: Connecting Pets with Loving Homes</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          PetsLove is dedicated to bridging the gap between animal shelters and potential pet parents, 
          ensuring every animal finds a safe, loving home.
        </p>
      </section>

      {/* Mission Stats */}
      <section className="mb-16">
        <div className="grid md:grid-cols-4 gap-8">
          {missionStats.map((stat) => (
            <div 
              key={stat.label} 
              className="bg-green-50 rounded-lg p-6 text-center hover:shadow-md transition duration-300"
            >
              <div className="flex justify-center mb-4">
                <stat.icon size={48} className="text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-green-700 mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Our Story</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-700 mb-6">
            Founded in 2012, PetsLove began with a simple yet powerful mission: 
            to make pet adoption easier, more transparent, and more accessible for everyone.
          </p>
          <p className="text-xl text-gray-700 mb-6">
            What started as a small local initiative has grown into a nationwide platform 
            connecting thousands of shelters with potential pet parents.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-green-50 rounded-lg p-12 mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-green-600">Compassion</h3>
            <p className="text-gray-600">
              We believe in treating every animal with dignity, respect, and love.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-green-600">Transparency</h3>
            <p className="text-gray-600">
              We provide clear, honest information about shelters and pets.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-green-600">Community</h3>
            <p className="text-gray-600">
              We foster connections between shelters, animals, and loving families.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Join Our Mission</h2>
        <p className="text-xl text-gray-600 mb-8">
          Whether you're looking to adopt, volunteer, or support, 
          there are many ways to make a difference.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/adopt" 
            className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition duration-300"
          >
            Adopt a Pet
          </Link>
          <Link 
            href="/contact" 
            className="bg-white border border-green-600 text-green-600 px-8 py-3 rounded-full hover:bg-green-50 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
} 
import React from 'react';
import Link from 'next/link';
import { FileText, Gavel, Globe, Users } from 'lucide-react';

export default function TermsOfServicePage() {
  const termsSections = [
    {
      title: 'Acceptance of Terms',
      icon: Gavel,
      content: [
        'By accessing PetsLove, you agree to these terms',
        'Terms apply to all users and visitors',
        'Continued use constitutes acceptance of terms'
      ]
    },
    {
      title: 'User Responsibilities',
      icon: Users,
      content: [
        'Provide accurate information',
        'Respect shelter and animal listings',
        'No misuse of platform features',
        'Comply with local adoption regulations'
      ]
    },
    {
      title: 'Platform Usage',
      icon: Globe,
      content: [
        'Connect users with animal shelters',
        'Facilitate pet adoption information',
        'No guarantee of adoption',
        'Shelters have final adoption decisions'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Terms of Service</h1>
        <div className="flex justify-center mb-6">
          <FileText size={48} className="text-green-600" />
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Welcome to PetsLove. These terms govern your use of our platform and services.
        </p>
      </section>

      <div className="max-w-4xl mx-auto space-y-12">
        {termsSections.map((section) => (
          <section 
            key={section.title} 
            className="bg-white shadow-md rounded-lg p-8"
          >
            <div className="flex items-center mb-6">
              <section.icon size={32} className="text-green-600 mr-4" />
              <h2 className="text-2xl font-semibold text-gray-800">{section.title}</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {section.content.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 text-green-600">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="bg-green-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Legal Disclaimers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Limitation of Liability</h3>
              <p className="text-gray-600">
                PetsLove is not responsible for interactions between users and shelters.
                Users adopt at their own discretion.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Modifications to Terms</h3>
              <p className="text-gray-600">
                We may update these terms. Continued use after changes constitutes acceptance.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="text-center mt-16">
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          These terms were last updated on {new Date().toLocaleDateString()}. 
          Please review them periodically.
        </p>
        <Link 
          href="/contact" 
          className="bg-green-600 text-white px-10 py-4 rounded-full hover:bg-green-700 transition duration-300"
        >
          Contact Legal Team
        </Link>
      </section>
    </div>
  );
} 
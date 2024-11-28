'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Database, UserCheck } from 'lucide-react';

export default function PrivacyPage() {
  const privacySections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Personal information you provide (name, email, phone number)',
        'Location data when searching for shelters',
        'Device and browser information',
        'Cookies and tracking technologies'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: UserCheck,
      content: [
        'Facilitate pet adoption services',
        'Communicate with you about shelters and pets',
        'Improve our website and services',
        'Comply with legal obligations'
      ]
    },
    {
      title: 'Data Protection',
      icon: Lock,
      content: [
        'Encrypted data transmission',
        'Secure server infrastructure',
        'Limited access to personal information',
        'Regular security audits'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Privacy Policy</h1>
        <div className="flex justify-center mb-6">
          <Shield size={48} className="text-green-600" />
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          At PetsLove, we are committed to protecting your privacy and ensuring the security of your personal information.
        </p>
      </section>

      <div className="max-w-4xl mx-auto space-y-12">
        {privacySections.map((section) => (
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
          <h2 className="text-2xl font-semibold mb-6 text-center">Your Rights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">You Have the Right To:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Access your personal information</li>
                <li>Request data deletion</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-600">
                For privacy concerns or requests, please contact us at:
                <br />
                <a href="mailto:privacy@petslove.com" className="text-green-600 hover:underline">
                  privacy@petslove.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="text-center mt-16">
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          This privacy policy was last updated on {new Date().toLocaleDateString()}. 
          We may update this policy periodically, so please review it frequently.
        </p>
        <Link 
          href="/contact" 
          className="bg-green-600 text-white px-10 py-4 rounded-full hover:bg-green-700 transition duration-300"
        >
          Contact Privacy Team
        </Link>
      </section>
    </div>
  );
} 
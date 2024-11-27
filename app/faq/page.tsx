import React from 'react';
import { HelpCircle, Info, MessageCircleQuestion } from 'lucide-react';
import Head from 'next/head';

export default function FAQPage() {
  const faqSections = [
    {
      category: 'Adoption Process',
      icon: HelpCircle,
      questions: [
        {
          question: 'How long does the adoption process take?',
          answer: 'The adoption process typically takes 1-2 weeks. This includes application review, home visit, and meeting the pet.'
        },
        {
          question: 'What are the requirements for adoption?',
          answer: 'Requirements vary by shelter but generally include proof of residence, ability to care for a pet, and sometimes a minimum age requirement.'
        },
        {
          question: 'Are there adoption fees?',
          answer: 'Yes, adoption fees cover initial veterinary care, vaccinations, spaying/neutering, and support shelter operations.'
        }
      ]
    },
    {
      category: 'Pet Care',
      icon: Info,
      questions: [
        {
          question: 'How much does it cost to care for a pet?',
          answer: 'Annual costs vary by pet type but typically range from $500-$2,000, including food, veterinary care, supplies, and insurance.'
        },
        {
          question: 'What supplies do I need for a new pet?',
          answer: 'Basic supplies include food and water bowls, bed, collar, leash, toys, grooming tools, and initial food supply.'
        },
        {
          question: 'How do I prepare my home for a new pet?',
          answer: 'Pet-proof your home, create a designated space, remove toxic plants, secure trash, and have necessary supplies ready.'
        }
      ]
    },
    {
      category: 'Shelter Support',
      icon: MessageCircleQuestion,
      questions: [
        {
          question: 'Can I volunteer at a shelter?',
          answer: 'Most shelters welcome volunteers. Typical roles include walking dogs, socializing cats, cleaning, and administrative support.'
        },
        {
          question: 'How can I donate to animal shelters?',
          answer: 'Donations can be monetary, supplies, or time. Many shelters have wishlist items and volunteer programs.'
        },
        {
          question: 'What happens to pets that aren\'t adopted?',
          answer: 'Reputable shelters are no-kill and work tirelessly to find homes. They provide long-term care and explore all adoption possibilities.'
        }
      ]
    }
  ];

  // Generate JSON-LD structured data
  const generateFAQStructuredData = () => {
    const mainEntity = faqSections.flatMap(section => 
      section.questions.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    );

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": mainEntity
    };
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(generateFAQStructuredData()) 
          }}
        />
      </Head>
      
      <div className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about pet adoption, care, and shelter support.
          </p>
        </section>

        {faqSections.map((section) => (
          <section key={section.category} className="mb-16">
            <div className="flex items-center justify-center mb-10">
              <section.icon size={48} className="text-green-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">{section.category}</h2>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {section.questions.map((faq, index) => (
                <details 
                  key={index} 
                  className="bg-white shadow-md rounded-lg"
                >
                  <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-green-50 transition duration-300">
                    <span className="text-xl font-semibold text-gray-800">{faq.question}</span>
                    <HelpCircle size={24} className="text-green-600" />
                  </summary>
                  <div className="p-6 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        {/* Call to Action */}
        <section className="text-center mt-16 bg-green-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Still Have Questions?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our team is here to help. Reach out for personalized support and guidance.
          </p>
          <a 
            href="/contact" 
            className="bg-green-600 text-white px-10 py-4 rounded-full text-lg hover:bg-green-700 transition duration-300"
          >
            Contact Support
          </a>
        </section>
      </div>
    </>
  );
} 
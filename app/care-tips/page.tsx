import React from 'react';
import { Dog, Cat, Stethoscope, Bone, PawPrintIcon, Heart } from 'lucide-react';

export default function CareTipsPage() {
  const careTips = [
    {
      category: 'Dogs',
      icon: Dog,
      tips: [
        {
          title: 'Nutrition',
          description: 'Provide a balanced diet appropriate for your dog\'s age, size, and activity level. Consult with a veterinarian for personalized nutrition advice.',
          icon: Bone
        },
        {
          title: 'Exercise',
          description: 'Regular exercise is crucial. Aim for daily walks, playtime, and mental stimulation based on your dog\'s breed and energy level.',
          icon: PawPrintIcon
        },
        {
          title: 'Health Checks',
          description: 'Schedule annual veterinary check-ups, keep vaccinations current, and maintain a regular preventative care routine.',
          icon: Stethoscope
        }
      ]
    },
    {
      category: 'Cats',
      icon: Cat,
      tips: [
        {
          title: 'Indoor Environment',
          description: 'Create a stimulating indoor environment with scratching posts, climbing trees, and interactive toys to keep your cat mentally and physically active.',
          icon: Heart
        },
        {
          title: 'Litter Box Care',
          description: 'Clean the litter box daily, use unscented litter, and provide multiple boxes in multi-cat households.',
          icon: PawPrintIcon
        },
        {
          title: 'Grooming',
          description: 'Regular brushing helps prevent hairballs, reduces shedding, and provides an opportunity to check for any skin issues.',
          icon: Stethoscope
        }
      ]
    }
  ];

  const generalTips = [
    {
      title: 'Routine Veterinary Care',
      description: 'Regular check-ups are essential for preventing health issues and catching potential problems early.',
      icon: Stethoscope
    },
    {
      title: 'Mental Stimulation',
      description: 'Provide toys, training, and interactive play to keep your pet mentally engaged and prevent boredom.',
      icon: Heart
    },
    {
      title: 'Socialization',
      description: 'Expose your pet to different environments, people, and other animals to develop a well-adjusted temperament.',
      icon: PawPrintIcon
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Pet Care Essentials</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive guide to keeping your furry friends healthy, happy, and thriving.
        </p>
      </section>

      {/* Specific Pet Care Tips */}
      {careTips.map((petCategory) => (
        <section key={petCategory.category} className="mb-16">
          <div className="flex items-center justify-center mb-10">
            <petCategory.icon size={48} className="text-green-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-800">{petCategory.category} Care</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {petCategory.tips.map((tip) => (
              <div 
                key={tip.title} 
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center mb-4">
                  <tip.icon size={32} className="text-green-600 mr-4" />
                  <h3 className="text-xl font-semibold">{tip.title}</h3>
                </div>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* General Care Tips */}
      <section className="bg-green-50 rounded-lg p-12">
        <h2 className="text-3xl font-bold text-center mb-10">Universal Pet Care Tips</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {generalTips.map((tip) => (
            <div 
              key={tip.title} 
              className="bg-white rounded-lg p-6 text-center shadow-md"
            >
              <div className="flex justify-center mb-4">
                <tip.icon size={48} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Need More Guidance?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Every pet is unique. Consult with veterinarians and experienced pet owners for personalized advice.
        </p>
        <a 
          href="/contact" 
          className="bg-green-600 text-white px-10 py-4 rounded-full text-lg hover:bg-green-700 transition duration-300"
        >
          Contact Experts
        </a>
      </section>
    </div>
  );
} 
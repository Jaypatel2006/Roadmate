"use client";

import { useState } from 'react';
import { 
  CarFront, 
  Wrench, 
  Shield, 
  MapPin, 
  Clock, 
  Zap, 
  Truck, 
  MessageCircle, 
  Check, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';

// Advanced Service Data Model
const serviceCategories = [
  {
    id: 'emergency',
    title: 'Emergency Response',
    icon: HelpCircle,
    color: 'red',
    services: [
      {
        name: 'Rapid Towing',
        description: 'Instant vehicle recovery with GPS-tracked trucks',
        features: [
          'Real-time location tracking',
          'Flatbed and wheel-lift options',
          'Nationwide coverage',
          'Specialized equipment for all vehicle types'
        ],
        responseTime: 'Under 30 Minutes',
        complexity: 'High'
      },
      {
        name: 'Roadside Rescue',
        description: 'Comprehensive on-spot mechanical assistance',
        features: [
          'Battery jumpstart',
          'Fuel delivery',
          'Tire change and repair',
          'Minor mechanical fixes'
        ],
        responseTime: 'Within 15 Minutes',
        complexity: 'Medium'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Support',
    icon: Wrench,
    color: 'blue',
    services: [
      {
        name: 'Advanced Diagnostic',
        description: 'AI-powered vehicle health assessment',
        features: [
          'Remote diagnostic scanning',
          'Predictive maintenance alerts',
          'Comprehensive vehicle report',
          'Integration with manufacturer systems'
        ],
        responseTime: 'Instant Analysis',
        complexity: 'Very High'
      },
      {
        name: 'Mobile Repair',
        description: 'Professional technicians at your location',
        features: [
          'Certified mobile mechanics',
          'Comprehensive tool kits',
          'Major and minor repair capabilities',
          'Transparent cost estimation'
        ],
        responseTime: 'Within 1 Hour',
        complexity: 'High'
      }
    ]
  },
  {
    id: 'premium',
    title: 'Premium Protection',
    icon: Shield,
    color: 'green',
    services: [
      {
        name: 'Complete Coverage',
        description: 'Holistic vehicle and traveler protection',
        features: [
          'Extended warranty support',
          'Accident and legal assistance',
          'Medical coordination',
          'Alternative transportation'
        ],
        responseTime: '24/7 Support',
        complexity: 'Comprehensive'
      },
      {
        name: 'Smart Monitoring',
        description: 'Proactive vehicle and journey tracking',
        features: [
          'Real-time vehicle tracking',
          'Emergency route guidance',
          'Automated insurance claim support',
          'Personal safety alerts'
        ],
        responseTime: 'Continuous Monitoring',
        complexity: 'Advanced'
      }
    ]
  }
];

const ServiceDetailCard = ({ service }) => {
  return (
    <div className=" bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold 
          ${service.complexity === 'High' ? 'bg-red-100 text-red-800' : 
            service.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-green-100 text-green-800'}`}>
          {service.complexity}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{service.description}</p>
      
      <div className="space-y-2 mb-4">
        {service.features.map((feature, idx) => (
          <div key={idx} className="flex items-center text-gray-700">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            {feature}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-blue-600 font-medium">
          Response: {service.responseTime}
        </span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Book Service
        </button>
      </div>
    </div>
  );
};

export default function PremiumServicesPage() {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Intelligent Roadside Assistance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing road support with cutting-edge technology, predictive analytics, and instant response mechanisms.
          </p>
        </section>

        {/* Category Selector */}
        <div className="flex justify-center mb-12 space-x-4">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-full transition-all
                  ${activeCategory === category.id 
                    ? `bg-${category.color}-600 text-white` 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `}
              >
                <Icon className="h-6 w-6" />
                <span className="font-semibold">{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <section className="grid md:grid-cols-2 gap-8">
          {serviceCategories
            .find(cat => cat.id === activeCategory)
            .services.map((service, index) => (
              <ServiceDetailCard key={index} service={service} />
            ))
          }
        </section>

        {/* Advanced Features Section */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">Beyond Traditional Assistance</h2>
              <p className="text-xl max-w-2xl">
                Leveraging AI, IoT, and real-time data analytics to transform roadside support into a predictive, intelligent service ecosystem.
              </p>
            </div>
            <div className="flex space-x-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <Zap className="h-10 w-10 text-yellow-300" />
                <p className="mt-2 font-semibold">Smart Alerts</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <Truck className="h-10 w-10 text-green-300" />
                <p className="mt-2 font-semibold">Instant Dispatch</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            Transforming Roadside Challenges into Seamless Journeys
          </p>
        </div>
      </footer>
    </div>
  );
}
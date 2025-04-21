'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Wrench, X } from 'lucide-react';

const Map = dynamic(() => import('../../components/LeafletMap'), {
  ssr: false,
});

const services = [
  { name: 'Puncture', price: 100 },
  { name: 'Break Fail', price: 300 },
  { name: 'Battery issue', price: 1000 },
  { name: 'Clutch problem', price: 500 },
  { name: 'Engine overheating', price: 500 },
  { name: 'Chain/sprocket issue', price: 500 },
];

const Page = () => {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const getUserLocation = () => {
    return new Promise((resolve) => {
      setLocationError('');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const location = { lat: latitude, lng: longitude };
          setUserLocation(location);
          resolve(location);
        },
        (err) => {
          const errorMsg = 'Location permission denied or unavailable.';
          setLocationError(errorMsg);
          console.error(err);
          resolve(null);
        }
      );
    });
  };

  const handleNearby = async () => {
    setLoading(true);
    
    try {
      let position = userLocation;
      if (!position) {
        position = await getUserLocation();
      }
      
      if (!position) {
        alert('Cannot access your location. Please allow location access and try again.');
        setLoading(false);
        return;
      }
      
      // Use GET method to fetch all mechanics if you don't have location
      // OR use POST method to get filtered mechanics based on location
      let url = '/api/getmechanics';
      let options = {};
      
      if (position) {
        options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude: position.lat,
            longitude: position.lng
          }),
        };
      }
      
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Mechanics data:', data);
      setMechanics(data.mechanics || []);
      
      if (data.mechanics && data.mechanics.length > 0) {
        console.log(`Found ${data.mechanics.length} mechanics nearby`);
      } else {
        console.log('No mechanics found nearby');
      }
    } catch (error) {
      console.error('Error fetching mechanics:', error);
      alert(`Error fetching mechanics: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSeeMechanics = () => {
    setShowLocationModal(true);
    getUserLocation();
  };

  const handleCheckboxChange = (serviceName) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const totalPrice = selectedServices.reduce((total, name) => {
    const service = services.find((s) => s.name === name);
    return total + (service?.price || 0);
  }, 0);

  // Initialize location when component mounts
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800">
      {/* Hero Section */}
      <section className="text-center px-4 max-w-5xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Find Help, <span className="text-blue-600">Fast</span>
        </h1>
        <p className="text-xl text-gray-600 font-bold">
          Real-time location of roadside mechanics. Get help right where you are.
        </p>
      </section>

      {/* CTA Section */}
      <section>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg text-gray-700 mb-10">
            Tap a button and connect with trusted mechanics nearby.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              className={`flex items-center justify-center gap-3 px-8 py-4 text-blue-600 bg-white border border-blue-300 rounded-full shadow-lg transition hover:scale-105 hover:bg-blue-50 font-medium text-lg cursor-pointer ${loading ? 'opacity-70' : ''}`} 
              onClick={handleNearby}
              disabled={loading}
            >
              <MapPin size={22}/>
              {loading ? "Loading..." : "Find Nearby Mechanics"}
            </button>
            <button
              onClick={() => setShowBookingModal(true)}
              className="flex items-center justify-center gap-3 px-8 py-4 text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-xl transition hover:scale-105 hover:brightness-110 font-medium text-lg"
            >
              <Wrench size={22} />
              Book a Mechanic
            </button>
          </div>
        </div>
      </section>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowLocationModal(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Your Location</h2>

            {userLocation ? (
              <div className="text-center text-green-600 font-medium">
                📍 Latitude: {userLocation.lat.toFixed(4)}, Longitude: {userLocation.lng.toFixed(4)}
              </div>
            ) : locationError ? (
              <p className="text-center text-red-500">{locationError}</p>
            ) : (
              <p className="text-center text-gray-500">Fetching your location...</p>
            )}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowBookingModal(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-6 text-center">Select Services</h2>

            <div className="space-y-4">
              {services.map((service) => (
                <label
                  key={service.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.name)}
                      onChange={() => handleCheckboxChange(service.name)}
                      className="accent-blue-600 w-5 h-5"
                    />
                    <span className="text-gray-800">{service.name}</span>
                  </div>
                  <span className="text-gray-600">₹{service.price}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center border-t pt-4">
              <span className="font-semibold text-lg">Total:</span>
              <span className="text-blue-600 font-bold text-xl">₹{totalPrice}</span>
            </div>

            <button
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-medium hover:brightness-110 transition"
              onClick={() => {
                alert('Booking confirmed!');
                setShowBookingModal(false);
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Map Section with debugging info */}
      <section className="w-full max-w-7xl mx-auto mb-20">
        {mechanics.length > 0 && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
            Found {mechanics.length} mechanics nearby
          </div>
        )}
        
        <div className="h-[60vh] md:h-[70vh] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
          <Map mechanics={mechanics} />
        </div>
      </section>
    </div>
  );
};

export default Page;
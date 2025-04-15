'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Wrench } from 'lucide-react';

const Map = dynamic(() => import('../../components/LeafletMap'), {
  ssr: false,
});

const Page = () => {
  const [mechdata,setmechdata] = useState([])
  const [loading, setLoading] = useState(false);
  const handlenearby = async()=>{
    setLoading(true)
    const response = await fetch('/api/getmechanics', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data.mechanics);
    setmechdata(data.mechanics)
    setLoading(false)
  }

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

      {/* Map Section */}
      <section className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-200 mb-20">
        <div className="h-[60vh] md:h-[70vh] w-full">
          <Map />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-100 via-white to-pink-100 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Need Assistance Right Now?
          </h2>
          <p className="text-lg text-gray-700 mb-10">
            Tap a button and connect with trusted mechanics nearby.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className={`flex items-center justify-center gap-3 px-8 py-4 text-blue-600 bg-white border border-blue-300 rounded-full shadow-lg transition hover:scale-105 hover:bg-blue-50 font-medium text-lg cursor-pointer`} onClick={handlenearby}>
              <MapPin size={22}/>
              {loading ? "Loading..." : "Find Nearby Mechanics"}
            </button>
            <button className="flex items-center justify-center gap-3 px-8 py-4 text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-xl transition hover:scale-105 hover:brightness-110 font-medium text-lg">
              <Wrench size={22} />
              Book a Mechanic
            </button>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Page;

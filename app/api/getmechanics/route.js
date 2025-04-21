// app/api/getmechanics/route.js
import { NextResponse } from 'next/server';
import connectDb from '@/db/connect';
import { Mechanic } from '@/db/models/mechanicmodel';

// Haversine formula to calculate distance between two points on earth
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

// Handler for GET requests
export async function GET(request) {
  try {
    await connectDb();
    
    const mechanics = await Mechanic.find({
      latitude: { $exists: true },
      longitude: { $exists: true }
    }).select('name email latitude longitude');
    
    return NextResponse.json({ mechanics });
  } catch (error) {
    console.error('Error fetching mechanics:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

// Handler for POST requests
export async function POST(request) {
  try {
    await connectDb();
    
    const body = await request.json();
    const { latitude, longitude } = body;
    
    // Validate coordinates
    if (!latitude || !longitude) {
      return NextResponse.json(
        { message: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    const mechanics = await Mechanic.find({
      latitude: { $exists: true },
      longitude: { $exists: true }
    }).select('name email latitude longitude');
    
    // Filter mechanics within 5km radius
    const nearbyMechanics = mechanics.filter(mechanic => {
      const distance = calculateDistance(
        latitude, longitude, 
        mechanic.latitude, mechanic.longitude
      );
      return distance <= 5; // 5km radius
    });

    return NextResponse.json({ mechanics: nearbyMechanics });
  } catch (error) {
    console.error('Error fetching mechanics:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
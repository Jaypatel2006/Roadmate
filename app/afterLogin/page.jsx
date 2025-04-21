"use client"; // Required for Next.js App Router

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const MechanicMap = () => {
    const [mechanics, setMechanics] = useState([]);

    useEffect(() => {
        const fetchMechanics = async () => {
            try {
                const response = await fetch("/api/getMech");
                const data = await response.json();
                setMechanics(data);
            } catch (error) {
                console.error("Error fetching mechanics:", error);
            }
        };

        fetchMechanics();
    }, []);

    return (
        <MapContainer center={[20, 78]} zoom={5} style={{ height: "80vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mechanics.map((mechanic) => (
                <Marker key={mechanic._id} position={[mechanic.latitude, mechanic.longitude]}>
                    <Popup>{mechanic.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MechanicMap;

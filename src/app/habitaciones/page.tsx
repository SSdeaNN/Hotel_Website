'use client';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaWifi, FaTv } from "react-icons/fa";
import { PiShowerLight } from "react-icons/pi";
import { Key, useEffect, useState } from 'react';
import { Room } from '@/types/rooms.type';

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <FaWifi className="text-black mr-2" />;
      case 'tv':
        return <FaTv className="text-black mr-2" />;
      case 'ducha':
        return <PiShowerLight className="text-black mr-2" />;
      default:
        return null;
    }
  };


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:3000/rooms');
        if (!response.ok) throw new Error('Error fetching rooms');
        const data:Room[] = await response.json();
        setRooms(data);
      } catch (err) {
        setError('Error al cargar las habitaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <div className="text-center py-8">Cargando habitaciones...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
      <section className="relative">
        {/* Enlace y texto en la esquina superior izquierda */}
        <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 text-white">
          <Link href="/" className="hover:underline text-white font-medium">
            Inicio
          </Link>
          <span className="text-white font-medium">&gt;&gt;</span>
          <span className="text-white font-medium">Habitaciones</span>
        </div>

        {/* Contenido centrado */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
          <h1 className="text-4xl font-bold mb-4">Habitaciones y Suites</h1>
          <p className="text-xl max-w-2xl">
            Experimente el lujo y la comodidad en nuestras exclusivas habitaciones
          </p>
        </div>

        {/* Imagen de fondo */}
        <img 
          src="/hotel22.png" 
          alt="Habitaciones y Suites" 
          className="w-full h-[500px] object-cover rounded-b-lg shadow-lg" 
        />
      </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div 
                key={room.name} 
                className="bg-[#F2EBD4] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
              >
                <div className="h-64 w-full">
                  <img
                    src={'http://localhost:3000/uploads/' + room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{room.name}</h2>
                  <p className="text-[#BE8931] text-xl font-semibold mb-4">
                    ${room.price.toLocaleString()} MXN / noche
                  </p>
                  <ul className="mb-4 text-gray-700">
                    {room.amenities.split(',').map((amenity: string, idx: Key | null | undefined) => (
                      <li key={idx} className="flex items-center mb-2">
                        <svg 
                          className="w-4 h-4 mr-2 text-[#BE8931]" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                        {getAmenityIcon(amenity)}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={{
                      pathname: '/reserva',
                      query: { room: room.id }
                    }}
                    className="block w-full text-center bg-[#BE8931] text-white py-3 rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Reservar ahora
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
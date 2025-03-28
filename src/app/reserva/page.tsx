'use client';

import { FaWifi, FaTv } from 'react-icons/fa';
import { PiShowerLight } from 'react-icons/pi';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from 'next/link';

interface RoomType {
  id: string;
  name: string;
  price: number;
  image: string;
  amenities: string[];
}

interface Reservation {
  id: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  totalPrice: number;
  status: 'pending' | 'confirmed';
}

export default function Reserva() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [roomType, setRoomType] = useState<RoomType | null>(null);
  
  // Room types (same as in habitaciones page)
  const roomTypes: RoomType[] = [
    {
      id: 'estandar',
      name: 'Habitación Estándar',
      price: 1900,
      image: '/image.jpg',
      amenities: [
        <FaWifi className="text-black mr-2" />,
        <FaTv className="text-black mr-2" />,
        <PiShowerLight className="text-black mr-2" />
      ]
    },
    {
      id: 'vista-mar',
      name: 'Habitación Vista al Mar',
      price: 2500,
      image: '/image.jpg',
      amenities: [
        'Wifi',
        'Television',
        'Aire acondicionado',
        'Baño privado',
        'Vista al mar'
      ]
    },
    {
      id: 'cocina',
      name: 'Habitación con Cocina',
      price: 2800,
      image: '/image.jpg',
      amenities: [
        'Wifi',
        'Television',
        'Aire acondicionado',
        'Baño privado',
        'Cocina pequeña'
      ]
    },
    {
      id: 'balcon',
      name: 'Habitación con Balcón',
      price: 2300,
      image: '/image.jpg',
      amenities: [
        'Wifi',
        'Television',
        'Aire acondicionado',
        'Baño privado',
        'Balcón'
      ]
    },
    {
      id: 'ejecutiva',
      name: 'Habitación Ejecutiva',
      price: 3000,
      image: '/image.jpg',
      amenities: [
        'Wifi',
        'Television',
        'Aire acondicionado',
        'Baño privado',
        'Minibar'
      ]
    },
    {
      id: 'jacuzzi',
      name: 'Suite con Jacuzzi',
      price: 4000,
      image: '/image.jpg',
      amenities: [
        'Wifi',
        'Television',
        'Aire acondicionado',
        'Baño privado',
        'Jacuzzi'
      ]
    }
  ];

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0
  });

  useEffect(() => {
    const roomId = searchParams.get('room');
    if (roomId) {
      const selectedRoom = roomTypes.find(room => room.id === roomId);
      setRoomType(selectedRoom || null);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'adults' || name === 'children' ? parseInt(value) : value
    }));
  };

  const isLoggedIn = Boolean(localStorage.getItem('userToken')); // Example: Check if a user token exists

  const handleReserva = () => {
    if (!isLoggedIn) {
      // Redirigir al login si no está logueado
      router.push('/usuario?redirect=/reserva?room=' + roomType?.id);
      return;
    }
  
    if (!roomType) return;
  
    // Validar campos
    if (!formData.checkIn || !formData.checkOut) {
      alert('Por favor, selecciona las fechas de tu reserva');
      return;
    }
  
    // Calcular total de días
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
  
    // Crear reserva
    const newReservation: Reservation = {
      id: `RES-${Date.now()}`,
      roomType: roomType.name,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: {
        adults: formData.adults,
        children: formData.children
      },
      totalPrice: roomType.price * nights,
      status: 'pending'
    };
  
    // Obtener reservaciones existentes
    const existingReservations = localStorage.getItem('reservations');
    const reservations: Reservation[] = existingReservations 
      ? JSON.parse(existingReservations) 
      : [];
  
    // Guardar nueva reserva
    reservations.push(newReservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));
  
    // Navegar a confirmación con query param
    router.push(`/confirmar-reserva?reservationId=${newReservation.id}`);
  };

  if (!roomType) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f2e6d4]">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <p className="text-[#062214]">Tipo de habitación no encontrado</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f2e6d4]">
      <Navbar />
      
      {/* Breadcrumb */}
  <div className="container mx-auto px-4 mt-4">
    <div className="flex items-center space-x-2 text-black">
      <Link href="/" className="hover:underline text-black font-medium">
        Inicio
      </Link>
      <span className="text-black font-medium">&gt;&gt;</span>
      <Link href="/habitaciones" className="hover:underline text-black font-medium">
        Habitaciones
      </Link>
      <span className="text-black font-medium">&gt;&gt;</span>
      <span className="text-black font-medium">Reservaciones</span>
    </div>
  </div>

      <main className="container mx-auto px-4 py-12">
        
        <h1 className="text-4xl font-bold mb-8 text-[#062214]">Reserva de {roomType.name}</h1>
        
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img 
                src={roomType.image} 
                alt={roomType.name} 
                className="w-full h-64 object-cover rounded-lg mb-4" 
              />
              <h2 className="text-2xl font-bold mb-2 text-[#062214]">{roomType.name}</h2>
              <p className="text-[#be8931] text-xl font-semibold mb-4">
                ${roomType.price.toLocaleString()} MXN / noche
              </p>
              <ul className="mb-4 text-[#062214]">
                {roomType.amenities.map((amenity, idx) => (
                  <li key={idx} className="flex items-center mb-2">
                    <svg 
                      className="w-4 h-4 mr-2 text-[#be8931]" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#062214]">Detalles de la Reserva</h3>
              
              <div className="mb-4">
                <label className="block mb-2 text-[#062214]">Check-in</label>
                <input 
                  type="date" 
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]} // Restringe fechas anteriores al día actual
                  className="w-full p-2 border rounded-md border-[#dda456] focus:border-[#be8931] text-black"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-[#062214]">Check-out</label>
                <input 
                  type="date" 
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  min={formData.checkIn || new Date().toISOString().split('T')[0]} // Restringe fechas anteriores al check-in
                  className="w-full p-2 border rounded-md border-[#dda456] focus:border-[#be8931] text-black"
                />
              </div>
              
              <div className="mb-4">
               <label className="block mb-2 text-[#062214]">Adultos</label>
              <input 
                type="number" 
                name="adults"
                min="1"
                value={formData.adults}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (value + formData.children <= 5) {
                    handleInputChange(e);
                  } else {
                    alert('El total de personas (adultos y niños) no puede exceder 5.');
                  }
                }}
                className="w-full p-2 border rounded-md border-[#dda456] focus:border-[#be8931] text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-[#062214]">Niños</label>
              <input 
                type="number" 
                name="children"
                min="0"
                value={formData.children}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (value + formData.adults <= 5) {
                    handleInputChange(e);
                  } else {
                    alert('El total de personas (adultos y niños) no puede exceder 5.');
                  }
                }}
                className="w-full p-2 border rounded-md border-[#dda456] focus:border-[#be8931] text-black"
              />
            </div>
              
              <button 
                onClick={handleReserva}
                className="w-full bg-[#be8931] text-white py-3 rounded-md hover:bg-opacity-90"
              >
                Confirmar Reserva
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
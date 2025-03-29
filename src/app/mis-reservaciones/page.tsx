'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { 
  CalendarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  XCircleIcon 
} from '@heroicons/react/24/outline';

interface Reservation {
  id: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed';
}

interface JwtPayload {
  userId: string;
  exp: number;
}

export default function MisReservaciones() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [activeTab, setActiveTab] = useState<'pendientes' | 'reservados'>('pendientes');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserReservation = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        
        // Validar token
        if (!userToken) {
          setError('Debes iniciar sesión para ver reservaciones');
          setLoading(false);
          return;
        }

        // Decodificar token para verificar expiración
        const decodedToken = jwtDecode<JwtPayload>(userToken);
        if (Date.now() >= decodedToken.exp * 1000) {
          setError('Tu sesión ha expirado');
          localStorage.removeItem('userToken');
          setLoading(false);
          return;
        }

        // Cambiar puerto del API (ajustar según tu backend)
        const response = await fetch('http://localhost:3000/reservations/user/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al obtener reservaciones');
        }

        const data: Reservation[] = await response.json();
        setReservations(data);
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchUserReservation();
  }, []); // Eliminamos la dependencia de loading

  const cancelReservation = async (id: string) => {
    try {
      const userToken = localStorage.getItem('userToken');
      const response = await fetch(`http://localhost:3001/api/reservations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });

      if (!response.ok) throw new Error('Error al cancelar reservación');

      setReservations(prev => prev.filter(res => res.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cancelar');
    }
  };

  const filteredReservations = reservations.filter(res => 
    res.status === (activeTab === 'pendientes' ? 'pending' : 'confirmed')
  );

  // Renderizar estados
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <p>Cargando reservaciones...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <p className="text-red-500">{error}</p>
          <Link href="/usuario" className="text-[#BE8931] hover:underline mt-4 block">
            Volver a iniciar sesión
          </Link>
        </main>
        <Footer />
      </div>
    );
  }
  if (filteredReservations.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 text-center text-black">
          <p>No tienes reservaciones en esta categoría.</p>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">Mis Reservaciones</h1>
<div className="mb-4">
  <button 
    onClick={() => setActiveTab('pendientes')} 
    className={`px-4 py-2 ${activeTab === 'pendientes' ? 'bg-[#BE8931] text-[#272626]' : 'bg-[#F2EBD4]'}`}
  >
    Pendientes
  </button>
  <button 
    onClick={() => setActiveTab('reservados')} 
    className={`ml-2 px-4 py-2 ${activeTab === 'reservados' ? 'bg-[#BE8931] text-[#272626]' : 'bg-[#F2EBD4]'}`}
  >
    Reservados
  </button>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {filteredReservations.map(reservation => (
    <div 
      key={reservation.id}
      className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
    >
      {/* Badge de estado */}
      <span className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-sm font-medium 
        ${reservation.status === 'confirmed' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-yellow-100 text-yellow-800'}`}>
        {reservation.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
      </span>

      <div className="space-y-4">
        {/* Tipo de habitación */}
        <h2 className="text-2xl font-bold text-gray-800">{reservation.roomType}</h2>
        
        {/* Detalles en grid */}
        <div className="grid grid-cols-2 gap-4 text-gray-600">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-[#BE8931]"/>
            <div>
              <p className="text-sm font-semibold">Check-in</p>
              <p className="text-gray-900">{new Date(reservation.checkIn).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-[#BE8931]"/>
            <div>
              <p className="text-sm font-semibold">Check-out</p>
              <p className="text-gray-900">{new Date(reservation.checkOut).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <UserGroupIcon className="h-5 w-5 text-[#BE8931]"/>
            <div>
              <p className="text-sm font-semibold">Huéspedes</p>
              <p className="text-gray-900">{reservation.guests}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <CurrencyDollarIcon className="h-5 w-5 text-[#BE8931]"/>
            <div>
              <p className="text-sm font-semibold">Total</p>
              <p className="text-gray-900">${reservation.totalPrice.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Acciones */}
        {reservation.status === 'pending' && (
          <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
            <button 
              onClick={() => cancelReservation(reservation.id)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg 
                      transition-colors duration-200 flex items-center"
            >
              <XCircleIcon className="w-5 h-5 mr-2"/>
              Cancelar reservación
            </button>
          </div>
        )}
      </div>
    </div>
  ))}
</div>
      </main>
      <Footer />
    </div>
  )
}

 
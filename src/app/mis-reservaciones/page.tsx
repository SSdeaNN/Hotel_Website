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
import router from 'next/router';

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
  const [activeTab, setActiveTab] = useState<'pendientes' | 'confirmadas'>('pendientes');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserReservation = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        
        if (!userToken) {
          setError('Debes iniciar sesión para ver reservaciones');
          setLoading(false);
          return;
        }

        const decodedToken = jwtDecode<JwtPayload>(userToken);
        if (Date.now() >= decodedToken.exp * 1000) {
          setError('Tu sesión ha expirado');
          localStorage.removeItem('userToken');
          setLoading(false);
          return;
        }

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
  }, []);
  const parseDateString = (dateString: string | number): string => {
    try {
      // Caso 1: Timestamp numérico
      if (typeof dateString === 'number') {
        return new Date(dateString).toLocaleDateString('es-MX');
      }
  
      // Caso 2: String ISO (ej: "2024-02-20T00:00:00Z")
      const isoDate = new Date(dateString);
      if (!isNaN(isoDate.getTime())) {
        return isoDate.toLocaleDateString('es-MX', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
  
      // Caso 3: String no ISO (ej: "20/02/2024" o "02-20-2024")
      const dateParts = dateString.split(/[/-]/);
      
      if (dateParts.length === 3) {
        const [day, month, year] = dateParts;
        return new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day)
        ).toLocaleDateString('es-MX');
      }
  
      // Caso 4: Formato desconocido
      return 'Formato inválido';
    } catch (error) {
      console.error('Error parsing date:', dateString);
      return 'Fecha inválida';
    }
  };

  const confirmarReservation = async (id: string) => {
    window.location.href = `/confirmar-reserva?reservationId=${id}`;
  };

  const filteredReservations = reservations.filter(res => 
    res.status === (activeTab === 'pendientes' ? 'pending' : 'confirmed')
  );

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
          <Link href="/login" className="text-[#BE8931] hover:underline mt-4 block">
            Volver a iniciar sesión
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Function to format date strings
  const parseDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mis Reservaciones</h1>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('pendientes')} 
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'pendientes' 
                ? 'bg-[#BE8931] text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Pendientes
          </button>
          <button 
            onClick={() => setActiveTab('confirmadas')} 
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'confirmadas' 
                ? 'bg-[#BE8931] text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Confirmadas
          </button>
        </div>

        {/* Contenido */}
        {filteredReservations.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500 text-lg">
              No tienes reservaciones {activeTab === 'pendientes' ? 'pendientes' : 'confirmadas'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReservations.map(reservation => (
              <div 
                key={reservation.id}
                className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <span className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-sm font-medium 
                  ${reservation.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'}`}>
                  {reservation.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                </span>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800">{reservation.roomType}</h2>
                  
                  <div className="grid grid-cols-2 gap-4 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5 text-[#BE8931]"/>
                      <div>
                        <p className="text-sm font-semibold">Check-in</p>
                        <p className="text-gray-900">{ parseDateString(reservation.checkIn)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5 text-[#BE8931]"/>
                      <div>
                        <p className="text-sm font-semibold">Check-out</p>
                        <p className="text-gray-900">{ parseDateString(reservation.checkOut)}</p>
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

                  {reservation.status === 'pending' && (
                    <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
                      <button 
                        onClick={() => confirmarReservation(reservation.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg 
                                transition-colors duration-200 flex items-center"
                      >
                        <XCircleIcon className="w-5 h-5 mr-2"/>
                        Confirmar reservación
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
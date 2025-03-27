'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from 'next/link';

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

export default function MisReservaciones() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [activeTab, setActiveTab] = useState<'pendientes' | 'reservados'>('pendientes');

  useEffect(() => {
    // Retrieve reservations from localStorage
    const storedReservations = localStorage.getItem('reservations');
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
    }
  }, []);

  const cancelReservation = (id: string) => {
    const updatedReservations = reservations.filter(res => res.id !== id);
    setReservations(updatedReservations);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
  };

  const filteredReservations = reservations.filter(res => 
    res.status === (activeTab === 'pendientes' ? 'pending' : 'confirmed')
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Mis Reservaciones</h1>
        
        {/* Tabs */}
        <div className="flex mb-6">
          <button 
            className={`px-4 py-2 mr-2 ${activeTab === 'pendientes' ? 'bg-[#BE8931] text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('pendientes')}
          >
            Pendientes
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'reservados' ? 'bg-[#BE8931] text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('reservados')}
          >
            Reservados
          </button>
        </div>

        {/* Reservations List */}
        {filteredReservations.length === 0 ? (
          <p className="text-center text-gray-500">No hay reservaciones {activeTab === 'pendientes' ? 'pendientes' : 'confirmadas'}.</p>
        ) : (
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <div key={reservation.id} className="bg-[#F2EBD4] rounded-lg p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{reservation.roomType}</h2>
                  <p className="text-gray-700">
                    {reservation.checkIn} - {reservation.checkOut} | 
                    {reservation.guests.adults} Adulto{reservation.guests.adults !== 1 ? 's' : ''} 
                    {reservation.guests.children > 0 ? ` | ${reservation.guests.children} Niño${reservation.guests.children !== 1 ? 's' : ''}` : ''}
                  </p>
                  <p className="text-[#BE8931] text-xl font-semibold">
                    ${reservation.totalPrice.toLocaleString()} MXN
                  </p>
                </div>
                <div className="flex space-x-2">
                  {activeTab === 'pendientes' && (
                    <>
                      <button 
                        onClick={() => cancelReservation(reservation.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Cancelar Reservación
                      </button>
                      <Link 
                        href={`/confirmar-reserva?reservationId=${reservation.id}`}
                        className="bg-[#BE8931] text-white px-4 py-2 rounded-md hover:bg-opacity-90"
                      >
                        Confirmar Reserva
                      </Link>
                    </>
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
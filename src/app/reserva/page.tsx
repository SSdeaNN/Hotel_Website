'use client';

import { FaWifi, FaTv } from 'react-icons/fa';
import { PiShowerLight } from 'react-icons/pi';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { Room } from '@/types/rooms.type';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es';

registerLocale('es', es);

interface ReservationForm {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
}

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

export default function Reserva() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  
  const [formData, setFormData] = useState<ReservationForm>({
    checkIn: null,
    checkOut: null,
    guests: 1,
  });

  useEffect(() => {
    const fetchRoomAndDates = async (roomId: string) => {
      try {
        // Obtener datos de la habitación
        const roomResponse = await fetch(`http://localhost:3000/rooms/${roomId}`);
        if (!roomResponse.ok) throw new Error('Error fetching room');
        const roomData = await roomResponse.json();
        setRoom(roomData);
        
        // Obtener fechas ocupadas
        const datesResponse = await fetch(`http://localhost:3000/reservations/room/${roomId}/reserved-days`);
        if (!datesResponse.ok) throw new Error('Error fetching booked dates');
        const datesData = await datesResponse.json();
        
        // Convertir strings a objetos Date y eliminar duplicados
        const uniqueDates = Array.from(new Set(datesData.bookedDates))
          .map(dateStr => new Date(dateStr as string));
        
        setDisabledDates(uniqueDates);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    const roomId = searchParams.get('room');
    if (roomId) fetchRoomAndDates(roomId);
    else {
      setError('ID de habitación no especificado');
      setLoading(false);
    }
  }, [searchParams]);

  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      Huespedes: value
    }));
  };

  const isDateDisabled = (date: Date) => {
    return disabledDates.some(disabledDate => 
      date.toDateString() === disabledDate.toDateString()
    );
  };

  const handleCheckInChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      checkIn: date,
      checkOut: null // Reset checkOut cuando cambia checkIn
    }));
  };

  const handleCheckOutChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      checkOut: date
    }));
  };

  const filterPassedTime = (time: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleReserva = () => {
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('userToken');
    
    if (!isLoggedIn) {
      router.push(`/usuario?redirect=${encodeURIComponent(window.location.href)}`);
      return;
    }

    if (!formData.checkIn || !formData.checkOut) {
      alert('Por favor, selecciona las fechas de tu reserva');
      return;
    }

    if (formData.checkOut <= formData.checkIn) {
      alert('La fecha de salida debe ser posterior a la fecha de entrada');
      return;
    }

    const nights = Math.ceil(
      (formData.checkOut.getTime() - formData.checkIn.getTime()) / (1000 * 3600 * 24)
    );

    const newReservation = {
      roomId: room?.id,
      checkInDate: formData.checkIn.toISOString().split('T')[0],
      checkOutDate: formData.checkOut.toISOString().split('T')[0],
      guests: formData.guests,
      totalPrice: room ? room.price * nights : 0,
      status: 'pending' as const
    };

    fetch(`http://localhost:3000/reservations/${room?.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      },
      body: JSON.stringify(newReservation)
    })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error en la reserva');
    })
    .then(data => {
      router.push(`/confirmar-reserva?reservationId=${data.id}`);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al procesar la reserva: ' + error.message);
    });
  };

  if (loading) return <div className="text-center py-8">Cargando habitación...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!room) return <div className="text-center py-8">Habitación no encontrada</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#f2e6d4]">
      <Navbar />
      
      <div className="container mx-auto px-4 mt-4">
        <div className="flex items-center space-x-2 text-black">
          <Link href="/" className="hover:underline font-medium">
            Inicio
          </Link>
          <span className="font-medium">&gt;&gt;</span>
          <Link href="/habitaciones" className="hover:underline font-medium">
            Habitaciones
          </Link>
          <span className="font-medium">&gt;&gt;</span>
          <span className="font-medium">Reservaciones</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-[#062214]">Reserva de {room.name}</h1>
        
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img 
                src={'http://localhost:3000/uploads/' + room.image} 
                alt={room.name} 
                className="w-full h-64 object-cover rounded-lg mb-4" 
              />
              <h2 className="text-2xl font-bold mb-2 text-[#062214]">{room.name}</h2>
              <p className="text-[#be8931] text-xl font-semibold mb-4">
                ${room.price.toLocaleString()} MXN / noche
              </p>
              <ul className="mb-4 text-[#062214]">
                {room.amenities.split(',').map((amenity, idx) => (
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
                    {getAmenityIcon(amenity)}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#062214]">Detalles de la Reserva</h3>
              
              <div className="mb-4">
                <label className="block mb-2 text-[#062214]">Check-in</label>
                <DatePicker
                  selected={formData.checkIn}
                  onChange={handleCheckInChange}
                  minDate={new Date()}
                  filterDate={(date) => !isDateDisabled(date)}
                  selectsStart
                  startDate={formData.checkIn}
                  endDate={formData.checkOut}
                  locale="es"
                  dateFormat="dd/MM/yyyy"
                  className="w-full p-2 border rounded-md border-[#dda456] focus:border-[#be8931] text-black"
                  placeholderText="Selecciona fecha de entrada"
                  isClearable
                  withPortal
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-[#062214]">Check-out</label>
                <DatePicker
                  selected={formData.checkOut}
                  onChange={handleCheckOutChange}
                  minDate={formData.checkIn ? new Date(formData.checkIn.getTime() + 86400000) : new Date()}
                  filterDate={(date) => !isDateDisabled(date)}
                  selectsEnd
                  startDate={formData.checkIn}
                  endDate={formData.checkOut}
                  disabled={!formData.checkIn}
                  locale="es"
                  dateFormat="dd/MM/yyyy"
                  className="w-full p-2 border rounded-md border-[#dda456] focus:border-[#be8931] text-black disabled:opacity-50"
                  placeholderText="Selecciona fecha de salida"
                  isClearable
                  withPortal
                />
              </div>
              
              <div className="mb-4">
              <label className="block mb-2 text-[#062214]">Huéspedes</label>
              <input 
                type="number" 
                name="Huespedes"
                min="1"
                max={room.guests || 5}
                value={formData.guests}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (value >= 1 && value <= (room.guests || 5)) {
                    setFormData((prev) => ({
                      ...prev,
                      guests: value,
                    }));
                  }
                }}
                className="w-full p-2 border rounded-md border-[#dda456] focus:border-[#be8931] text-black"
              />
              <p className="text-sm text-gray-500 mt-1">Máximo: {room.guests || 5} huéspedes</p>
            </div>

              {formData.checkIn && formData.checkOut && (
                <div className="mb-4 p-3 bg-gray-100 rounded-md">
                  <p className="font-semibold text-black">Detalles de la reserva:</p>
                  <p className='text-black'>Noches: {Math.ceil(
                    (formData.checkOut.getTime() - formData.checkIn.getTime()) / 
                    (1000 * 3600 * 24)
                  )}</p>
                  <p className='text-black'>Total: ${(
                    room.price * 
                    Math.ceil(
                      (formData.checkOut.getTime() - formData.checkIn.getTime()) / 
                      (1000 * 3600 * 24)
                    )
                  ).toLocaleString()} MXN</p>
                </div>
              )}

              <button 
                onClick={handleReserva}
                disabled={!formData.checkIn || !formData.checkOut}
                className="w-full bg-[#be8931] text-white py-3 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
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
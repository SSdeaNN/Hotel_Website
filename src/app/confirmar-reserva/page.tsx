'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from 'next/link';

interface Reservation {
  id: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed';
  email?: string;
  verificationCode: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
  room : {
    name: string;
    type: string;
    price: number;
  }
}

export default function ConfirmarReserva() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    confirmationCode: ''
  });

  useEffect(() => {
    const fetchReservation = async () => {
      const reservationId = searchParams.get('reservationId');

      if (reservationId) {
        try {
          const response = await fetch(`http://localhost:3000/reservations/${reservationId}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            },
          });
          if (!response.ok) throw new Error('Error fetching reservation');
          const data: Reservation = await response.json();
          setReservation(data);
          formData.fullName =data.user.name;
          formData.email = data.user.email;
          formData.phone = data.user.phone;
        } catch (error) {
          console.error('Failed to fetch reservation:', error);
        }
      }
    };

    fetchReservation();
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfirmReservation = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Por favor, complete todos los campos');
      return;
    }

    if (formData.confirmationCode !== reservation?.verificationCode) {
      alert('Código de confirmación incorrecto');
      return;
    }

    if (reservation) {
      const storedReservations = localStorage.getItem('reservations');
      
      if (storedReservations) {
        const parsedReservations: Reservation[] = JSON.parse(storedReservations);
        
        const updatedReservations = parsedReservations.map(res => 
          res.id === reservation.id 
            ? { 
                ...res, 
                status: 'confirmed',
                email: formData.email 
              } 
            : res
        );
        
        localStorage.setItem('reservations', JSON.stringify(updatedReservations));
        
        router.push('/mis-reservaciones');
      }
    }
  };

  if (!reservation) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f2e6d4]">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <p className="text-center text-[#062214]">Reservación no encontrada.</p>
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
        
        
        <span className="text-black font-medium">Confirmar reserva</span>
      </div>
    </div>

      <main className="container mx-auto px-4 py-12 max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#062214]">Confirmar reserva</h1>
        
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="mb-4">
            <label className="block mb-2 text-[#062214]">Nombre completo</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md border-[#dda456] focus:border-[#be8931] text-black"
              placeholder="Ingrese su nombre completo"
            />
          </div>
          
          <div className="mb-4">
  <label className="block mb-2 text-[#062214]">Correo electrónico</label>
  <input 
    type="email" 
    name="email"
    value={formData.email}
    onChange={handleInputChange}
    className="w-full p-2 border rounded-md border-[#dda456] focus:border-[#be8931] text-black"
    placeholder="Ingrese su correo electrónico"
    required // Hace que el campo sea obligatorio
    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" // Valida el formato del correo electrónico
    title="Ingrese un correo electrónico válido (ejemplo@dominio.com)"
  />
  <p className="text-sm text-[#062214] mt-1">(Se ha enviado un correo de confirmacion con el codigo de confirmacion)</p>
</div>

<div className="mb-4">
  <label className="block mb-2 text-[#062214]">Teléfono</label>
  <input 
    type="tel" 
    name="phone"
    value={formData.phone}
    onChange={(e) => {
      const value = e.target.value;
      // Permitir solo números y limitar a 10 dígitos
      if (/^\d{0,10}$/.test(value)) {
        handleInputChange(e);
      }
    }}
    className="w-full p-2 border rounded-md border-[#dda456] focus:border-[#be8931] text-black"
    placeholder="Ingrese su teléfono"
    required // Hace que el campo sea obligatorio
    pattern="[0-9]{10}" // Valida que el teléfono tenga exactamente 10 dígitos
    title="Ingrese un número de teléfono válido de 10 dígitos"
  />
</div>
          
          <div className="mb-6">
            <label className="block mb-2 text-[#062214]">Código de confirmación</label>
            <input 
              type="text" 
              name="confirmationCode"
              value={formData.confirmationCode}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md border-[#dda456] focus:border-[#be8931] text-black"
              placeholder="Ingrese código"
            />
          </div>
          
          <h2 className="text-2xl font-bold mb-4 text-center text-[#062214]">Resumen de la reserva</h2>
          <div className="bg-[#dda456] bg-opacity-20 p-4 rounded-md mb-6">
            <p className="text-[#062214]">
              <span className="font-semibold">Habitación:</span> {reservation.roomType}
            </p>
            <p className="text-[#062214]">
              <span className="font-semibold">Fechas:</span> {reservation.checkIn} - {reservation.checkOut}
            </p>
            <p className="text-[#062214]">
              <span className="font-semibold">Huéspedes:</span> {reservation.guests } 
            </p>
            <p className=" text-xl font-semibold text-black">
              Total: ${reservation.totalPrice.toLocaleString()} MXN
            </p>
          </div>
          
          <button 
            onClick={handleConfirmReservation}
            className="w-full bg-[#be8931] text-white py-3 rounded-md hover:bg-opacity-90"
          >
            Agregar reserva
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
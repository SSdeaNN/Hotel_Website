import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaWifi, FaTv } from "react-icons/fa";
import { PiShowerLight } from "react-icons/pi";

export default function Rooms() {
  const roomTypes = [
    {
      id: 'estandar',
      name: 'Habitación Estándar',
      price: 190000,
      image: '/image.jpg',
      amenities: [
        <FaWifi className="text-black mr-2" /> ,
        <FaTv className="text-black mr-2" />,
        <PiShowerLight className="text-black mr-2" />,
      ]
    },
    {
      id: 'vista-mar',
      name: 'Habitación Vista al Mar',
      price: 250000,
      image: '/image.jpg',
      amenities: [
        <FaWifi className="text-black mr-2" /> ,
        <FaTv className="text-black mr-2" />,
        <PiShowerLight className="text-black mr-2" />,
      ]
    },
    {
      id: 'cocina',
      name: 'Habitación con Cocina',
      price: 280000,
      image: '/image.jpg',
      amenities: [
        <FaWifi className="text-black mr-2" /> ,
        <FaTv className="text-black mr-2" />,
        <PiShowerLight className="text-black mr-2" />,
      ]
    },
    {
      id: 'balcon',
      name: 'Habitación con Balcón',
      price: 230000,
      image: '/image.jpg',
      amenities: [
        <FaWifi className="text-black mr-2" /> ,
        <FaTv className="text-black mr-2" />,
        <PiShowerLight className="text-black mr-2" />,
      ]
    },
    {
      id: 'ejecutiva',
      name: 'Habitación Ejecutiva',
      price: 300000,
      image: '/image.jpg',
      amenities: [
        <FaWifi className="text-black mr-2" /> ,
        <FaTv className="text-black mr-2" />,
        <PiShowerLight className="text-black mr-2" />,
      ]
    },
    {
      id: 'jacuzzi',
      name: 'Suite con Jacuzzi',
      price: 400000,
      image: '/image.jpg',
      amenities: [
        <FaWifi className="text-black mr-2" /> ,
        <FaTv className="text-black mr-2" />,
        <PiShowerLight className="text-black mr-2" />,
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        <section className="relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
            <h1 className="text-4xl font-bold mb-4">Habitaciones y Suites</h1>
            <p className="text-xl max-w-2xl">
              Experimente el lujo y la comodidad en nuestras exclusivas habitaciones
            </p>
          </div>
          <img 
            src="/hotel22.png" 
            alt="Habitaciones y Suites" 
            className="w-full h-[500px] object-cover rounded-b-lg shadow-lg" 
          />
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {roomTypes.map((room) => (
              <div 
                key={room.id} 
                className="bg-[#F2EBD4] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
              >
                <div className="h-64 w-full">
                  <img
                    src={room.image}
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
                    {room.amenities.map((amenity, idx) => (
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
                        {amenity}
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
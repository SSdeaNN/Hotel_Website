import { FaMapMarkerAlt, FaCalendarCheck, FaCalendar,FaWifi, FaUtensils,FaDumbbell , FaSwimmer, FaTshirt, FaParking   } from 'react-icons/fa';
import { RiHotelFill } from 'react-icons/ri';
import { IoPersonSharp } from "react-icons/io5";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-grow">
        <section className="flex flex-col md:flex-row items-center justify-between p-8 bg-white">
          <div className="md:w- p-42">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Hotel para cada momento lleno de emociones
            </h1>
            <p className="mt-1 text-gray-700">
              Cada momento se siente como la primera vez en una vista paradisíaca.
            </p>
            <div className="mt-2 flex space-x-2">
              <button className="bg-[#BE8931] text-black px-2 py-2 rounded-md">
                Reserva ahora
              </button>
              <button className="bg-black text-white px-4 py-3 rounded-md">
                Hacer un recorrido
              </button>
            </div>
          </div>

          <div className="md:w-1/2 p-2 w-150 h-150">
            <img
              src="LOL_nose.jpeg"
              alt="Vista al Paraíso"
              className="w-150 h-150 rounded-lg"
            />
          </div>
        </section>

        <section className="bg-[#F2EBD4] p-8 text-black mx-auto max-w-7xl rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt />
              <span>Ubicación: Abuja</span>
            </div>
            <div className="flex items-center space-x-2">
              <RiHotelFill />
              <span className="material-icons"></span>
              <span>Tipo de habitación: Standard</span>
            </div>
            <div className="flex items-center space-x-2">
              <IoPersonSharp />
              <span className="material-icons"></span>
              <span>Persona: 01</span>
            </div>
            <div className="flex items-center space-x-2">
               <FaCalendar/> 
              <span className="material-icons"></span>
              <span>Registrarse: 09 mar 2023</span>
            </div>
            <div className="flex items-center space-x-2">
            <FaCalendarCheck  />
              <span className="material-icons"></span>
              <span>Verificar: 13 mar 2023</span>
            </div>
            <button className="bg-[#BE8931] text-black px-4 py-3 rounded-md">
              Reserva ahora
            </button>
          </div>
        </section>

        <section className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Nuestras Instalaciones
          </h2>
          <p className="mt-4 text-gray-700 text-center">
            Ofrecemos modernas instalaciones de hotel (5 estrellas) para su comodidad.
          </p>
        </section>

        <section className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center max-w-4xl mx-auto">
          {[
            { icon: <FaWifi />, text: "Wifi" },
            { icon: <FaUtensils />, text: "Breakfast" },
            { icon: <FaDumbbell />, text: "Gym" },
            { icon: <FaSwimmer />, text: "Swimming Pool" },
            { icon: <FaTshirt />, text: "Laundry" },
            { icon: <FaParking />, text: "Parking space" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-[#F2EBD4] p-4 w-60 h-60 rounded-lg"
            >
              <div className="text-4xl text-[#BE8931]">{item.icon}</div>
              <span className="mt-2 text-lg font-semibold text-[#BE8931]">{item.text}</span>
            </div>
          ))}
        </section>

        <section className="relative p-8">
  <div className="absolute inset-0 flex flex-col items-center justify-start text-center text-white z-10 mt-16">
    <h2 className="text-3xl font-bold text-[#F2EBD4]">Cuartos Royal's</h2>
    <p className="mt-2 text-[#F2EBD4]">All rooms are designed for your comfort</p>
  </div>
  <img 
    src="image.jpg" 
    alt="Royal's Hotel" 
    className="w-full h-auto rounded-lg" 
  />
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
    <div className="flex space-x-4 mt-4 flex-wrap justify-center">
      <div className="bg-[#F2EBD4] text-black p-4 rounded-lg w-full sm:w-1/3 md:w-1/4">
        <img src="cuartos.jpeg" alt="Royal's Hotel Room 1" className="w-full h-auto rounded-lg" />
        <p className="mt-2">Television set, Extra sheets, and Breakfast</p>
      </div>
      <div className="bg-[#F2EBD4] text-black p-4 rounded-lg w-full sm:w-1/3 md:w-1/4">
        <img src="cuartos.jpeg" alt="Royal's Hotel Room 2" className="w-full h-auto rounded-lg" />
        <p className="mt-2">Television set, Extra sheets, Breakfast, and fireplace</p>
      </div>
      <div className="bg-[#F2EBD4] text-black p-4 rounded-lg w-full sm:w-1/3 md:w-1/4">
        <img src="cuartos.jpeg" alt="Royal's Hotel Room 3" className="w-full h-auto rounded-lg" />
        <p className="mt-2">Television set, Extra sheets, Breakfast, fireplace, Console, and bed rest</p>
      </div>
    </div>
  </div>
</section>


      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
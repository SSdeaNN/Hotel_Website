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
          <div className="md:w-1/2 p-8">
            <h1 className="text-4xl font-bold text-gray-900">
              Hotel para cada momento lleno de emociones
            </h1>
            <p className="mt-4 text-gray-700">
              Cada momento se siente como la primera vez en una vista paradisíaca.
            </p>
            <div className="mt-8 flex space-x-4">
              <button className="bg-[#BE8931] text-black px-4 py-3 rounded-md">
                Reserva ahora
              </button>
              <button className="bg-black text-white px-4 py-3 rounded-md">
                Hacer un recorrido
              </button>
            </div>
          </div>
          <div className="md:w-1/2 p-8">
            <img
              src="LOL_nose.jpeg"
              alt="Vista al Paraíso"
              className="w-150 h-150 rounded-lg"
            />
          </div>
        </section>

        <section className="bg-[#F2EBD4] p-8 text-black">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <span className="material-icons">location_on</span>
              <span>Ubicación: Abuja</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="material-icons">hotel</span>
              <span>Tipo de habitación: Standard</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="material-icons">person</span>
              <span>Persona: 01</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="material-icons">calendar_today</span>
              <span>Registrarse: 09 mar 2023</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="material-icons">calendar_today</span>
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
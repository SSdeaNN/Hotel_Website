import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Explorar() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-grow p-8">
        <div className="container mx-auto">
          <nav className="text-gray-700 mb-4">
            <Link href="/" className="hover:underline">Inicio</Link> &gt;&gt; <span>Explorar</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-2 leading-tight">
            Explora el lujo y el confort que mereces.
            <br />
            ¡Reserva ahora y vive la experiencia!
          </h1>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-2">
              <img
                src="OIP.jpeg"
                alt="Hotel Room"
                className="w-120 h-120 rounded-lg"
              />
            </div>
            <div className="md:w-1/2 p-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Royal Hotel</h2>
              <p className="text-gray-700 mb-4">
                El Royal Hotel se encuentra en el corazón de Barcelona, ofreciendo una experiencia de lujo única.
              </p>
              <p className="text-gray-700 mb-4">
                Con habitaciones elegantes y espaciosas, equipadas con las mejores comodidades, este hotel garantiza una estancia de confort absoluto.
              </p>
              <p className="text-gray-700 mb-4">
                Los huéspedes pueden disfrutar de un gimnasio de última generación y una selección de restaurantes gourmet, que ofrecen platos exquisitos en un ambiente sofisticado, ideal para aquellos que buscan relajarse y disfrutar del estilo de vida de la ciudad. El Royal Hotel combina modernidad y comodidad en un solo lugar.
              </p>
            </div>
          </div>
        </div>
        {/* Sección de imágenes */}
        <section className="mt-18 flex justify-center">
          <div className="mt-8">
            <div className="relative">
              <img
                src="Restar.jpg"
                alt="Restaurante"
                className="w-390 h-190 rounded-lg"
              />
              <div className="drop-shadow-lg border-b-8 border-[#BE8931] absolute bottom-[-60px] left-0 right-0 bg-white bg-opacity-75 p-8 rounded-lg m-4">
                <h2 className="text-2xl font-bold text-[#BE8931] mb-2 text-center">Restaurante</h2>
                <p className="text-gray-700 text-justify">
                  The elegant luxury bedrooms in this gallery showcase custom interior designs & decorating ideas. View pictures and find your perfect luxury bedroom design. Luxurious bedrooms that will make you never want to leave your room again. See more ideas about luxurious bedrooms, bedroom design.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-18 flex justify-center">
          <div className="mt-8">
            <div className="relative">
              <img
                src="Restar.jpg"
                alt="Restaurante"
                className="w-390 h-190 rounded-lg"
              />
              <div className="drop-shadow-lg border-b-8 border-[#BE8931] absolute bottom-[-60px] left-0 right-0 bg-white bg-opacity-75 p-8 rounded-lg m-4">
                <h2 className="text-2xl font-bold text-[#BE8931] mb-2 text-center">Restaurante</h2>
                <p className="text-gray-700 text-justify">
                  The elegant luxury bedrooms in this gallery showcase custom interior designs & decorating ideas. View pictures and find your perfect luxury bedroom design. Luxurious bedrooms that will make you never want to leave your room again. See more ideas about luxurious bedrooms, bedroom design.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20 mt-18 flex justify-center">
          <div className="mt-8">
            <div className="relative">
              <img
                src="Restar.jpg"
                alt="Restaurante"
                className="w-390 h-190 rounded-lg"
              />
              <div className="drop-shadow-lg border-b-8 border-[#BE8931] absolute bottom-[-60px] left-0 right-0 bg-white bg-opacity-75 p-8 rounded-lg m-4">
                <h2 className="text-2xl font-bold text-[#BE8931] mb-2 text-center">Restaurante</h2>
                <p className="text-gray-700 text-justify">
                  The elegant luxury bedrooms in this gallery showcase custom interior designs & decorating ideas. View pictures and find your perfect luxury bedroom design. Luxurious bedrooms that will make you never want to leave your room again. See more ideas about luxurious bedrooms, bedroom design.
                </p>
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
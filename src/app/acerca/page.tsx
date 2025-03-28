import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Acerca() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <main className="">
  <div className="w-full">
    {/* Imagen con texto */}
    <section className="relative mb-2">
      {/* Navegación en la esquina superior izquierda */}
      <nav className="absolute top-4 left-4 text-white ">
        <Link href="/" className="hover:underline">Inicio</Link> &gt;&gt; <span>Acerca de Nosotros</span>
      </nav>

      <img 
        src="image.jpg" 
        alt="Royal's Hotel" 
        className="w-full h-170 object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-3xl font-bold">Bienvenido al Royal Hotel</h1>
        <p className="mt-2 text-lg">Un lugar de lujo y confort en el corazón de Barcelona</p>
      </div>
    </section>
    {/* Contexto del hotel */}
    <div className="container mx-auto flex flex-col md:flex-row items-center">
  <div className="md:w-1/3 p-4">
    <img 
      src="Gabbie-Carter-Bio.jpg"
      alt="About Us"
      className="w-full h-auto rounded-lg drop-shadow-lg"
    />
    <p className="text-center text-gray-900 font-bold mt-2">
      Gabrielle Carter (Manager)
    </p>
  </div>
  <div className="md:w-2/3 p-4">
    <p className="text-gray-700 mb-4">
      En el Royal Hotel, nos enorgullece ofrecer una experiencia de lujo y confort a nuestros huéspedes. Ubicados en el corazón de Barcelona, nuestro hotel combina modernidad y comodidad en un solo lugar.
    </p>
    <p className="text-gray-700 mb-4">
      Nuestro equipo está dedicado a proporcionar un servicio excepcional y a garantizar que cada estancia sea inolvidable. Con habitaciones elegantes y espaciosas, equipadas con las mejores comodidades, el Royal Hotel es el lugar perfecto para relajarse y disfrutar del estilo de vida de la ciudad.
    </p>
    <p className="text-gray-700 mb-4">
      Los huéspedes pueden disfrutar de un gimnasio de última generación, una selección de restaurantes gourmet y una variedad de servicios diseñados para satisfacer todas sus necesidades. En el Royal Hotel, su comodidad y satisfacción son nuestra prioridad.
    </p>
  </div>
</div>
  </div>
</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
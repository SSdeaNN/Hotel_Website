import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { RiHotelFill } from 'react-icons/ri';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto mt-4">  
          <nav className="text-gray-700 mb-4">
            <Link href="/" className="hover:underline">Inicio</Link> &gt;&gt; <span>Contacto</span>
          </nav>
          {/* imagen con texto */}
          <section className="relative bg-cover bg-center flex-grow flex justify-center mb-10">
            <img 
              src="pep.png" 
              alt="Royal's Hotel" 
              className="w-365 h-auto rounded-lg drop-shadow-lg" 
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#F2EBD4]">
              <h1 className="text-3xl font-bold">Contacta con nosotros</h1>
              <p className="mt-2 text-lg">Un lugar de lujo y confort en el corazón de Barcelona</p>
            </div>
          </section>
          </div>

          {/* Redes sociales */}
          <section className="text-center  text-black mt-25 mb-25">
            <h2 className="text-2xl font-bold mb-4">Redes sociales</h2>
            <div className="flex justify-center space-x-8">
              <div>
                <FaFacebook size={32} />
                <p>Facebook</p>
              </div>
              <div>
                <FaTwitter size={32} />
                <p>Twitter</p>
              </div>
              <div>
                <FaInstagram size={32} />
                <p>Instagram</p>
              </div>
            </div>
            <div className="mt-4">
              <p>Correo</p>
              <p>RoyalHotel@gmail.com</p>
            </div>
          </section>
          

          <section className="text-center mt-8">
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0000000000005!2d-87.466667!3d20.211111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4e4f1f1f1f1f1f%3A0x0!2sTulum%2C%20Quintana%20Roo%2C%20Mexico!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus" 
    width="100%" 
    height="300" 
    style={{border:0}} 
    allowFullScreen 
    loading="lazy"
    className="rounded-lg"
  ></iframe>
</section>
        
      </main>

      <Footer />
    </div>
  );
}
"use client";

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    // Extraer datos del usuario desde localStorage
    const name = localStorage.getItem("userName");
    const image = localStorage.getItem("userImage");
    setUserName(name);
    setUserImage(image);
  }, []);

  return (
    <nav className="bg-[#0B221D] text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold flex items-center">
          <img src="/Logo.png" alt="Logo" className="h-18 w-auto" />
        </Link>

        {/* Enlaces */}
        <ul className="flex space-x-6 flex-1 justify-center">
          <li>
            <Link href="/" className="hover:font-bold hover:text-[#BE8931]">
              Home
            </Link>
          </li>
          <li>
            <Link href="/explorar" className="hover:font-bold hover:text-[#BE8931]">
              Explorar
            </Link>
          </li>
          <li>
            <Link href="/habitaciones" className="hover:font-bold hover:text-[#BE8931]">
              Habitaciones
            </Link>
          </li>
          <li>
            <Link href="/acerca" className="hover:font-bold hover:text-[#BE8931]">
              Acerca de
            </Link>
          </li>
          <li>
            <Link href="/contacto" className="hover:font-bold hover:text-[#BE8931]">
              Contacto
            </Link>
          </li>
        </ul>

        {/* Usuario */}
        <div className="flex items-center space-x-6">
          <Link href="/mis-reservaciones">
            <button className="bg-[#BE8931] text-black px-4 py-3 rounded-md shadow-2xs active:scale-95 transition-transform transition-colors">
              Mis Reservaciones
            </button>
          </Link>

          {userName && userImage ? (
            <div className="flex items-center space-x-2">
              <img
                src={userImage}
                alt="Perfil"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-white font-medium">{userName}</span>
            </div>
          ) : (
            <Link href="/usuario">
              <button className="shadow-lg bg-[#BE8931] text-black px-4 py-3 rounded-md active:scale-95 transition-transform transition-colors">
                <FaUser />
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
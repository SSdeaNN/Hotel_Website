import React from 'react';
import Link from 'next/link';


export default function UsuarioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      <main className="flex-grow container mx-auto mt-4">
        <h1 className="text-3xl font-bold text-center bg-b text-black mt-40">Iniciar Sesión</h1>
        <form className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BE8931] focus:border-[#BE8931]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BE8931] focus:border-[#BE8931]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#BE8931] text-black px-4 py-2 rounded-md"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="text-center mt-4">
          <Link href="/" className="text-[#BE8931] hover:underline">
            Regresar
          </Link>
        </div>
      </main>
   
    </div>
  );
}
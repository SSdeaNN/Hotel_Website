'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UsuarioPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <div className="flex flex-col min-h-screen bg-white bg-[url('/image.jpg')] bg-cover bg-center">
      <main className="flex-grow container mx-auto mt-4">
        <h1 className="text-3xl font-bold text-center bg-b text-black mt-40">
          {isRegistering ? 'Registrar Usuario' : 'Iniciar Sesión'}
        </h1>
        

        <form
          onSubmit={isRegistering ? undefined : handleLogin}
          className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-md bg-[#F2EBD4] bold"
        >
          {isRegistering && (
            <>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Nombres
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BE8931] focus:border-[#BE8931] text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BE8931] focus:border-[#BE8931] text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Edad
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BE8931] focus:border-[#BE8931] text-black"
                  required
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BE8931] focus:border-[#BE8931] text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BE8931] focus:border-[#BE8931] text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#BE8931] text-black px-4 py-2 rounded-md shadow-md hover:bg-opacity-90 transition-colors"
          >
            {isRegistering ? 'Registrar' : 'Iniciar Sesión'}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-[#000000] hover:underline bold"
          >
            {isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate '}
          </button>
        </div>
        <div className="text-center mt-4">
          <Link href="/" className="text-[#000000] hover:underline bold">
            Regresar
          </Link>
        </div>
      </main>
    </div>
  );
}
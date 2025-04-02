'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UsuarioPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setname] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      if (isRegistering) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('password', password);
        if (image) {
          formData.append('imageUrl', image);
        }
  
        const response = await fetch('http://localhost:3000/users/', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Error en el registro');
        }
  
        // Guardar datos en localStorage
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userImage', data.imageUrl || '');
      } else {
        const response = await fetch('http://localhost:3000/auth/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Error en el login');
        }
  
        // Guardar datos en localStorage
        localStorage.setItem('userToken', data.access_token);
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userImage', data.imageUrl || '');
      }
  
      const redirect = new URLSearchParams(window.location.search).get('redirect');
      router.push(redirect || '/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white bg-[url('/image.jpg')] bg-cover bg-center">
      <main className="flex-grow container mx-auto mt-4">
        <h1 className="text-3xl font-bold text-center bg-b text-black mt-40">
          {isRegistering ? 'Registrar Usuario' : 'Iniciar Sesión'}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-md bg-[#F2EBD4] bold"
          encType={isRegistering ? "multipart/form-data" : undefined}
        >
          {isRegistering && (
            <>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombres
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BE8931] focus:border-[#BE8931] text-black"
                  required
                />
              </div>

              <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;
                  // Permitir solo números y limitar a 10 caracteres
                  if (/^\d{0,10}$/.test(value)) {
                    setPhone(value);
                  }
                }}
                pattern="\d{10}" // Validación para exactamente 10 dígitos
                title="El número de teléfono debe tener exactamente 10 dígitos"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BE8931] focus:border-[#BE8931] text-black"
                required
              />
            </div>

              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Imagen de perfil
                </label>
                <input
                  type="file"
                  id="image"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#BE8931] file:text-black
                    hover:file:bg-opacity-90 "
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="h-20 w-20 object-cover rounded-full"
                    />
                  </div>
                )}
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
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Validación para correos electrónicos
              title="Por favor, introduce un correo electrónico válido"
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
              minLength={6}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BE8931] focus:border-[#BE8931] text-black"
              required
            />
          </div>
          
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#BE8931] text-black px-4 py-2 rounded-md shadow-md hover:bg-opacity-90 active:scale-95 transition-transform transition-colors disabled:opacity-50 "
          >
            {loading ? 'Procesando...' : isRegistering ? 'Registrar' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
              setImage(null);
              setImagePreview(null);
            }}
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
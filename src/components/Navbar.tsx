import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#0B221D] text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold flex items-center">
          <img
            src="/Logo.png"
            alt="Logo"
            className="h-18 w-auto"
            />
        </Link>

        {/* Enlaces */}
        <ul className="flex space-x-6 flex-1 justify-center">
          <li>
            <Link href="/about" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/services" className="hover:underline">
              Explorar
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Habitaciones
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Acerca de
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contacto
            </Link>
          </li>
          
        </ul>
        <div>
            <button className="bg-[#BE8931] text-black px-4 py-3 rounded-md"
               >
               Mis Reservaciones 
            </button>
          </div>
      </div>
    </nav>
  );
}

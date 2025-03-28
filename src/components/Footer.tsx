export default function Footer() {
  return (
    <footer className="bg-[#0B221D] text-white p-16 mt-auto shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3><strong>Hotel Royal</strong></h3>
          <p>Hotel Royal es un hotel de lujo ubicado en el corazón de la ciudad. Ofrecemos una amplia gama de servicios y comodidades para que su estancia sea lo más cómoda posible.</p>
        </div>

        <div>
          <h3><strong>Navegación Rápida</strong></h3>
          <ul className="flex flex-col space-y-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Explorar
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Habitaciones
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Acerca de
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3><strong>Acerca de</strong></h3>
          <ul className="flex flex-col space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Política de privacidad
              </a>
            </li>
            <li>
              Política de reembolso
            </li>
            <li>
              F.A.Q
            </li>
            <li>
              Acerca
            </li>
          </ul>
        </div>

        <div>
          <h3><strong>Redes sociales</strong></h3>
          <ul className="flex flex-col space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2 mt-8">
        <a href="#" className="hover:underline">
          Términos y condiciones
        </a>
        <span className="mx-2">|</span>
        <a href="#" className="hover:underline">
          Política de privacidad
        </a>
        <span className="mx-2">|</span>
      </div>

      <p className="flex items-center justify-center space-x-2 mt-8">
        {new Date().getFullYear()} Copyright © 2025 Hotel Royal.
      </p>
    </footer>
  );
}
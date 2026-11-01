import { Link } from "react-router-dom"
import Ultimo from "../assets/Despedida/footers.jpg"
import { Boton } from "../components/Boton"

const ENLACES = [
  { texto: "Inicio", to: "/#inicio" },
  { texto: "Nosotros", to: "/#nosotros" },
  { texto: "Platos", to: "/#platos" },
  { texto: "Horarios", to: "/#horarios" },
]

export const Mainfooter = () => {
  return (
    <footer id="contacto" className="scroll-mt-28">
      <div className="relative">
        <img src={Ultimo} alt="" className="w-full h-96 object-cover" />

        <div className="absolute inset-0 bg-cafe/65 flex flex-col items-center justify-center text-center px-6 text-white">
          <h2 className="font-heading text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
            Reserva tu mesa y prueba nuestra sazón
          </h2>
          <p className="mt-4 max-w-xl text-lg">Llámanos y te atendemos con gusto.</p>
          <Boton href="tel:+51987654321" className="mt-8">
            Llamar para reservar
          </Boton>
        </div>
      </div>

      <div className="bg-cafe text-durazno-suave">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-heading text-2xl font-bold text-white mb-3">MyRestaurant</p>
            <p className="max-w-xs">
              Gastronomía criolla preparada con recetas tradicionales e insumos frescos.
            </p>
          </div>

          <div>
            <p className="font-heading text-lg font-semibold text-white mb-3">Enlaces</p>
            <ul className="flex flex-col gap-2">
              {ENLACES.map(({ texto, to }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-durazno transition-colors">
                    {texto}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-lg font-semibold text-white mb-3">Contacto</p>
            <p>Dirección: Av. Principal 123, Lima, Perú</p>
            <p>Teléfono: +51 987 654 321</p>
            <p>Email: contacto@myrestaurant.com</p>
          </div>
        </div>

        <div className="border-t border-white/15">
          <p className="max-w-7xl mx-auto px-6 py-5 text-sm text-center">
            © 2026 MyRestaurant. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Boton } from "../components/Boton"
import { useAuth } from "../hooks/useAuth"

const ENLACES = [
  { texto: "Inicio", to: "/#inicio" },
  { texto: "Nosotros", to: "/#nosotros" },
  { texto: "Platos", to: "/#platos" },
  { texto: "Horarios", to: "/#horarios" },
]

export const Mainheader = () => {
  const [abierto, setAbierto] = useState(false)
  const { usuario, salir } = useAuth()
  const navigate = useNavigate()

 
  const enlaces = usuario ? [...ENLACES, { texto: "Mis platos", to: "/admin" }] : ENLACES

  const cerrarSesion = () => {
    salir()
    setAbierto(false)
    navigate("/")
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-cafe text-durazno-suave text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex flex-wrap justify-between gap-x-6 gap-y-1">
          <p className="mb-0">Av. Principal 123, Lima, Perú</p>
          <p className="mb-0">Abierto todos los días desde las 12:00</p>
        </div>
      </div>

      <nav className="bg-white border-b border-durazno-suave" aria-label="Principal">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <Link to="/#inicio" className="font-heading text-2xl font-bold text-cafe">
            MyRestaurant
          </Link>

          <ul className="hidden md:flex items-center gap-6 font-medium">
            {enlaces.map(({ texto, to }) => (
              <li key={to}>
                <Link to={to} className="hover:text-durazno-fuerte transition-colors">
                  {texto}
                </Link>
              </li>
            ))}
            {usuario ? (
              <li>
                <button
                  type="button"
                  onClick={cerrarSesion}
                  className="rounded-full border border-cafe/30 px-4 py-1.5 hover:bg-durazno-suave"
                >
                  Cerrar sesión
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-durazno-fuerte transition-colors">
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Boton href="/registro" compacto>
                    Crear cuenta
                  </Boton>
                </li>
              </>
            )}
          </ul>

          <button
            type="button"
            className="md:hidden rounded-full border border-cafe/30 px-4 py-2 font-medium"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            onClick={() => setAbierto(!abierto)}
          >
            {abierto ? "Cerrar" : "Menú"}
          </button>
        </div>

        {abierto && (
          <ul id="menu-movil" className="md:hidden px-6 pb-5 flex flex-col gap-4 font-medium">
            {enlaces.map(({ texto, to }) => (
              <li key={to}>
                <Link to={to} onClick={() => setAbierto(false)} className="block py-1">
                  {texto}
                </Link>
              </li>
            ))}
            {usuario ? (
              <li>
                <button
                  type="button"
                  onClick={cerrarSesion}
                  className="rounded-full border border-cafe/30 px-4 py-1.5"
                >
                  Cerrar sesión
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setAbierto(false)} className="block py-1">
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Boton href="/registro" compacto>
                    Crear cuenta
                  </Boton>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </header>
  )
}

import { useState } from "react"
import { Mensaje } from "../components/Mensaje"
import { TarjetaPlato } from "../components/TarjetaPlato"
import { usePlatos } from "../hooks/usePlatos"
import { CATEGORIAS } from "../types/plato"

const FILTROS = ["Todos", ...CATEGORIAS]

export const Platos = () => {
  const { platos, cargando, error } = usePlatos()
  const [categoria, setCategoria] = useState("Todos")

  const visibles =
    categoria === "Todos" ? platos : platos.filter((plato) => plato.categoria === categoria)

  return (
    <section id="platos" className="scroll-mt-28 bg-durazno-suave/50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-3">
          Los platos más consumidos
        </h2>
        <p className="text-arcilla text-center max-w-xl mx-auto mb-10">
          Elige una categoría y mira lo que prepara nuestra cocina.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTROS.map((nombre) => (
            <button
              key={nombre}
              type="button"
              aria-pressed={categoria === nombre}
              onClick={() => setCategoria(nombre)}
              className={`rounded-full px-5 py-2 font-medium transition-colors ${
                categoria === nombre ? "bg-cafe text-white" : "bg-white text-cafe hover:bg-durazno"
              }`}
            >
              {nombre}
            </button>
          ))}
        </div>

        {cargando && <p className="text-center text-arcilla">Cargando platos...</p>}

        {error && (
          <div className="max-w-xl mx-auto">
            <Mensaje tipo="error">{error}</Mensaje>
          </div>
        )}

        {!cargando && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibles.map((plato) => (
              <TarjetaPlato key={plato.id} plato={plato} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
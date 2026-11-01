import type { Plato } from "../types/plato"

interface TarjetaPlatoProps {
  plato: Plato
}

export const TarjetaPlato = ({ plato }: TarjetaPlatoProps) => {
  return (
    <article className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col">
      <img src={plato.imagen} alt={plato.nombre} className="w-full h-56 object-cover" />
      <div className="p-6 flex flex-col grow">
        <p className="text-sm font-medium text-durazno-fuerte mb-1">{plato.categoria}</p>
        <h3 className="font-heading text-xl font-semibold mb-2">{plato.nombre}</h3>
        <p className="text-arcilla leading-relaxed grow">{plato.descripcion}</p>

        <div className="mt-5 flex items-center justify-between">
          <p className="mb-0 text-xl font-bold">S/ {plato.precio.toFixed(2)}</p>
          <p className="mb-0 rounded-full bg-durazno-suave px-3 py-1 text-sm font-medium">
            {plato.tiempo_preparacion} min
          </p>
        </div>
      </div>
    </article>
  )
}
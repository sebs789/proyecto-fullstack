import type { Plato } from "../types/plato"

interface TablaPlatosProps {
  platos: Plato[]
  onEditar: (plato: Plato) => void
  onEliminar: (plato: Plato) => void
}

export const TablaPlatos = ({ platos, onEditar, onEliminar }: TablaPlatosProps) => {
  if (platos.length === 0) {
    return (
      <p className="bg-white rounded-3xl p-8 text-center text-arcilla shadow-sm">
        Todavía no creaste ningún plato. Pulsa "Nuevo plato" para agregar el primero.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-durazno-suave/60 text-sm">
          <tr>
            <th className="px-4 py-3 font-semibold">Imagen</th>
            <th className="px-4 py-3 font-semibold">Nombre</th>
            <th className="px-4 py-3 font-semibold">Categoría</th>
            <th className="px-4 py-3 font-semibold">Precio</th>
            <th className="px-4 py-3 font-semibold">Tiempo</th>
            <th className="px-4 py-3 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {platos.map((plato) => (
            <tr key={plato.id} className="border-t border-durazno-suave">
              <td className="px-4 py-3">
                <img src={plato.imagen} alt="" className="h-12 w-16 rounded-lg object-cover" />
              </td>
              <td className="px-4 py-3 font-medium">{plato.nombre}</td>
              <td className="px-4 py-3">{plato.categoria}</td>
              <td className="px-4 py-3 whitespace-nowrap">S/ {plato.precio.toFixed(2)}</td>
              <td className="px-4 py-3 whitespace-nowrap">{plato.tiempo_preparacion} min</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEditar(plato)}
                    className="rounded-full border border-cafe/30 px-4 py-1.5 text-sm font-medium hover:bg-durazno-suave"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => onEliminar(plato)}
                    className="rounded-full border border-red-300 px-4 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
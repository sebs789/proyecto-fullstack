import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { clasesInput } from "../utils/clasesInput"
import { Campo } from "./Campo"
import { CATEGORIAS } from "../types/plato"
import type { Categoria, Plato, PlatoFormulario, PlatoInput } from "../types/plato"

interface FormularioPlatoProps {
  platoInicial: Plato | null 
  guardando: boolean
  onGuardar: (datos: PlatoInput) => void | Promise<void>
  onCancelar: () => void
}

type Errores = Partial<Record<keyof PlatoFormulario, string>>

const VACIO: PlatoFormulario = {
  nombre: "",
  categoria: "",
  descripcion: "",
  precio: "",
  tiempo_preparacion: "",
  imagen: "",
}

const desdePlato = (plato: Plato): PlatoFormulario => ({
  nombre: plato.nombre,
  categoria: plato.categoria,
  descripcion: plato.descripcion,
  precio: String(plato.precio),
  tiempo_preparacion: String(plato.tiempo_preparacion),
  imagen: plato.imagen,
})

const validar = (valores: PlatoFormulario): Errores => {
  const errores: Errores = {}

  const nombre = valores.nombre.trim()
  if (nombre.length < 2 || nombre.length > 100) {
    errores.nombre = "El nombre es obligatorio (entre 2 y 100 caracteres)"
  }

  if (!CATEGORIAS.includes(valores.categoria as Categoria)) {
    errores.categoria = "Elige una categoría"
  }

  const descripcion = valores.descripcion.trim()
  if (descripcion.length < 5 || descripcion.length > 500) {
    errores.descripcion = "La descripción es obligatoria (entre 5 y 500 caracteres)"
  }

  const precio = Number(valores.precio)
  if (valores.precio.trim() === "" || !Number.isFinite(precio) || precio <= 0 || precio > 9999) {
    errores.precio = "El precio debe ser un número mayor que 0 y menor que 10000"
  }

  const tiempo = Number(valores.tiempo_preparacion)
  if (valores.tiempo_preparacion.trim() === "" || !Number.isInteger(tiempo) || tiempo < 1 || tiempo > 300) {
    errores.tiempo_preparacion = "Escribe un número entero de minutos entre 1 y 300"
  }

  if (valores.imagen.trim() === "") {
    errores.imagen = "La imagen es obligatoria (ejemplo: /Eventos/lomo.jpg)"
  }

  return errores
}

export const FormularioPlato = ({
  platoInicial,
  guardando,
  onGuardar,
  onCancelar,
}: FormularioPlatoProps) => {
  const [valores, setValores] = useState<PlatoFormulario>(
    platoInicial ? desdePlato(platoInicial) : VACIO,
  )
  const [errores, setErrores] = useState<Errores>({})

  
  const manejarCambio = (
    evento: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evento.target
    setValores((anterior) => ({ ...anterior, [name]: value }))
    setErrores((anterior) => ({ ...anterior, [name]: undefined }))
  }

  const manejarEnvio = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const erroresEncontrados = validar(valores)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) return

    onGuardar({
      nombre: valores.nombre.trim(),
      categoria: valores.categoria as Categoria,
      descripcion: valores.descripcion.trim(),
      precio: Number(valores.precio),
      tiempo_preparacion: Number(valores.tiempo_preparacion),
      imagen: valores.imagen.trim(),
    })
  }

  const imagen = valores.imagen.trim()

  return (
    <form
      onSubmit={manejarEnvio}
      noValidate
      className="bg-white rounded-3xl p-6 md:p-8 shadow-sm"
    >
      <h2 className="font-heading text-2xl font-semibold mb-6">
        {platoInicial ? "Editar plato" : "Nuevo plato"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Campo id="nombre" etiqueta="Nombre" error={errores.nombre}>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={valores.nombre}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={errores.nombre ? "nombre-error" : undefined}
            className={clasesInput(errores.nombre)}
          />
        </Campo>

        <Campo id="categoria" etiqueta="Categoría" error={errores.categoria}>
          <select
            id="categoria"
            name="categoria"
            value={valores.categoria}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.categoria)}
            aria-describedby={errores.categoria ? "categoria-error" : undefined}
            className={clasesInput(errores.categoria)}
          >
            <option value="">Selecciona una categoría</option>
            {CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </Campo>

        <Campo id="descripcion" etiqueta="Descripción" error={errores.descripcion} className="md:col-span-2">
          <textarea
            id="descripcion"
            name="descripcion"
            rows={3}
            value={valores.descripcion}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.descripcion)}
            aria-describedby={errores.descripcion ? "descripcion-error" : undefined}
            className={clasesInput(errores.descripcion)}
          />
        </Campo>

        <Campo id="precio" etiqueta="Precio (S/)" error={errores.precio}>
          <input
            id="precio"
            name="precio"
            type="number"
            step="0.01"
            min="0"
            value={valores.precio}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.precio)}
            aria-describedby={errores.precio ? "precio-error" : undefined}
            className={clasesInput(errores.precio)}
          />
        </Campo>

        <Campo id="tiempo_preparacion" etiqueta="Tiempo de preparación (min)" error={errores.tiempo_preparacion}>
          <input
            id="tiempo_preparacion"
            name="tiempo_preparacion"
            type="number"
            step="1"
            min="1"
            value={valores.tiempo_preparacion}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.tiempo_preparacion)}
            aria-describedby={errores.tiempo_preparacion ? "tiempo_preparacion-error" : undefined}
            className={clasesInput(errores.tiempo_preparacion)}
          />
        </Campo>

        <Campo id="imagen" etiqueta="Imagen (ruta)" error={errores.imagen} className="md:col-span-2">
          <input
            id="imagen"
            name="imagen"
            type="text"
            placeholder="/Eventos/lomo.jpg"
            value={valores.imagen}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.imagen)}
            aria-describedby={errores.imagen ? "imagen-error" : undefined}
            className={clasesInput(errores.imagen)}
          />
          {imagen && (
            <img
              key={imagen}
              src={imagen}
              alt="Vista previa"
              onError={(evento) => {
                evento.currentTarget.style.display = "none"
              }}
              className="mt-3 h-24 w-32 rounded-lg object-cover"
            />
          )}
        </Campo>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={guardando}
          className="rounded-full bg-durazno px-8 py-3 font-semibold text-cafe transition-colors hover:bg-durazno-fuerte disabled:opacity-60"
        >
          {guardando ? "Guardando..." : platoInicial ? "Guardar cambios" : "Crear plato"}
        </button>
        <button
          type="button"
          onClick={onCancelar}
          disabled={guardando}
          className="rounded-full border border-cafe/30 px-8 py-3 font-semibold transition-colors hover:bg-durazno-suave"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
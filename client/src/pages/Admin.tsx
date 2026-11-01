import { useEffect, useState } from "react"
import { Estadistica } from "../components/Estadistica"
import { FormularioPlato } from "../components/FormularioPlato"
import { Mensaje } from "../components/Mensaje"
import { TablaPlatos } from "../components/TablaPlatos"
import { useAuth } from "../hooks/useAuth"
import { usePlatos } from "../hooks/usePlatos"
import { ErrorApi } from "../services/api"
import {
  actualizarPlato,
  crearPlato,
  eliminarPlato,
  listarMisPlatos,
} from "../services/platosService"
import { CATEGORIAS } from "../types/plato"
import type { Plato, PlatoInput } from "../types/plato"

interface Aviso {
  tipo: "exito" | "error"
  texto: string
}

export const Admin = () => {
  const { usuario, salir } = useAuth()
  const { platos, cargando, error, errorStatus, recargar } = usePlatos(listarMisPlatos)
  const [formularioAbierto, setFormularioAbierto] = useState(false)
  const [editando, setEditando] = useState<Plato | null>(null)
  const [guardando, setGuardando] = useState(false)
  const [aviso, setAviso] = useState<Aviso | null>(null)

  useEffect(() => {
    if (errorStatus === 401) salir()
  }, [errorStatus, salir])

  const abrirNuevo = () => {
    setEditando(null)
    setFormularioAbierto(true)
    setAviso(null)
  }

  const abrirEdicion = (plato: Plato) => {
    setEditando(plato)
    setFormularioAbierto(true)
    setAviso(null)
  }

  const cerrarFormulario = () => {
    setFormularioAbierto(false)
    setEditando(null)
  }

  const manejarFallo = (e: unknown, mensajePorDefecto: string) => {
    if (e instanceof ErrorApi && e.status === 401) {
      salir()
      return
    }
    setAviso({ tipo: "error", texto: e instanceof Error ? e.message : mensajePorDefecto })
  }

  const manejarGuardar = async (datos: PlatoInput) => {
    setGuardando(true)
    try {
      if (editando) {
        await actualizarPlato(editando.id, datos)
        setAviso({ tipo: "exito", texto: `El plato "${datos.nombre}" se actualizó correctamente.` })
      } else {
        await crearPlato(datos)
        setAviso({ tipo: "exito", texto: `El plato "${datos.nombre}" se creó correctamente.` })
      }
      cerrarFormulario()
      recargar()
    } catch (e) {
      manejarFallo(e, "No se pudo guardar el plato.")
    } finally {
      setGuardando(false)
    }
  }

  const manejarEliminar = async (plato: Plato) => {
    // Confirmación previa: si la persona cancela, no se elimina nada
    const confirmado = window.confirm(
      `¿Seguro que quieres eliminar "${plato.nombre}"? Esta acción no se puede deshacer.`,
    )
    if (!confirmado) return

    try {
      await eliminarPlato(plato.id)
      setAviso({ tipo: "exito", texto: `El plato "${plato.nombre}" se eliminó correctamente.` })
      recargar()
    } catch (e) {
      manejarFallo(e, "No se pudo eliminar el plato.")
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">Mis platos</h1>
        {!formularioAbierto && (
          <button
            type="button"
            onClick={abrirNuevo}
            className="rounded-full bg-durazno px-8 py-3 font-semibold text-cafe transition-colors hover:bg-durazno-fuerte"
          >
            Nuevo plato
          </button>
        )}
      </div>
      <p className="text-arcilla mb-8">
        Hola, {usuario?.nombre}. Aquí ves los platos que creaste con tu cuenta: solo tú puedes
        editarlos o eliminarlos.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Estadistica titulo="Total de platos" valor={platos.length} />
        {CATEGORIAS.map((categoria) => (
          <Estadistica
            key={categoria}
            titulo={categoria}
            valor={platos.filter((plato) => plato.categoria === categoria).length}
          />
        ))}
      </div>

      {aviso && (
        <div className="mb-8">
          <Mensaje tipo={aviso.tipo} onCerrar={() => setAviso(null)}>
            {aviso.texto}
          </Mensaje>
        </div>
      )}

      {formularioAbierto && (
        <div className="mb-10">
          <FormularioPlato
            key={editando?.id ?? "nuevo"}
            platoInicial={editando}
            guardando={guardando}
            onGuardar={manejarGuardar}
            onCancelar={cerrarFormulario}
          />
        </div>
      )}

      {cargando && <p className="text-center text-arcilla">Cargando platos...</p>}

      {error && (
        <div className="flex flex-col items-center gap-4">
          <Mensaje tipo="error">{error}</Mensaje>
          <button
            type="button"
            onClick={recargar}
            className="rounded-full border border-cafe/30 px-6 py-2 font-medium hover:bg-durazno-suave"
          >
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && (
        <TablaPlatos platos={platos} onEditar={abrirEdicion} onEliminar={manejarEliminar} />
      )}
    </main>
  )
}

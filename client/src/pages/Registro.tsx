import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Link, Navigate } from "react-router-dom"
import { Campo } from "../components/Campo"
import { Mensaje } from "../components/Mensaje"
import { useAuth } from "../hooks/useAuth"
import { iniciarSesion, registrarUsuario } from "../services/authService"
import { clasesInput } from "../utils/clasesInput"

interface Valores {
  nombre: string
  email: string
  password: string
  confirmar: string
}

type Errores = Partial<Record<keyof Valores, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const VACIO: Valores = { nombre: "", email: "", password: "", confirmar: "" }


const validar = (valores: Valores): Errores => {
  const errores: Errores = {}

  const nombre = valores.nombre.trim()
  if (nombre.length < 2 || nombre.length > 60) {
    errores.nombre = "El nombre es obligatorio (entre 2 y 60 caracteres)"
  }

  if (!EMAIL.test(valores.email.trim())) {
    errores.email = "Escribe un correo electrónico válido"
  }

  const { password } = valores
  if (password.length < 8 || password.length > 72 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    errores.password = "Debe tener al menos 8 caracteres, con una letra y un número"
  }

  if (valores.confirmar !== password) {
    errores.confirmar = "Las contraseñas no coinciden"
  }

  return errores
}

export const Registro = () => {
  const { usuario, entrar } = useAuth()
  const [valores, setValores] = useState<Valores>(VACIO)
  const [errores, setErrores] = useState<Errores>({})
  const [errorApi, setErrorApi] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  if (usuario) return <Navigate to="/admin" replace />

  const manejarCambio = (evento: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evento.target
    setValores((anterior) => ({ ...anterior, [name]: value }))
    setErrores((anterior) => ({ ...anterior, [name]: undefined }))
  }

  const manejarEnvio = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    setErrorApi(null)

    const encontrados = validar(valores)
    setErrores(encontrados)
    if (Object.keys(encontrados).length > 0) return

    setEnviando(true)
    try {
      const email = valores.email.trim()
      await registrarUsuario({ nombre: valores.nombre.trim(), email, password: valores.password })
      
      const respuesta = await iniciarSesion({ email, password: valores.password })
      entrar(respuesta.token, respuesta.usuario)
    } catch (error) {
      setErrorApi(error instanceof Error ? error.message : "No se pudo crear la cuenta")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="max-w-md mx-auto px-6 py-16">
      <form onSubmit={manejarEnvio} noValidate className="bg-white rounded-3xl p-8 shadow-sm">
        <h1 className="font-heading text-3xl font-bold mb-6">Crear cuenta</h1>

        {errorApi && (
          <div className="mb-5">
            <Mensaje tipo="error">{errorApi}</Mensaje>
          </div>
        )}

        <div className="flex flex-col gap-5">
          <Campo id="nombre" etiqueta="Nombre" error={errores.nombre}>
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              value={valores.nombre}
              onChange={manejarCambio}
              aria-invalid={Boolean(errores.nombre)}
              aria-describedby={errores.nombre ? "nombre-error" : undefined}
              className={clasesInput(errores.nombre)}
            />
          </Campo>

          <Campo id="email" etiqueta="Correo electrónico" error={errores.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={valores.email}
              onChange={manejarCambio}
              aria-invalid={Boolean(errores.email)}
              aria-describedby={errores.email ? "email-error" : undefined}
              className={clasesInput(errores.email)}
            />
          </Campo>

          <Campo id="password" etiqueta="Contraseña" error={errores.password}>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={valores.password}
              onChange={manejarCambio}
              aria-invalid={Boolean(errores.password)}
              aria-describedby={errores.password ? "password-error" : undefined}
              className={clasesInput(errores.password)}
            />
          </Campo>

          <Campo id="confirmar" etiqueta="Repite la contraseña" error={errores.confirmar}>
            <input
              id="confirmar"
              name="confirmar"
              type="password"
              autoComplete="new-password"
              value={valores.confirmar}
              onChange={manejarCambio}
              aria-invalid={Boolean(errores.confirmar)}
              aria-describedby={errores.confirmar ? "confirmar-error" : undefined}
              className={clasesInput(errores.confirmar)}
            />
          </Campo>
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="mt-8 w-full rounded-full bg-durazno px-8 py-3 font-semibold text-cafe transition-colors hover:bg-durazno-fuerte disabled:opacity-60"
        >
          {enviando ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        <p className="mt-6 mb-0 text-center text-arcilla">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-semibold text-cafe underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </main>
  )
}

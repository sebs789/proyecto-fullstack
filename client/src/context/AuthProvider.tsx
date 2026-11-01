import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { ErrorApi } from "../services/api"
import { obtenerPerfil } from "../services/authService"
import { borrarToken, guardarToken, obtenerToken } from "../services/sesion"
import type { Usuario } from "../types/usuario"
import { AuthContexto } from "./authContexto"

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  // Si hay un token guardado, hay que verificarlo antes de decidir si hay sesión
  const [verificando, setVerificando] = useState(() => obtenerToken() !== null)

  useEffect(() => {
    if (!obtenerToken()) return

    let activo = true
    obtenerPerfil()
      .then((datos) => {
        if (activo) setUsuario(datos)
      })
      .catch((error: unknown) => {
        // Solo se borra el token si el servidor dice que no es válido (401), no si está apagado
        if (error instanceof ErrorApi && error.status === 401) borrarToken()
      })
      .finally(() => {
        if (activo) setVerificando(false)
      })

    return () => {
      activo = false
    }
  }, [])

  const entrar = (token: string, datos: Usuario) => {
    guardarToken(token)
    setUsuario(datos)
  }

  const salir = () => {
    borrarToken()
    setUsuario(null)
  }

  return (
    <AuthContexto.Provider value={{ usuario, verificando, entrar, salir }}>
      {children}
    </AuthContexto.Provider>
  )
}

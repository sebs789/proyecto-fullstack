import { createContext } from 'react'
import type { Usuario } from '../types/usuario'

export interface AuthContextoValor {
  usuario: Usuario | null
  verificando: boolean // true mientras se comprueba el token guardado
  entrar: (token: string, usuario: Usuario) => void
  salir: () => void
}

export const AuthContexto = createContext<AuthContextoValor | null>(null)

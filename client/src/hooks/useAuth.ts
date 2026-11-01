import { useContext } from 'react'
import { AuthContexto } from '../context/authContexto'

export const useAuth = () => {
  const contexto = useContext(AuthContexto)
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return contexto
}

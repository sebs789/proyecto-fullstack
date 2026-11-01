import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"


export const RutaProtegida = () => {
  const { usuario, verificando } = useAuth()
  const ubicacion = useLocation()

  if (verificando) {
    return <p className="py-24 text-center text-arcilla">Verificando sesión...</p>
  }

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />
  }

  return <Outlet />
}

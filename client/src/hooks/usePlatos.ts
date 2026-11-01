import { useEffect, useState } from 'react'
import { ErrorApi } from '../services/api'
import { listarPlatos } from '../services/platosService'
import type { Plato } from '../types/plato'


export const usePlatos = (cargar: () => Promise<Plato[]> = listarPlatos) => {
  const [platos, setPlatos] = useState<Plato[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [errorStatus, setErrorStatus] = useState<number | null>(null)
  const [version, setVersion] = useState(0) // al cambiar, se vuelve a cargar la lista

  useEffect(() => {
    let activo = true // evita actualizar el estado si el componente ya se cerró

    cargar()
      .then((datos) => {
        if (!activo) return
        setPlatos(datos)
        setError(null)
        setErrorStatus(null)
      })
      .catch((e: unknown) => {
        if (!activo) return
        setError(e instanceof Error ? e.message : 'No se pudieron cargar los platos')
        setErrorStatus(e instanceof ErrorApi ? e.status : null)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [version, cargar])

  const recargar = () => setVersion((v) => v + 1)

  return { platos, cargando, error, errorStatus, recargar }
}

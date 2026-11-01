import { obtenerToken } from './sesion'


export const API_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3000'


export interface RespuestaApi<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  errores?: string[]
}

export class ErrorApi extends Error {
  status: number

  constructor(mensaje: string, status: number) {
    super(mensaje)
    this.status = status
  }
}


export const solicitar = async <T>(
  ruta: string,
  opciones: RequestInit = {},
): Promise<RespuestaApi<T>> => {
  const cabeceras: Record<string, string> = { 'Content-Type': 'application/json' }
  const token = obtenerToken()
  if (token) cabeceras.Authorization = `Bearer ${token}`

  let respuesta: Response

  try {
    respuesta = await fetch(`${API_URL}${ruta}`, { ...opciones, headers: cabeceras })
  } catch {
    throw new ErrorApi('No se pudo conectar con el servidor. Verifica que el backend esté encendido.', 0)
  }

  const json = (await respuesta.json().catch(() => null)) as RespuestaApi<T> | null

  if (!respuesta.ok || !json?.success) {
    throw new ErrorApi(
      json?.errores?.join('. ') ?? json?.error ?? 'Error inesperado del servidor',
      respuesta.status,
    )
  }

  return json
}

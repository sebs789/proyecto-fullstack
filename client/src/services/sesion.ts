
const CLAVE = 'token'

export const obtenerToken = (): string | null => {
  try {
    return localStorage.getItem(CLAVE)
  } catch {
    return null
  }
}

export const guardarToken = (token: string): void => {
  localStorage.setItem(CLAVE, token)
}

export const borrarToken = (): void => {
  localStorage.removeItem(CLAVE)
}

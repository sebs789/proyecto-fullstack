export interface Usuario {
  id: string
  nombre: string
  email: string
}

export interface DatosRegistro {
  nombre: string
  email: string
  password: string
}

export interface DatosLogin {
  email: string
  password: string
}

export interface RespuestaLogin {
  token: string
  usuario: Usuario
}

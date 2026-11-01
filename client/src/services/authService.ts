import type { DatosLogin, DatosRegistro, RespuestaLogin, Usuario } from '../types/usuario'
import { solicitar } from './api'

export const registrarUsuario = async (datos: DatosRegistro): Promise<Usuario> => {
  const respuesta = await solicitar<{ usuario: Usuario }>('/auth/registro', {
    method: 'POST',
    body: JSON.stringify(datos),
  })
  return (respuesta.data as { usuario: Usuario }).usuario
}

export const iniciarSesion = async (datos: DatosLogin): Promise<RespuestaLogin> => {
  const respuesta = await solicitar<RespuestaLogin>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(datos),
  })
  return respuesta.data as RespuestaLogin
}

export const obtenerPerfil = async (): Promise<Usuario> => {
  const respuesta = await solicitar<{ usuario: Usuario }>('/auth/perfil')
  return (respuesta.data as { usuario: Usuario }).usuario
}

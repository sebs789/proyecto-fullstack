import type { Plato, PlatoInput } from '../types/plato'
import { solicitar } from './api'


export const listarPlatos = async (): Promise<Plato[]> => {
  const respuesta = await solicitar<Plato[]>('/platos')
  return respuesta.data ?? []
}


export const listarMisPlatos = async (): Promise<Plato[]> => {
  const respuesta = await solicitar<Plato[]>('/platos/mios')
  return respuesta.data ?? []
}

export const crearPlato = async (plato: PlatoInput): Promise<Plato> => {
  const respuesta = await solicitar<Plato>('/platos', {
    method: 'POST',
    body: JSON.stringify(plato),
  })
  return respuesta.data as Plato
}

export const actualizarPlato = async (id: string, plato: PlatoInput): Promise<Plato> => {
  const respuesta = await solicitar<Plato>(`/platos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(plato),
  })
  return respuesta.data as Plato
}

export const eliminarPlato = async (id: string): Promise<void> => {
  await solicitar<never>(`/platos/${id}`, { method: 'DELETE' })
}

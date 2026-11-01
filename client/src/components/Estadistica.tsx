interface EstadisticaProps {
  titulo: string
  valor: number
}

export const Estadistica = ({ titulo, valor }: EstadisticaProps) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <p className="text-arcilla text-sm mb-1">{titulo}</p>
      <p className="font-heading text-3xl font-bold mb-0">{valor}</p>
    </div>
  )
}
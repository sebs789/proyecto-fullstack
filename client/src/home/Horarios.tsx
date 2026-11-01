interface Horario {
  dia: string
  horas: string
}

const SEMANA: Horario[] = [
  { dia: "Lunes", horas: "12:00 – 22:00" },
  { dia: "Martes", horas: "12:00 – 22:00" },
  { dia: "Miércoles", horas: "12:00 – 22:00" },
  { dia: "Jueves", horas: "12:00 – 22:00" },
  { dia: "Viernes", horas: "12:00 – 22:00" },
  { dia: "Sábado", horas: "12:00 – 23:00" },
  { dia: "Domingo", horas: "12:00 – 21:00" },
]

const FERIADOS: Horario[] = [
  { dia: "1 de enero", horas: "13:00 – 20:00" },
  { dia: "1 de mayo", horas: "12:00 – 20:00" },
  { dia: "28 de julio", horas: "12:00 – 21:00" },
  { dia: "1 de noviembre", horas: "12:00 – 20:00" },
  { dia: "8 de diciembre", horas: "12:00 – 20:00" },
  { dia: "25 de diciembre", horas: "13:00 – 20:00" },
]

const ListaHorarios = ({ titulo, items }: { titulo: string; items: Horario[] }) => (
  <div className="bg-white rounded-3xl p-8 shadow-sm">
    <h3 className="font-heading text-xl font-semibold mb-4">{titulo}</h3>
    <ul>
      {items.map(({ dia, horas }) => (
        <li
          key={dia}
          className="flex items-center justify-between gap-4 py-3 border-b border-durazno-suave last:border-b-0"
        >
          <span className="font-medium">{dia}</span>
          <span className="text-arcilla">{horas}</span>
        </li>
      ))}
    </ul>
  </div>
)

export const Horarios = () => {
  return (
    <section id="horarios" className="scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          Horarios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ListaHorarios titulo="Durante la semana" items={SEMANA} />
          <ListaHorarios titulo="Feriados" items={FERIADOS} />
        </div>
      </div>
    </section>
  )
}

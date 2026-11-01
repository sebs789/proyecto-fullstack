import type { ReactNode } from "react"

interface MensajeProps {
  tipo: "exito" | "error"
  children: ReactNode
  onCerrar?: () => void
}

export const Mensaje = ({ tipo, children, onCerrar }: MensajeProps) => {
  const colores =
    tipo === "exito"
      ? "bg-emerald-50 text-emerald-900 border-emerald-200"
      : "bg-red-50 text-red-900 border-red-200"

  return (
    <div
      role={tipo === "error" ? "alert" : "status"}
      className={`flex items-start justify-between gap-4 rounded-2xl border px-5 py-4 ${colores}`}
    >
      <p className="mb-0">{children}</p>
      {onCerrar && (
        <button type="button" onClick={onCerrar} className="font-semibold underline">
          Cerrar
        </button>
      )}
    </div>
  )
}
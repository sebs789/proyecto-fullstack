import type { ReactNode } from "react"

interface CampoProps {
  id: string
  etiqueta: string
  error?: string
  className?: string
  children: ReactNode
}

export const Campo = ({ id, etiqueta, error, className = "", children }: CampoProps) => (
  <div className={className}>
    <label htmlFor={id} className="block font-medium mb-1">
      {etiqueta}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="mt-1 mb-0 text-sm text-red-700">
        {error}
      </p>
    )}
  </div>
)

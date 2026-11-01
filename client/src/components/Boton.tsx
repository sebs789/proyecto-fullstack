import type { ReactNode } from "react"
import { Link } from "react-router-dom"


interface BotonProps {
  href: string                          
  children: ReactNode                   
  variante?: "principal" | "contorno"   
  compacto?: boolean                    
  className?: string                    
}

export const Boton = ({
  href,
  children,
  variante = "principal", 
  compacto = false,       
  className = "",
}: BotonProps) => {
  
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-durazno-fuerte"

  
  const tamanos = compacto ? "px-6 py-2.5" : "px-8 py-3.5 text-lg"

  const variantes = {
    principal: "bg-durazno text-cafe hover:bg-durazno-fuerte", 
    contorno: "border-2 border-white/80 text-white hover:bg-white/15",
  }

  const clases = `${base} ${tamanos} ${variantes[variante]} ${className}`

  if (href.startsWith("/")) {
    return (
      <Link to={href} className={clases}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={clases}>
      {children}
    </a>
  )
}
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Bienvenido } from "../home/Bienvenido"
import { Horarios } from "../home/Horarios"
import { Nosotros } from "../home/Nosotros"
import { Platos } from "../home/Platos"
import { Mainfooter } from "../layouts/Mainfooter"

export const Home = () => {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" })
    }
  }, [hash])

  return (
    <>
      <Bienvenido />
      <Nosotros />
      <Platos />
      <Horarios />
      <Mainfooter />
    </>
  )
}
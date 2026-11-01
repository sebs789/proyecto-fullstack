import Bienvenido1 from "../assets/Bienvenidos/pexels-ali-kraievski-411137317-18014530.jpg"
import { Boton } from "../components/Boton"

export const Bienvenido = () => {
  return (
    <section id="inicio" className="scroll-mt-28">
      <figure className="relative">
        <img src={Bienvenido1} alt="" className="w-full h-125 md:h-150 object-cover" />

        <div className="absolute inset-0 bg-cafe/55 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight">
            Bienvenido a MyRestaurant
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-xl mt-5">
            El lugar donde la buena comida y los buenos momentos se encuentran
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Boton href="/#platos">Ver la carta</Boton>
            <Boton href="/#horarios" variante="contorno">
              Ver horarios
            </Boton>
          </div>
        </div>
      </figure>
    </section>
  )
}
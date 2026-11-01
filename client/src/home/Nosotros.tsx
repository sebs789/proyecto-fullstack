const TARJETAS = [
  {
    titulo: "Quiénes Somos",
    texto:
      "En My Restaurant, somos apasionados de la gastronomía criolla y guardianes de las recetas tradicionales que han pasado de generación en generación. Nacimos con el propósito de rendir un homenaje sincero a la sazón autóctona, combinando la riqueza de nuestros ingredientes locales con el amor, la paciencia y el respeto que cada plato merece. Para nosotros, la comida criolla no es solo alimentarse; es una experiencia que despierta recuerdos, reúne a las familias y celebra nuestra identidad cultural.",
  },
  {
    titulo: "Nuestra Misión",
    texto:
      "Brindar a nuestros clientes una experiencia culinaria inolvidable, ofreciendo platos criollos auténticos, elaborados con insumos frescos de la más alta calidad y preparados con el punto exacto de sazón tradicional. Nos esforzamos por brindar un servicio cálido, cercano y eficiente que haga sentir a cada visitante como en su propia casa.",
  },
  {
    titulo: "Nuestra Visión",
    texto:
      "Ser reconocidos como el restaurante criollo de referencia en nuestra comunidad y región, destacado por la autenticidad de sus sabores, el compromiso con la excelencia gastronómica y la preservación de nuestra herencia culinaria para las futuras generaciones.",
  },
]

export const Nosotros = () => {
  return (
    <section id="nosotros" className="scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          Nosotros
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TARJETAS.map(({ titulo, texto }) => (
            <article
              key={titulo}
              className="bg-white rounded-3xl p-8 border-t-4 border-durazno shadow-sm"
            >
              <h3 className="font-heading text-xl font-semibold mb-4">{titulo}</h3>
              <p className="text-arcilla leading-relaxed">{texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

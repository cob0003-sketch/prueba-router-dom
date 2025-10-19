import { motion } from "framer-motion"
import { duration } from "moment"

export default function IndexPage() {

  const contenedorProyectos = [
    {
      id: '1',
      titulo: 'Elena Neumología: Desarrollo web seguro y adaptable',
      imagen: '/img/digitalizacion.jpg',
      texto: 'El desarrollo de Elena Neumologia se centrá en ofrecer una plataforma profesional , intuitiva y optimizada para dispositivos móviles, garantizando máxima seguridad.',
      fecha: '9 de marzo de 2025',
      enlace: 'https://asirtec.es/%f0%9f%9a%80-elena-neumologia-desarrollo-web-seguro-y-adaptable-%f0%9f%8f%a5%f0%9f%92%bb/'
    },
    {
      id: '2',
      titulo: 'Elena Neumología: Desarrollo web seguro y adaptable',
      imagen: '/img/solucion.jpg',
      texto: 'El desarrollo de Elena Neumologia se centrá en ofrecer una plataforma profesional , intuitiva y optimizada para dispositivos móviles, garantizando máxima seguridad.',
      fecha: '9 de marzo de 2025',
      enlace: 'https://asirtec.es/%f0%9f%9a%80-elena-neumologia-desarrollo-web-seguro-y-adaptable-%f0%9f%8f%a5%f0%9f%92%bb/'
    },
    {
      id: '3',
      titulo: 'Elena Neumología: Desarrollo web seguro y adaptable',
      imagen: '/img/aplizaciones-innovadoras.jpg',
      texto: 'El desarrollo de Elena Neumologia se centrá en ofrecer una plataforma profesional , intuitiva y optimizada para dispositivos móviles, garantizando máxima seguridad.',
      fecha: '9 de marzo de 2025',
      enlace: 'https://asirtec.es/%f0%9f%9a%80-elena-neumologia-desarrollo-web-seguro-y-adaptable-%f0%9f%8f%a5%f0%9f%92%bb/'
    }
  ]

  return (
    <>
      <section aria-labelledby="pryectos-heading">
        <div className="flex flex-col items-start">
          <h2
            id="proyectos-heading"
            className="pl-30 mt-25 text-5xl text-neutral-500 text-shadow-neutral-800 text-shadow-md">Nuestros
             <span className="block pl-10 text-neutral-500 font-semibold">últimos</span>
             <motion.span
              initial={{opacity: 0, x: 70}}
               whileInView={{opacity:1, x:0}}
                viewport={{once: true, amount: 0.5}}
                transition={{duration: 1.2 , delay: 0.7, ease:'easeOut'}}
                 className="block pl-20 text-green-600 font-bold uppercase">proyectos</motion.span></h2>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 md:mx-auto p-10">
            {contenedorProyectos.map((proyecto, index) => (
              <motion.article
                initial={{ opacity: 0, x:8}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true, amount: 0.4}}
                transition={{duration: 2, delay: 0.6 * index * 0.4, ease: 'easeOut'}}
                key={proyecto.id}
                className="shadow-neutral-500 shadow-lg rounded-b-md"
              >
                <a

                  href={`${proyecto.enlace}`}
                  target="blank">
                  <img
                    src={`${proyecto.imagen}`}
                    alt={`Proyecto de ${proyecto.titulo}`}
                    className="md:max-h-70 w-full object-cover object-center"
                  />
                  <div className="flex flex-col gap-3 p-5">
                    <p className="text-sm">{proyecto.fecha}</p>
                    <h3 className="text-xl md:text-3xl lg:text-4xl text-neutral-800 tracking-wide text-shadow-sm text-shadow-violet-200 underline underline-offset-5">{proyecto.titulo}</h3>
                    <p className="pt-5 font-semibold text-neutral-600">{proyecto.texto}</p>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}


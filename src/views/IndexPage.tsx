import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { useOutletContext } from "react-router-dom"
import type { FormStateType } from "../layouts/Layout"
// import { Form, useActionData } from 'react-router-dom'
// import type { ActionFunctionArgs } from "react-router-dom"
import { initialFormState } from "../layouts/Layout"
import { useAppStore } from "../stores/useAppStoreCreate"
import { contenedorProyectos, enlacesNav } from "../data/db"
import type { ErrorForm } from "../types/index"

//props del context layout
export type LayoutContextTypeProps = {
  formState: FormStateType,
  setFormState: React.Dispatch<React.SetStateAction<FormStateType>>,

}

// // action que maneja la repuesta del formulario
// export const action = async ({ request }: ActionFunctionArgs) => {
//   const formData = await request.formData()
//   const data = Object.fromEntries(formData.entries()) as FormStateType
//   const formatDataForm = { ...data }

//   console.log(formatDataForm)
//   return { success: true }
// }

export default function IndexPage() {
  //States
  const [_scrolling, setScrolling] = useState<number>(0)
  //Traemos los state del latout con useOutletContext
  const { formState, setFormState } = useOutletContext<LayoutContextTypeProps>()
  const [errorForm, setErrorForm] = useState<ErrorForm>({} as ErrorForm)
  const formRef = useRef<HTMLFormElement | null>(null);
  // const actionData = useActionData() as { success?: boolean } | null;
  // const addLoginUsuarios = useAppStore(state => state.addLoginUsuarios)
  const changeModalNav = useAppStore(state => state.changeModalNav)
  const closeModalNav = useAppStore(state => state.closeModalNav)
  const modalNav = useAppStore(state => state.modalNav)
  const modalBanner = useAppStore(state => state.modalBanner)

  //Mostrar los cmpos requeridos desde el inicio
  useEffect(() => {
    setErrorForm({
      nombre: '*Campo requerido*',
      apellido1: '*Campo requerido*',
      apellido2: '*Campo requerido*',
      email: '*Campo requerido*',
      telefono: '*Campo requerido*',
      fecha: '*Campo requerido*',
    })
  }, [])

  // //envio del formulario
  // useEffect(() => {
  //   if (actionData?.success) {
  //     addLoginUsuarios(formState)
  //     setFormState(initialFormState);
  //     setErrorForm({});
  //     formRef.current?.reset();
  //   } else {
  //     console.log('fallo en el envio')
  //   }
  // }, [actionData])


  //Comprovar el scroll para quitarle la visibilidad a la navegación
  useEffect(() => {
    const updateStateScroll = () => {
      const scrollNav = window.scrollY
      setScrolling(scrollNav)

      if (scrollNav > 0) {
        closeModalNav()
      }
    }
    window.addEventListener('scroll', updateStateScroll)
    return () => window.removeEventListener('scroll', updateStateScroll)
  }, [])


  //recuperar datos y validación
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { name, value } = e.target

    const updateFormState = { ...formState, [name]: value }
    setFormState(updateFormState)

    if (value === '') {
      setErrorForm(prev => ({
        ...prev,
        [name]: '*Campo requerido*'
      }))
    } else if (name === 'email' && !regex.test(updateFormState.email)) {
      setErrorForm(prev => ({
        ...prev,
        email: '*El email no es valido*'
      }))
    } else {
      setErrorForm(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  //boton  reset formulario
  const handleReset = () => {
    setFormState(initialFormState)
    formRef.current?.reset()
  }

  // // manejador del state del modal
  // const isModalOpen = () => {
  //   setModalNav(prev => !prev)
  // }

  // Se hace con css puro
  // const handleScrollSection = (id: string) => {
  //   const section = document.getElementById(id)

  //   if (section) {
  //     section.scrollIntoView({ behavior: 'smooth'})
  //   }
  // }

  return (
    <>
      {/**barra de navegación */}
      { }
      <section aria-labelledby="name-page">
        {!modalBanner ? <div className='fixed flex flex-row items-center gap-15 w-full bg-white px-5 py-3 z-100 top-0 left-0'>
          <h1
            id="name-page"
            className='text-5xl text-neutral-600 font-semi-bold '>Logo</h1>
            <nav className="flex-1 flex flex-row gap-5 items-center pt-2">
                {enlacesNav.map(enlace => (
                  <motion.div
                    key={enlace.nombre}
                    initial={{ x: 0 }}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.15, ease: 'linear' }}
                    className='font-semibold text-md cursor-pointer'>
                    <a
                      href={`#${enlace.path}`}
                      className="text-neutral-500 font-bold hover:text-neutral-950 transition-all linear duration-500"
                    >{enlace.nombre}</a>
                  </motion.div>
                )
                )}
            </nav>
          {/**Nav navegación, código del modal */}
          <div className='flex flex-col  '>
            <button
              type='button'
              onClick={changeModalNav}
              className='w-35 pt-2 mb-1 text-right pr-5 text-green-700 text-xs font-bold underline underline-offset-3 pb-1 z-50'>Menú</button>
            <AnimatePresence>
              {!modalNav ? '' : <motion.nav
                initial={{ opacity: 0.2, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ type: 'spring', stiffness: 20, damping: 10 }}
                className='absolute top-18 right-0 w-67 pr-10 py-10 bg-neutral-700 flex flex-col gap-1 items-end rounded-bl-sm z-90'>
                {enlacesNav.map(enlace => (
                  <motion.div
                    key={enlace.nombre}
                    initial={{ x: 0 }}
                    whileHover={{ x: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className='font-semibold text-md cursor-pointer'>
                    <a
                      href={`#${enlace.path}`}
                      className="text-white hover:text-amber-200 transition-all linear duration-500"
                    >{enlace.nombre}</a>
                  </motion.div>
                )
                )}
              </motion.nav>}
            </AnimatePresence>
          </div>
        </div> : ''}

      </section>

      <section aria-labelledby="proyectos-heading"
        id="formacion"
      >
        <div
          className="flex flex-col items-start mt-4">
          <h2
            id="proyectos-heading"
            className="pl-32 mt-16 text-5xl text-neutral-600 text-shadow-neutral-400 font-medium">Nuestros
            <span className="text-neutral-600">{' '}productos</span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'linear' }}
              className="block text-green-600 font-medium">destacados</motion.span></h2>
          <p className="w-1/2 pl-32 pt-2 text-xl text-neutral-500">Texto alternativo relacionado con la sección, màs texto alternativo, màs texto alternativo.</p>
          <div className="grid gap-10 w-7/8 md:mx-auto p-10">
            {contenedorProyectos.map((proyecto, index) => {
              //Variable que contrrola el desplazamiento
              const esIndexPar = proyecto.promocion && index % 2 === 0
              // Definimos desplazamiento según la condición
              const desplazamiento = esIndexPar ? 20 : -20
              if (proyecto.promocion) {
                return (
                  <motion.article
                    initial={{ opacity: 0.2, x: desplazamiento }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1, delay: 0.2 * index * 1.2, ease: 'linear' }}
                    key={proyecto.id}
                    className=" shadow-neutral-500 shadow-lg rounded-b-md "
                  >
                    <a
                      href={`${proyecto.enlace}`}
                      target="blank"
                      className="grid grid-cols-2"
                    >
                      <div className="flex flex-col justify-center gap-3 p-5">
                        <p className="text-sm">{proyecto.fecha}</p>
                        <h3 className="text-xl md:text-3xl lg:text-4xl text-neutral-800 tracking-wide text-shadow-sm text-shadow-violet-200 underline underline-offset-5">{proyecto.titulo}</h3>
                        <p className="pt-5 font-semibold text-neutral-600">{proyecto.texto}</p>
                      </div>
                      <div className="relative not-first:overflow-hidden">
                        <img
                          src={`${proyecto.imagen}`}
                          alt={`Proyecto de ${proyecto.titulo}`}
                          className="h-full md:max-h-80 w-full object-cover object-center hover:scale-110 transition-all duration-400 ease-linear"
                        />
                      </div>
                    </a>
                  </motion.article>
                )
              }
            })}
          </div>
        </div>
      </section>

      <section className="relative"
        id="contacto">
        <h2
          id="proyectos-heading"
          className="pl-32 mt-16 text-5xl text-neutral-600 text-shadow-neutral-400 font-medium">Te asesoramos para conseguir tus objetivos
          <span className="text-neutral-600 text-xl">{' '}</span>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'linear' }}
            className="block text-green-600 font-medium">profesionales</motion.span></h2>
        <div className="flex flex-col gap-3 w-1/2 mx-auto my-5 ">
          <p className="w-2/3 font-bold text-neutral-400">Rellena los campos del formulario para que podamos contactar contigo lo antes posible.</p>
          <div className="w-full">
            <form
              //props del formulario
              ref={formRef}
              method="post"
              className="flex flex-col p-5  shadow-neutral-400 shadow-lg rounded-br-2xl"
            >
              {/*Tarjetas de los input*/}
              <div>
                <label
                  htmlFor="nombre"
                  className="block w-full text-lg font-medium text-neutral-600 mt-2"
                >Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formState.nombre}
                  onChange={handleChange}
                  placeholder="Escribe tú nombre"
                  className="block w-full p-2 border-b-2 border-b-cyan-500 shadow-md focus:outline-none focus:ring-0"
                />
                {errorForm ? <p className="text-red-700 text-sm">{errorForm.nombre}</p> : ''}
              </div>
              <div>
                <label
                  htmlFor="apellido1"
                  className="block w-full text-lg font-medium text-neutral-600 mt-2"
                >Primer Apellido:</label>
                <input
                  type="text"
                  id="apellido1"
                  name="apellido1"
                  value={formState.apellido1}
                  onChange={handleChange}
                  placeholder="Escribe tú primer apellido"
                  className="block w-full p-2 border-b-2 border-b-cyan-500 shadow-md focus:outline-none focus:ring-0"
                />
                {errorForm ? <p className="text-red-700 text-sm">{errorForm.apellido1}</p> : ''}
              </div>
              <div>
                <label
                  htmlFor="apellido2"
                  className="block w-full text-lg font-medium text-neutral-600 mt-2"
                >Segundo Apellido:</label>
                <input
                  type="text"
                  id="apellido2"
                  name="apellido2"
                  value={formState.apellido2}
                  onChange={handleChange}
                  placeholder="Escribe tú segundo apellido"
                  className="block w-full p-2 border-b-2 border-b-cyan-500 shadow-md focus:outline-none focus:ring-0"
                />
                {errorForm ? <p className="text-red-700 text-sm">{errorForm.apellido2}</p> : ''}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block w-full text-lg font-medium text-neutral-600 mt-2"
                >Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Escribe tú email"
                  className="block w-full p-2 border-b-2 border-b-cyan-500 shadow-md focus:outline-none focus:ring-0"
                />
                {errorForm ? <p className="text-red-700 text-sm">{errorForm.email}</p> : ''}
              </div>
              <div>
                <label
                  htmlFor="telefono"
                  className="block w-full text-lg font-medium text-neutral-600 mt-2"
                >Teléfono:</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={formState.telefono}
                  onChange={handleChange}
                  placeholder="Escribe un telefono válido"
                  className="block w-full p-2 border-b-2 border-b-cyan-500 shadow-md focus:outline-none focus:ring-0"
                />
                {errorForm ? <p className="text-red-700 text-sm">{errorForm.telefono}</p> : ''}
              </div>
              <div>
                <label
                  htmlFor="fecha"
                  className="block w-full text-lg font-medium text-neutral-600 mt-2"
                >Fecha:</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formState.fecha}
                  onChange={handleChange}
                  className="block w-full p-2 border-b-2 text-neutral-600 border-b-cyan-500 shadow-md focus:outline-none focus:ring-0"
                />
                {errorForm ? <p className="text-red-700 text-sm">{errorForm.fecha}</p> : ''}
              </div>
              <div>
                <label
                  htmlFor="comentario"
                  className="block w-full text-lg font-medium text-neutral-600 mt-2"
                >Comentario:</label>
                <textarea
                  name="comentario"
                  id="comentario"
                  placeholder="Escribe un breve comentario"
                  className="block w-full min-h-30 p-1 border-b-2 border-b-cyan-500 shadow-md focus:outline-none focus:ring-0"
                  value={formState.comentario}
                  onChange={handleChange}
                >
                </textarea>
              </div>
              {/*Botones de los input*/}
              <div className="flex flex-row justify-center gap-10 pt-10 pb-5">
                <button
                  type="submit"
                  className="block w-50 py-1 text-lg bg-emerald-400 rounded-lg shadow-md">Enviar</button>
                <button
                  type="button"
                  className="block w-50 py-1 text-lg bg-yellow-300 rounded-lg shadow-md"
                  onClick={handleReset}
                >Resetear</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}


import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { useOutletContext } from "react-router-dom"
import type { FormStateType } from "../layouts/Layout"
// import { Form, useActionData } from 'react-router-dom'
// import type { ActionFunctionArgs } from "react-router-dom"
import { initialFormState } from "../layouts/Layout"
import { useAppStore } from "../stores/useAppStoreCreate"
import { contenedorMamparas, enlacesNav, contenedorPlatos } from "../data/db"
import type { ErrorForm } from "../types/index"
import.meta.env.BASE_URL

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
  const [scrolling, setScrolling] = useState<number>(0)
  const [mediaScreen, setMediaScreen] = useState<'movil' | 'tablet' | 'laptop'>('laptop')
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

  useEffect(() => {
    const queryMovil = window.matchMedia("(min-width: 640px)")
    const queryTablet = window.matchMedia("(min-width: 768px)")
    const queryLaptop = window.matchMedia("(min-width: 1024px)")

    const changeMedia = () => {
      queryLaptop.matches ? setMediaScreen('laptop') :
        queryTablet.matches ? setMediaScreen('tablet') :
          setMediaScreen('movil')
    }
    changeMedia()

    // ✅ Escuchar cambios
    queryMovil.addEventListener("change", changeMedia);
    queryTablet.addEventListener("change", changeMedia);
    queryLaptop.addEventListener("change", changeMedia);

    return () => {
      queryMovil.removeEventListener("change", changeMedia);
      queryTablet.removeEventListener("change", changeMedia);
      queryLaptop.removeEventListener("change", changeMedia);
    };
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


  const handleScroll = (id: string) => {
    const section = document.getElementById(id)
    if (section) section.scrollIntoView({ behavior: 'smooth' })
  }

  // const filtroPromocion = contenedorProyectos.filter(proyecto => proyecto.promocion)


  return (
    <>
      {/**barra de navegación */}
      <section
        aria-labelledby="name-page"
        className="relative"
      >
        {!modalBanner ?
          <div className="container max-w-full fixed top-0 left-0 z-50 bg-neutral-900/95 border-b border-b-neutral-800">
            <div className="w-full min-h-16 xl:w-11/12 flex flex-row justify-between items-center">
              <h1
                id="name-page"
                className="pl-10 md:pl-30">
                <a href="inicio">
                  <img
                    src="public/img/ferducha-logo-transparent.png"
                    alt="imagen del logo"
                    className="w-34 h-8" />
                </a>
              </h1>
              <div className={`${mediaScreen === 'laptop' ? 'flex-1' : ''} flex justify-center`}>
                {mediaScreen === 'laptop' ? <nav className="flex flex-row gap-8 items-center">
                  {enlacesNav.map(enlace => (
                    <motion.button
                      key={enlace.nombre}
                      className="relative font-light text-xl text-neutral-200 cursor-pointer tracking-tighter rounded-2xl transition-all duration-200 ease-linear underline-hover"
                      onClick={() => handleScroll(enlace.path)}
                    >
                      {enlace.nombre}
                    </motion.button>
                  )
                  )}
                </nav> :
                  <div className='flex flex-col '>
                    <button
                      type='button'
                      onClick={changeModalNav}
                      className='md:w-35 pt-2 mb-1 text-right pr-5 text-neutral-700 text-xs font-bold underline underline-offset-3 pb-1 z-50'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-neutral-200 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {!modalNav ? '' : <motion.nav
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 350 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                        className='absolute top-18 right-0 w-full md:max-w-1/2 min-h-72 p-10 bg-neutral-900/95 flex flex-col gap-1 items-end rounded-bl-md z-90 overflow-x-hidden'>
                        {enlacesNav.map(enlace => (
                          <motion.div
                            key={enlace.nombre}
                            initial={{ x: 0 }}
                            whileHover={{ x: -10 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className='font-semibold text-md cursor-pointer overflow-x-hidden'>
                            <a
                              href={`#${enlace.path}`}
                              className="text-white hover:text-amber-200 transition-all linear duration-500"
                            >{enlace.nombre}</a>
                          </motion.div>
                        )
                        )}
                      </motion.nav>}
                    </AnimatePresence>
                  </div>}
              </div>
            </div>
          </div> : null}
      </section>

      <section
        className="bg-gradient-to-l from-neutral-50 to-neutral-300"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 70, damping: 20, mass: 2.5 }}
          className="container py-30 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Diseño */}
          <div className="flex flex-col h-fit p-4 hover:translate-y-5 transition-all duration-150 ease-linear">
            <div className="mb-8 pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="none" stroke="#D97706" strokeWidth="6" viewBox="0 0 256 256"><path d="M64,236a12,12,0,1,1-12-12A12,12,0,0,1,64,236Zm20-44a12,12,0,1,0,12,12A12,12,0,0,0,84,192Zm-64,0a12,12,0,1,0,12,12A12,12,0,0,0,20,192Zm32-32a12,12,0,1,0,12,12A12,12,0,0,0,52,160ZM256,40a8,8,0,0,1-8,8H219.31L191.46,75.86,169.8,202.65a16,16,0,0,1-27.09,8.66l-98-98a16,16,0,0,1,8.69-27.1L180.14,64.54l30.2-30.2A8,8,0,0,1,216,32h32A8,8,0,0,1,256,40ZM174.21,81.79,56,102l98,98Z"></path></svg>
            </div>
            <h4 className="text-4xl text-neutral-800 font-bold tracking-tight pb-2 xl:pr-8">Diseño Personalizado</h4>
            <p className="text-lg text-neutral-500 tracking-tight py-2">
              Transformamos tu baño en un espacio único. Tu diseño, tal como lo imaginaste.
            </p>
          </div>

          {/* Calidad */}
          <div className="flex flex-col h-fit p-4 hover:translate-y-5 transition-all duration-200 ease-linear">
            <div className="mb-8 pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="none" stroke="#D97706" strokeWidth="6" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-109.66a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L128,140.69l34.34-34.35A8,8,0,0,1,173.66,106.34Z"></path></svg>
            </div>
            <h4 className="text-4xl text-neutral-700 font-bold tracking-tight pb-2 xl:pr-8">Calidad Garantizada</h4>
            <p className="text-lg text-neutral-500 tracking-tight py-2">
              Materiales resistentes y duraderos. Acabados cuidados al detalle. Calidad que perdura en el tiempo.
            </p>
          </div>

          {/* Montaje */}
          <div className="flex flex-col h-fit p-4 hover:translate-y-5 transition-all duration-200 ease-linear">
            <div className="mb-8 pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="none" stroke="#D97706" strokeWidth="6" viewBox="0 0 256 256"><path d="M226.76,69a8,8,0,0,0-12.84-2.88l-40.3,37.19-17.23-3.7-3.7-17.23,37.19-40.3A8,8,0,0,0,187,29.24,72,72,0,0,0,88,96,72.34,72.34,0,0,0,94,124.94L33.79,177c-.15.12-.29.26-.43.39a32,32,0,0,0,45.26,45.26c.13-.13.27-.28.39-.42L131.06,162A72,72,0,0,0,232,96,71.56,71.56,0,0,0,226.76,69ZM160,152a56.14,56.14,0,0,1-27.07-7,8,8,0,0,0-9.92,1.77L67.11,211.51a16,16,0,0,1-22.62-22.62L109.18,133a8,8,0,0,0,1.77-9.93,56,56,0,0,1,58.36-82.31l-31.2,33.81a8,8,0,0,0-1.94,7.1L141.83,108a8,8,0,0,0,6.14,6.14l26.35,5.66a8,8,0,0,0,7.1-1.94l33.81-31.2A56.06,56.06,0,0,1,160,152Z"></path></svg>
            </div>
            <h4 className="text-4xl text-neutral-800 font-bold tracking-tight pb-2 xl:pr-8">Servicio de Montaje</h4>
            <p className="text-lg text-neutral-500 tracking-tight py-2">
              Instaladores profesionales. Montaje preciso y sin complicaciones. Tú solo disfrutas el resultado final.
            </p>
          </div>

          {/* Entregas */}
          <div className="flex flex-col h-fit p-4 hover:translate-y-5 transition-all duration-200 ease-linear">
            <div className="mb-8 pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="none" stroke="#D97706" strokeWidth="6" viewBox="0 0 256 256"><path d="M255.42,117l-14-35A15.93,15.93,0,0,0,226.58,72H192V64a8,8,0,0,0-8-8H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H49a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,255.42,117ZM192,88h34.58l9.6,24H192ZM32,72H176v64H32ZM80,208a16,16,0,1,1,16-16A16,16,0,0,1,80,208Zm81-24H111a32,32,0,0,0-62,0H32V152H176v12.31A32.11,32.11,0,0,0,161,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,192,208Zm48-24H223a32.06,32.06,0,0,0-31-24V128h48Z"></path></svg>
            </div>
            <h4 className="text-4xl text-neutral-700 font-bold tracking-tight pb-2 xl:pr-8">Servicio de Entregas</h4>
            <p className="text-lg text-neutral-500 tracking-tight py-2">
              Disponibilidad inmediata en muchos productos. Entregas sin retrasos. Envíos rápidos 24/48h.
            </p>
          </div>
        </motion.div>
      </section>
      {/**seccion tokyo */}
      <section aria-labelledby="section-renueva"
        className="w-full bg-gradient-to-b from-amber-900/10 to-amber-900/20"
      >
        <div className="container py-30 mx-auto">
          <h2
            id="section-renueva"
            className="text-5xl text-neutral-700 tracking-tighter"><span className="text-6xl font-semibold">Renueva</span> tú baño con
            <span className="text-neutral-800/40 text-6xl font-bold"> estilo</span></h2>
          <p className="lg:w-1/2 text-xl text-neutral-600 py-2 pl-1">Descubre nuestra gama <span className="text-3xl font-bold text-neutral-900/50">Tokyo </span>con un <span className="font-bold text-neutral-800">30%</span> de descuento en todos sus modelos</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 gap-6 h-[auto]">
            {contenedorMamparas.map((articulo, index) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1, delay: 0.5 * index * 0.5, ease: 'easeInOut' }}
                key={articulo.id}
                className="flex flex-col bg-neutral-50 shadow-neutral-800 shadow-2xl cursor-pointer hover:bg-neutral-200 hover:translate-y-3
                transition-all duration-300 ease-linear"
                onClick={() => handleScroll('inicio')}
              >

                {/* Contenedor con altura consistente */}
                <div
                  className="w-full h-100">
                  <img
                    src={articulo.imagen}
                    alt={`Imagen de la mampara ${articulo.titulo}`}
                    className="w-full h-full object-center overflow-hidden"
                  />
                </div>

                <h3
                  className="text-2xl text-neutral-900 text-center font-serif py-2 bg-amber-900/4">{articulo.titulo}</h3>
                <p className="flex flex-row gap-2 text-lg text-neutral-600 justify-center items-start font-serif py-3 px-2">
                  {articulo.descripcion}
                 
                </p>
                <div>
                  <button className="flex justify-center items-center w-full text-neutral-600 font-bold pb-2 ">Más detalles<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#888888" viewBox="0 0 256 256"><path d="M224,216a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,216ZM80,176a8,8,0,0,0,5.66-2.34L184,75.31V152a8,8,0,0,0,16,0V56a8,8,0,0,0-8-8H96a8,8,0,0,0,0,16h76.69L74.34,162.34A8,8,0,0,0,80,176Z"></path></svg></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/**seccion de los cursos*/}
      <section aria-labelledby="platos"
        id="platos"
        className="bg-gradient-to-l from-neutral-50 to-neutral-200"
      >
        <div className="container py-30 mx-auto">
          <h2
            id="section-renueva"
            className="text-5xl text-neutral-700 tracking-tighter"><span className="text-6xl font-semibold">Platos de ducha</span> en diferentes <br />medidas y
            <span className="text-neutral-800/40 text-6xl font-bold"> acabados</span></h2>
          <p className="lg:w-1/2 text-xl text-neutral-600 py-2 pl-1"><span className="text-2xl font-bold">Nuestros platos de ducha</span> combinan funcionalidad y diseño, adaptándose a cualquier baño sin renunciar al estilo</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 gap-6 h-[auto]">
            {contenedorPlatos.map((plato, index) => {
              return <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1, delay: 0.5 * index * 0.5, ease: 'easeInOut' }}
                key={plato.id}
                className="flex flex-col bg-neutral-50 shadow-neutral-600 shadow-2xl cursor-pointer hover:bg-neutral-200 hover:translate-y-3
                transition-all duration-300 ease-linear">
                {/* Contenedor con altura consistente */}
                <div className="w-full h-120">
                  <img
                    src={plato.imagen}
                    alt={`Imagen de la mampara ${plato.titulo}`}
                    className="w-full h-full object-center"
                  />
                </div>
                <h3 className="text-2xl text-neutral-black text-center font-serif py-2 bg-neutral-900/20">{plato.titulo}</h3>
                <p className="text-lg text-neutral-600 font-serif py-3 px-8">{plato.descripcion}</p>
                <div>
                  <button className="flex justify-end w-full items-center text-neutral-600 font-bold pb-2 pr-4 ">Más detalles <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#888888" viewBox="0 0 256 256"><path d="M224,216a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,216ZM80,176a8,8,0,0,0,5.66-2.34L184,75.31V152a8,8,0,0,0,16,0V56a8,8,0,0,0-8-8H96a8,8,0,0,0,0,16h76.69L74.34,162.34A8,8,0,0,0,80,176Z"></path></svg></button>
                </div>
              </motion.div>
            }
            )}
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


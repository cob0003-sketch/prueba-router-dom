
import { motion } from 'framer-motion';
import { contenedorProyectos } from '../data/db';
import { useAppStore } from '../stores/useAppStoreCreate'



export default function Header() {

    //State para el banner y filtro para traer el destacado
    const filterBanner = contenedorProyectos.filter(curso => curso.destacado)
    const showBanner = useAppStore(state => state.showBanner)
    const modalBanner = useAppStore(state => state.modalBanner)
    const closeBanner = useAppStore(state => state.closeBanner)
    const closeModalNav = useAppStore(state => state.closeModalNav)

    //función para abrir el modal de la oferta del banner
    const handleBannerOpcion = () => {
        showBanner()
        closeModalNav()
    }

    return (
        <>
            <section
                className='relative overflow-hidden bg-[url(/img/img-header-pruebas.jpg)] bg-no-repeat bg-cover '
                id='inicio'>
                {/**div capa oscura */}
                <div className='w-full absolute top-0 h-full bg-black/50 px-4'></div>
                {/**div container del header */}
                <div className='grid grid-cols-2 mt-22'>
                    {/**div banner */}
                    <div className='relative w-3/4 mx-auto min-h-120 py-5 flex flex-col items-center justify-around'>
                        <motion.h1
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 3, delay: 0.4, ease: 'easeInOut' }}
                            className='text-6xl text-white'>Nombre<span className='block text-2xl text-green-600'>{' '}sub nombre</span></motion.h1>
                        <div className='w-4/5 flex flex-col items-center justify-center gap-5 p-6 bg-black/60 border-2 border-amber-50 rounded-lg shadow-neutral-400 shadow-md'>
                            <motion.p
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 3, delay: 0.4, ease: 'easeInOut' }}
                                className='text-neutral-200 text-center text-xl '>Te ayudamsos a conseguir una solución para tú negocio, visita nuestros ultimos proyectos</motion.p>
                            {/**boton para el banner */}
                            <button
                                type='button'
                                className='w-1/2 p-2 bg-green-600 text-amber-50 text-lg text-shadow-neutral-700 text-shadow-sm
                            font-bold rounded-4xl hover:bg-green-500
                            transition-all linear duration-400'
                                onClick={handleBannerOpcion}>Proyectos</button>
                        </div>
                    </div>
                    {/**div contiene el logo y texto */}
                    <div className='w-4/5 mx-auto flex flex-col justify-center items-center gap-3.5 z-50'>
                        <div className='w-25'>
                            <img src="/img/zaitec-logo-blanco.png" alt="Imagen del logo" />
                        </div>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 3, delay: 0.4, ease: 'easeInOut' }}
                            className='text-white text-5xl text-center'>Desarrollo<span className='text-green-600'> + </span>Innovación</motion.p>
                    </div>
                </div>
                {/**mostramos la oferta en un modal */}
                {modalBanner && (
                    <div className='relative'>
                        {filterBanner.map(curso => (
                            <motion.article
                                key={curso.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 1, delay: 0.3, ease: 'linear' }}
                                className="fixed top-0 left-0 z-100 w-screen h-screen bg-white flex flex-col justify-center"
                            >
                                <div className='flex flex-col items-center gap-8 '>
                                    <a
                                        href={`${curso.enlace}`}
                                        target="blank"
                                        className='w-4/5 mx-auto grid grid-cols-2 gap-10'

                                    >
                                        <div className="overflow-hidden">
                                            <img
                                                src={`${curso.imagen}`}
                                                alt={`Proyecto de ${curso.titulo}`}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3 pt-2">
                                            <p className="text-sm">{curso.fecha}</p>
                                            <h3 className="text-xl md:text-3xl lg:text-4xl text-neutral-800 tracking-wide text-shadow-sm text-shadow-violet-200 underline underline-offset-5">{curso.titulo}</h3>
                                            <p className="pt-5 font-semibold text-neutral-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, adipisci? Reiciendis tempore ipsam totam, architecto hic cum? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi ad at exercitationem consectetur hic assumenda, adipisci quod incidunt. Reprehenderit exercitationem accusantium earum est? Quod autem maxime, tempora dolore assumenda quibusdam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, dolores! Voluptate, nobis voluptatibus consectetur deserunt quibusdam fugiat repellendus rem accusamus suscipit ut accusantium maxime obcaecati sequi quas! Ipsam, minima accusamus! </p>
                                        </div>
                                    </a>
                                    <button
                                    onClick={closeBanner}
                                    className='text-lg font-bold text-white bg-neutral-700 py-1 px-18 rounded-sm'>Volver a incio</button>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </section>
        </>
    )
}

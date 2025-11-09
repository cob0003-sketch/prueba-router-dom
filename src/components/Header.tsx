
import { motion } from 'framer-motion';
// import { contenedorMamparas } from '../data/db';
import { useAppStore } from '../stores/useAppStoreCreate'


export default function Header() {

    //State para el banner y filtro para traer el destacado
    const showBanner = useAppStore(state => state.showBanner)
    // const modalBanner = useAppStore(state => state.modalBanner)
    // const closeBanner = useAppStore(state => state.closeBanner)
    const closeModalNav = useAppStore(state => state.closeModalNav)

    //función para abrir el modal de la oferta del banner
    const handleBannerOpcion = () => {
        showBanner()
        closeModalNav()
    }

    return (
        <>
            <section
            id='inicio'
                className='bg-gradient-to-r from-neutral-900 to-neutral-600'>
                <div className='container max-w-full px-5 xl:px-14 mt-16 min-h-300 lg:min-h-[auto] mx-auto py-15 flex flex-col-reverse lg:flex-row justify-center gap-10 overflow-hidden'>
                    {/**div container del header */}
                    <div className='lg:flex-1 flex flex-col gap-12 justify-center xl:px-5 overflow-x-hidden'>
                        {/**div banner */}
                        <motion.h1
                            initial={{ opacity: 0, x: 80 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: 'spring', stiffness: 20, damping:16, mass:2 }}
                            className='text-4xl md:text-6xl text-neutral-100 font-bold tracking-tighter '>Comodidad y elegancia en tú dia a dia</motion.h1>
                        <div className='flex flex-col items-center gap-12'>
                            <motion.p
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 40, damping: 16, mass:2, delay:1.2 }}
                                className='text-neutral-200 text-xl md:text-2xl font-light tracking-tighter '><span className='text-orange-400/70 text-4xl font-bold '>Elite Blanco</span><br />Combina materiales de alta resistencia con un acabado antideslizante.
                                Durabilidad, elegancia y seguridad en cada detalle.</motion.p>
                            <div className='w-full flex flex-row justify-start gap-5 '>
                                {/**boton para el banner */}
                                <button
                                    type='button'
                                    className='flex flex-row items-center gap-1 px-12 py-2 bg-neutral-500 text-xl text-white text-shadow-xs text-shadow-neutral-900 font-semibold rounded-md hover:shadow-md hover:bg-neutral-400/90 transition-all duration-200 ease-linear'
                                    onClick={handleBannerOpcion}>Ver detalles
                                    <motion.span
                                        initial={{ x: 0 }}
                                        animate={{ x: 5 }}
                                        transition={{ type: 'spring', stiffness:50, repeat: Infinity, repeatType: 'reverse' }}
                                        className='h-3.5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </motion.span></button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex-1 w-full h-152 bg-[url('/img/elite-blanco-frontal.png')] bg-cover bg-bottom shadow-xl shadow-neutral-900"></div>
                </div>

                {/* *mostramos la oferta en un modal
                {modalBanner && (
                    <>
                        {filterBanner.map(curso => (
                            <motion.article
                                key={curso.id}
                                initial={{ opacity: 0.2 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, ease: 'linear' }}
                                className="fixed inset-0 w-full mx-auto min-h-screen flex flex-col justify-center z-100 bg-white"
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
                                                className="object-cover object-center"
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
                    </>
                )} */}
            </section>
        </>
    )
}

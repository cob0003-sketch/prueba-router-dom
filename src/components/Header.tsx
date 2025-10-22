import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';


export default function Header() {

    const [modalNav, setModalNav] = useState<boolean>(false)

       
    // manejador del state del modal
    const isModalOpen = () => {
        setModalNav(prev => !prev)
    }
    // array de enlaces
    const enlacesNav = [
        {
            nombre: 'Inicio',
            path: '/'
        },
        {
            nombre: 'Contacto',
            path: '/contacto'
        },
        {
            nombre: 'Desarrollo',
            path: '/desarrollo'
        },
        {
            nombre: 'Formación',
            path: '/formacion'
        },

    ]

    return (
        <>
            <section className='relative'>
                <div className='fixed flex flex-row justify-between items-start w-full bg-neutral-100/95 py-2 z-100 top-0 left-0'>
                    <h1 className='flex-1 text-5xl p-2 pb-4 text-neutral-200 font-semi-bold text-shadow-md text-shadow-neutral-600'>Logo<span className='text-lg text-green-500'>{' '}SubTitulo</span></h1>
                    <div className='flex flex-col  '>
                        <button
                            type='button'
                            onClick={isModalOpen}
                            className='w-35 pt-2 mb-1 text-right pr-5 text-green-700 text-xs font-bold underline underline-offset-3 pb-1 z-50'>Menú</button>
                        {!modalNav ? '' : <nav
                            className='absolute top-10 right-3 p-2 bg-black/70 flex flex-col gap-1 items-end w-35 px-7 rounded-xl z-90'>
                            {enlacesNav.map(enlace => (
                                <motion.div
                                    key={enlace.nombre}
                                    initial={{ x: 0 }}
                                    whileHover={{ x: -7 }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    className='font-semibold text-md cursor-pointer'>
                                    <NavLink
                                        to={enlace.path}
                                        className={({ isActive }) => (isActive ? 'text-green-500 font-semibold' : 'text-neutral-100')}
                                    >{enlace.nombre}</NavLink>
                                </motion.div>
                            ))}
                        </nav>}
                    </div>
                </div>


                <div className='grid grid-cols-2 mt-22'>
                    <div className='relative min-h-110 bg-neutral-900 flex flex-col items-center justify-center gap-15'>
                        <motion.p
                            initial={{ opacity: 0, x: 60}}
                            animate={{ opacity: 1, x: 0}}
                            transition={{ duration: 3, delay: 0.4, ease: 'easeInOut' }}
                            className='text-neutral-200 px-6 text-center text-7xl'>Parrafo para poner información relevante</motion.p>

                        <button className='w-1/2 p-2 bg-green-600 text-amber-50 text-lg text-shadow-neutral-700 text-shadow-sm font-bold rounded-4xl'>Click a destacar</button>
                    </div>

                    <div className='bg-[url(/img/img-header-pruebas.jpg)] bg-no-repeat bg-cover w-full min-h-110'>
                        <div className='absolute top-0 w-full h-full bg-black/30 px-4 z-10'>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

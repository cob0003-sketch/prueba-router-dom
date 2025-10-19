import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';


export default function Header() {

    const [deviceType, setDeviceType] = useState<"movil" | "tablet" | "laptop">("laptop")
    const [modalNav, setModalNav] = useState<boolean>(false)

    useEffect(() => {
        // crear media querys
        const movilQuery = window.matchMedia("(max-width: 639px)");
        const tabletQuery = window.matchMedia("(min-width: 640px) and (max-width: 1023px)");
        const laptopQuery = window.matchMedia("(min-width: 1024px) and (max-width: 1440px)");

        //crear funcion para actualizar el estado
        const updateState = () => {
            setDeviceType(
                movilQuery.matches ? "movil"
                    : tabletQuery.matches ? "tablet"
                        : "laptop"

            )
        }
        //llamar a la función que actualiza el estado
        updateState()

        // crear los eventos
        movilQuery.addEventListener("change", updateState)
        tabletQuery.addEventListener("change", updateState)
        laptopQuery.addEventListener("change", updateState)

        // eleimainar los eventos una vez se llaman no se vuelvan a llamar
        return () => {
            movilQuery.removeEventListener("change", updateState)
            tabletQuery.removeEventListener("change", updateState)
            laptopQuery.removeEventListener("change", updateState)
        }
    }, [])

    const isModalOpen = () => {
        setModalNav(prev => !prev)
    }

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
            {/*Header para pantallas desde 1029px */}
            {deviceType === 'laptop' && (
                <div
                    className='
            relative
            flex flex-row justify-center gap-2 
            bg-[url(/img/img-header-pruebas.jpg)] bg-no-repeat bg-cover bg-top min-h-120'>
                    <h1 className='flex-1 text-8xl p-5 text-neutral-200 font-bold text-shadow-lg text-shadow-black z-10'>Forma<span className='text-5xl p-5 text-green-500'>Innova</span></h1>
                    <motion.nav
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
                        className='flex flex-col w-50 p-5 h-120 justify-end items-end gap-1 z-10'>
                        {/* <div>
                        <p className='text-white'>Menú</p>
                    </div> */}

                        {enlacesNav.map(enlace => (
                            <motion.div
                                key={enlace.nombre}
                                initial={{ x: 0 }}
                                whileHover={{ x: -10 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className='font-semibold bg-green-600 px-8 py-1 w-fit text-lg text-center rounded-l-lg'>
                                <NavLink
                                    to={enlace.path}
                                    className={({ isActive }) => (isActive ? 'text-neutral-900 font-bold' : 'text-neutral-100')}
                                >{enlace.nombre}</NavLink>
                            </motion.div>
                        ))}
                    </motion.nav>
                    <div className='absolute w-full h-full bg-black/50 px-4'>
                        <motion.p
                            initial={{ opacity: 0, rotateX: 50 }}
                            animate={{ opacity: 1, rotateX: 0 }}
                            transition={{ duration: 2, delay: 0.5, ease: 'linear' }}
                            className='text-neutral-100 z-10  pt-50 text-center text-6xl'>Soluciones tecnicas para particulares y empresas</motion.p>
                    </div>
                </div>
            )}

            {deviceType === 'tablet' && (
                <div
                    className='relative bg-[url(/img/img-header-pruebas.jpg)] bg-no-repeat bg-cover bg-top min-h-90'>
                    <h1 className='relative text-7xl pt-10 text-neutral-200 text-center font-bold text-shadow-lg text-shadow-black z-50'>Forma<span className='text-4xl p-5 text-green-500'>Innova</span></h1>
                    <div className='absolute top-0 w-full h-full bg-black/50 px-4 z-10'>
                        <motion.p
                            initial={{ opacity: 0, rotateX: 50 }}
                            animate={{ opacity: 1, rotateX: 0 }}
                            transition={{ duration: 2, delay: 0.5, ease: 'linear' }}
                            className='text-neutral-100 pt-40 text-center text-5xl'>Soluciones tecnicas para particulares y empresas</motion.p>
                    </div>

                    <div className='absolute top-0 right-0 z-50 flex flex-col items-end '>
                        <button
                            type='button'
                            onClick={isModalOpen}
                            className='w-35 pl-11 pt-2 mb-1 text-white text-xs underline underline-offset-3 pb-1 z-50'>Menú</button>
                        {!modalNav ? '' : <nav
                            className=' bg-black/70 flex flex-col gap-1 items-end w-35 px-7  rounded-xl'>
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
            )}
            {deviceType === 'movil' && (
                <div
                    className='relative bg-[url(/img/img-header-pruebas.jpg)] bg-no-repeat bg-cover bg-top min-h-90'>
                    <h1 className='relative text-6xl pt-10 text-neutral-200 text-center font-bold text-shadow-lg text-shadow-black z-50'>Forma<span className='text-4xl p-5 text-green-500'>Innova</span></h1>
                    <div className='absolute top-0 w-full h-full bg-black/50 px-4 z-10'>
                        <motion.p
                            initial={{ opacity: 0, rotateX: 50 }}
                            animate={{ opacity: 1, rotateX: 0 }}
                            transition={{ duration: 2, delay: 0.5, ease: 'linear' }}
                            className='text-neutral-100 pt-40 text-center text-4xl'>Soluciones tecnicas para particulares y empresas</motion.p>
                    </div>


                    <div className='absolute top-0 right-0 z-50 flex flex-col items-end '>
                        <button
                            type='button'
                            onClick={isModalOpen}
                            className='w-35 pl-11 pt-2 mb-1 text-white text-xs underline underline-offset-3 pb-1 z-50'>Menú</button>
                        {!modalNav ? '' : <nav
                            className=' bg-black/70 flex flex-col gap-1 items-end w-35 px-7  rounded-xl'>
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
            )}
        </>
    )
}

import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useState } from 'react';


export type FormStateType = {
    nombre: string
    apellido1: string
    apellido2: string
    email: string
    telefono: string
    fecha: string
    comentario?: string
}

export const initialFormState = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
    telefono: '',
    fecha: '',
    comentario: ''
}


export default function Layout() {
    const [formState, setFormState] = useState<FormStateType>(initialFormState)
  

    return (
        <>
            <Header
             />
            <main>
                <Outlet
                    context={{ formState, setFormState }} />
            </main>
        </>
    )
}

import { useEffect, useState, useRef } from "react"
import { useOutletContext } from "react-router-dom"
import type { FormStateType } from "../layouts/Layout"
import { Form, useActionData } from 'react-router-dom'
import type { ActionFunctionArgs } from "react-router-dom"
import { initialFormState } from "../layouts/Layout"
import { useFormStore } from "../stores/useFormStoreCreate"

//props del context layout
export type LayoutContextTypeProps = {
  formState: FormStateType,
  setFormState: React.Dispatch<React.SetStateAction<FormStateType>>
}

export type ErrorForm = {
  nombre?: string,
  apellido1?: string,
  apellido2?: string,
  email?: string,
  telefono?: string,
  fecha?: string,
}

// action que maneja la repuesta del formulario
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData.entries()) as FormStateType

  const formatDataForm = { ...data }

  console.log(formatDataForm)
  return { success: true }
}

export default function Contacto() {
  //States
  const { formState, setFormState } = useOutletContext<LayoutContextTypeProps>()
  const [errorForm, setErrorForm] = useState<ErrorForm>({} as ErrorForm)
  const formRef = useRef<HTMLFormElement | null>(null);
  const actionData = useActionData() as { success?: boolean } | null;
  const addLoginUsuarios = useFormStore(state => state.addLoginUsuarios)

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

  //envio del formulario
  useEffect(() => {
    if (actionData?.success) {
      addLoginUsuarios(formState)
      setFormState(initialFormState);
      setErrorForm({});
      formRef.current?.reset();
    } else {
      console.log('fallo en el envio')
    }
  }, [actionData])


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

  return (
    <>
      <section className="relative">
        <div className="flex flex-col gap-3 w-1/2 mx-auto my-15 ">
          <h2 className="text-3xl text-neutral-700 font-semibold h-50 bg-[url(/img/contacto.jpg)] bg-center bg-cover">Formulario de contacto</h2>
          <p className="w-2/3">Rellena los campos del formulario para que podamos contactar contigo lo antes posible.</p>
          <div className="w-full">
            <Form
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
            </Form>
          </div>
        </div>
      </section>
    </>
  )
}

import { createBrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"
import IndexPage from "./views/IndexPage"
import Contacto from "./views/ContactoPage"
import Formacion from "./views/FormacionPage"
import Desarrollo from "./views/DesarrolloPage"
import {action as actionDataForm } from './views/ContactoPage'

export const routerApp = createBrowserRouter( 

    [
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    index: true,
                    element:<IndexPage/>
                }, 
                {
                    path:'contacto',
                    element: <Contacto />,
                    action: actionDataForm
                },
                  {
                    path:'formacion',
                    element: <Formacion />
                },
                  {
                    path:'desarrollo',
                    element: <Desarrollo />
                }
            ]
        }
    ]
)
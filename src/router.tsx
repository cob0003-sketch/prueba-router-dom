import { createBrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"
import IndexPage from "./views/IndexPage"

import Desarrollo from "./views/DesarrolloPage"
import {action as actionDataForm } from './views/IndexPage'

export const routerApp = createBrowserRouter( 

    [
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    index: true,
                    element:<IndexPage/>,
                    action: actionDataForm
                },
                  {
                    path:'desarrollo',
                    element: <Desarrollo />
                }
            ]
        }
    ]
)

import { createHashRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import IndexPage, { action as actionDataForm } from './views/IndexPage'
import Desarrollo from './views/DesarrolloPage'

export const routerApp = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
        action: actionDataForm
      },
      {
        path: 'desarrollo',
        element: <Desarrollo />
      }
    ]
  }
])
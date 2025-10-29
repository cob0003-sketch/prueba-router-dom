
import { createHashRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Desarrollo from './views/DesarrolloPage'
import IndexPage from './views/IndexPage'

export const routerApp = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <IndexPage />
      },
      {
        path: 'desarrollo',
        element: <Desarrollo />
      }
    ]
  }
])
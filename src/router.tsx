import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import Layout from './layouts/Layout'
import IndexPage, { action as actionDataForm } from './views/IndexPage'
import Desarrollo from './views/DesarrolloPage'

const routes = [
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
]

export function AppRouter() {
  const element = useRoutes(routes)
  return element
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, useRoutes } from 'react-router-dom'
import { routes } from './router'

function AppRouter() {
  return useRoutes(routes)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </StrictMode>
)


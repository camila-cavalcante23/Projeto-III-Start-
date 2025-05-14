import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./pages/Home/Home.jsx"
import QuemSomos from "./pages/QuemSomos/QuemSomos.jsx"
import Noticias from "./pages/Noticias/Noticias.jsx"
import GerminarPage from "./pages/Germinar/GerminarPage.jsx"
import Apoiadores from "./pages/Apoiadores/Apoiadores.jsx"
import RedesSociais from './pages/RedesSociais/RedesSociais.jsx'
import Galeria from './pages/Galeria/Galeria.jsx'
import NewsForm from './admin/NewsForm/NewsForm.jsx'
import Login from './pages/Login/Login.jsx'
import Eventos from './pages/Eventos/Eventos.jsx'
import DetalhesEvento from "./pages/Eventos/DetalhesEvento.jsx";
import Inscricao from './admin/inscricaoEvento/inscricao.jsx';
import GaleriaForm from './admin/GaleriaForm/GaleriaForm.jsx';
import NewsDetail from './pages/NewsDetail/NewsDetail.jsx'
import Register from './pages/Register/Register.jsx'
import Perfil from './pages/Perfil/Perfil.jsx'
import EditarPerfil from './pages/Perfil/EditarPerfil.jsx'
import NewList from './pages/NewsList/NewsList.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "quem-somos",
        element: <QuemSomos/>,
      },
      {
        path: "noticias",
        element: <Noticias/>,
      },
      {
        path: "germinar-page",
        element: <GerminarPage />
      },

      {
        path: "perfil",
        element: <Perfil/>,
      },
    
      {
        path: "editar-perfil",
        element: <EditarPerfil/>,
      },

      
      {
        path: "apoiadores",
        element: <Apoiadores/>,
      },
      {
      path: "redesSociais",
      element: <RedesSociais/>,
      },
      {
      path: "galeria",
      element: <Galeria/>,
      },
      {
        path: "news-form",
        element: <NewsForm/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "eventos",
        element: <Eventos/>
      },

      {
        path: "detalhesevento", 
        element: <DetalhesEvento/>
      },
      {
        path: "inscricaoevento",
        element: <Inscricao/>
      },
      {
        path: "noticia/:id",
        element: <NewsDetail/>
      },
      { 
        path: "register",
        element: <Register/>
      },
      {
        path: "galeria-form",
        element: <GaleriaForm/>,
      },
      {
        path: "New-list",
        element: <NewList/>,
      },
    ]
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

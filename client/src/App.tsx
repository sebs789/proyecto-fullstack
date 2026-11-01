import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Boton } from './components/Boton'
import { RutaProtegida } from './components/RutaProtegida'
import { AuthProvider } from './context/AuthProvider'
import { Mainheader } from './layouts/Mainheader'
import { Admin } from './pages/Admin'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Registro } from './pages/Registro'

const NoEncontrada = () => (
  <main className="max-w-3xl mx-auto px-6 py-24 text-center">
    <h1 className="font-heading text-4xl font-bold mb-4">Página no encontrada</h1>
    <p className="text-arcilla mb-8">La dirección que escribiste no existe.</p>
    <Boton href="/">Volver al inicio</Boton>
  </main>
)

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Mainheader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          {/* Las rutas dentro de RutaProtegida exigen haber iniciado sesión */}
          <Route element={<RutaProtegida />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

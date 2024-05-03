import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListarTareas from "./components/ListarTareas";
import FormularioTareas from "./components/FormularioTareas";
import Navbar from './components/Navbar';
import { Container } from "@mui/material";

/**
 * Componente App:
 * Este componente define la estructura de la aplicación y gestiona las rutas.
 */
export default function App() {
  return (
    <BrowserRouter>
      {/* Componente de barra de navegación */}
      <Navbar />

      {/* Contenedor principal de la aplicación */}
      <Container>
        {/* Definición de rutas */}
        <Routes>
          {/* Ruta para listar tareas */}
          <Route path="/" element={<ListarTareas />} />

          {/* Ruta para crear nueva tarea */}
          <Route path="/tasks/new" element={<FormularioTareas />} />

          {/* Ruta para editar tarea existente */}
          <Route path="/tasks/:id/edit" element={<FormularioTareas />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";

/**
 * Componente FormularioTareas:
 * Este componente renderiza un formulario para la creación o edición de tareas.
 */
export default function FormularioTareas() {
  // Estado para almacenar los datos de la tarea (titulo y descripción)
  const [tarea, setTarea] = useState({
    titulo: "",
    descripcion: "",
  });

  // Estados para controlar el estado de carga y edición del formulario
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  // Hook de navegación y parámetros de la URL proporcionados por react-router-dom
  const navigate = useNavigate();
  const params = useParams();

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Indicar que se está cargando
    setLoading(true);

    // Realizar la solicitud HTTP según si se está editando o creando una tarea
    if (editing) {
      await fetch(`http://localhost:3001/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(tarea),
        headers: { "Content-Type": "application/json" },
      });
    } else {
      await fetch("http://localhost:3001/tasks", {
        method: "POST",
        body: JSON.stringify(tarea),
        headers: { "Content-Type": "application/json" },
      });
    }

    // Indicar que la carga ha finalizado y redirigir a la página principal
    setLoading(false);
    navigate("/");
  };

  // Manejador de cambios en los campos del formulario
  const handleChange = (e) =>
    setTarea({ ...tarea, [e.target.name]: e.target.value });

  // Función para cargar los datos de una tarea existente al editar
  const cargarTarea = async (id) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`);
    const data = await res.json();
    setTarea({ titulo: data.titulo, descripcion: data.descripcion });
    setEditing(true);
  };

  // Efecto para cargar los datos de la tarea cuando el ID cambia en la URL
  useEffect(() => {
    if (params.id) {
      cargarTarea(params.id);
    }
  }, [params.id]);

  // Renderización del componente
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyItems="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{ backgroundColor: "#348e91", padding: "1rem" }}
        >
          <Typography variant="5" textAlign="center" color="white">
            {editing ? "Editar tarea" : "Crear tarea"}
          </Typography>

          <CardContent>
            {/* Formulario de entrada */}
            <form onSubmit={handleSubmit}>
              {/* Campo de entrada para el título de la tarea */}
              <TextField
                variant="filled"
                label="Escribe el titulo"
                sx={{ display: "block", margin: ".5rem" }}
                name="titulo"
                value={tarea.titulo}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              {/* Campo de entrada para la descripción de la tarea */}
              <TextField
                variant="filled"
                label="Escribe la descripción"
                multiline
                rows={4}
                sx={{ display: "block", margin: ".5rem" }}
                name="descripcion"
                value={tarea.descripcion}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              {/* Botón para guardar la tarea */}
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                type="submit"
                disabled={!tarea.titulo || !tarea.descripcion}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Guardar tarea"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

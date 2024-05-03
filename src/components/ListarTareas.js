import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * Componente ListarTareas:
 * Este componente muestra una lista de tareas con opciones de edición y eliminación.
 */
export default function ListarTareas() {
  // Estado para almacenar la lista de tareas
  const [tareas, setTareas] = useState([]);

  // Estado para controlar la visibilidad de la alerta
  const [alertaVisible, setAlertaVisible] = useState(false);

  // Hook de navegación proporcionado por react-router-dom
  const navigate = useNavigate();

  // Función para cargar las tareas desde la API
  const cargarTareas = async () => {
    const res = await fetch('http://localhost:3001/tasks');
    const data = await res.json();
    setTareas(data);
  };

  // Función para manejar la eliminación de una tarea
  const handleDelete = async (id) => {
    try {
      // Solicitud HTTP para eliminar la tarea
      const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'DELETE',
      });

      // Actualizar el estado de las tareas filtrando la tarea eliminada
      setTareas(tareas.filter((tarea) => tarea.idtarea !== id));

      // Mostrar la alerta de eliminación exitosa
      mostrarAlerta();
    } catch (error) {
      console.log(error);
    }
  };

  // Función para mostrar la alerta
  const mostrarAlerta = () => {
    setAlertaVisible(true);
  };

  // Efecto para cargar las tareas al montar el componente
  useEffect(() => {
    cargarTareas();
  }, []);

  // Renderización del componente
  return (
    <>
      <h1>Lista de tareas</h1>
      {/* Mapear cada tarea a un componente Card */}
      {tareas.map((tarea) => (
        <Card
          style={{
            marginBottom: '.9rem',
            backgroundColor: '#348e91',
          }}
          key={tarea.idtarea}
        >
          {/* Contenido de cada Card */}
          <CardContent
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {/* Sección izquierda con el título y descripción de la tarea */}
            <div style={{ color: 'white' }}>
              <Typography>{tarea.titulo}</Typography>
              <Typography>{tarea.descripcion}</Typography>
            </div>

            {/* Sección derecha con botones de edición y eliminación */}
            <div>
              {/* Botón de edición */}
              <Button
                variant="contained"
                endIcon={<Edit />}
                color="primary"
                onClick={() => navigate(`/tasks/${tarea.idtarea}/edit`)}
              >
                Editar
              </Button>

              {/* Botón de eliminación con tooltip */}
              <Tooltip title="Eliminar" placement="right">
                <IconButton
                  sx={{ color: '#eb0502' }}
                  size="large"
                  onClick={() => handleDelete(tarea.idtarea)}
                  style={{
                    marginLeft: '.7rem',
                  }}
                >
                  <Delete fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Snackbar para mostrar la alerta de eliminación exitosa */}
      <Snackbar
        open={alertaVisible}
        autoHideDuration={5000}
        onClose={() => setAlertaVisible(false)}
        message="Eliminado con éxito"
      />
    </>
  );
}

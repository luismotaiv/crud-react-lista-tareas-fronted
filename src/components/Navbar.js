import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { Link, useNavigate } from "react-router-dom";

/**
 * Componente Navbar:
 * Este componente representa la barra de navegación superior.
 */
export default function Navbar() {
  // Hook de navegación proporcionado por react-router-dom
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Barra de aplicación (AppBar) */}
      <AppBar position="static" color="transparent">
        <Container>
          {/* Barra de herramientas (Toolbar) dentro de un contenedor */}
          <Toolbar>
            {/* Título de la barra de navegación */}
            <Typography variant='h5' sx={{ flexGrow: 1 }}>
              {/* Enlace a la página principal con estilo personalizado */}
              <Link to="/" style={{textDecoration:'none', color: '#ffff00'}}> CRUD TAREAS </Link>
            </Typography>

            {/* Botón para crear una nueva tarea */}
            <Button
              variant="contained"
              color="success"
              endIcon={<AddCircleOutline />}
              onClick={() => navigate("/tasks/new")}
            >
              Crear tarea
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

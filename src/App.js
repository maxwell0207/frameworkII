import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import ListarProdutos from './pages/ListarProdutos';
import AdicionarProduto from './pages/AdicionarProduto';
import EditarProduto from './pages/EditarProduto';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Catálogo de Produtos
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Listar Produtos
          </Button>
          <Button color="inherit" component={Link} to="/adicionar">
            Adicionar Produto
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<ListarProdutos />} />
          <Route path="/adicionar" element={<AdicionarProduto />} />
          <Route path="/editar/:id" element={<EditarProduto />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

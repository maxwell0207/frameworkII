import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListarProdutos from './pages/ListarProdutos';
import AdicionarProduto from './pages/AdicionarProduto';
import EditarProduto from './pages/EditarProduto';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Listar Produtos</Link> | <Link to="/adicionar">Adicionar Produto</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ListarProdutos />} />
        <Route path="/adicionar" element={<AdicionarProduto />} />
        <Route path="/editar/:id" element={<EditarProduto />} />
      </Routes>
    </Router>
  );
}

export default App;

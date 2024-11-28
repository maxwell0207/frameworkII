import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const ListarProdutos = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await api.get('/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
      }
    }
    fetchProdutos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/produtos/${id}`);
      alert('Produto excluído com sucesso!');
      setProdutos(produtos.filter((produto) => produto.id !== id));
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao excluir produto.');
    }
  };

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <Link to="/adicionar">Adicionar Produto</Link>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - R${produto.preco}
            <button onClick={() => handleDelete(produto.id)}>Excluir</button>
            <Link to={`/editar/${produto.id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarProdutos;

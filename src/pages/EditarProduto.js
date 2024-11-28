import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const EditarProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState({ nome: '', descricao: '', preco: '' });

  useEffect(() => {
    async function fetchProduto() {
      try {
        const response = await api.get(`/produtos/${id}`);
        setProduto(response.data);
      } catch (error) {
        console.error('Erro ao carregar o produto:', error);
      }
    }
    fetchProduto();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando PUT para:', `/produtos/${produto.id}`, produto);  // Verifique a URL e o produto
      await api.put(`/produtos/${produto.id}`, produto);
      alert('Produto editado com sucesso!');
    } catch (error) {
      console.error('Erro ao editar produto:', error);
      alert('Erro ao editar produto.');
    }
  };
  

  return (
    <div>
      <h1>Editar Produto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={produto.nome}
            onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            value={produto.descricao}
            onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Preço:</label>
          <input
            type="number"
            step="0.01"
            value={produto.preco}
            onChange={(e) => setProduto({ ...produto, preco: e.target.value })}
            required
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditarProduto;

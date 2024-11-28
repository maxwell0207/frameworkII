import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Ajuste o caminho conforme a configuração da sua API

const AdicionarProduto = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const navigate = useNavigate(); // Navegação após o envio

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validação simples
    if (!nome || !descricao || !preco || preco <= 0) {
      alert('Por favor, preencha todos os campos corretamente!');
      return;
    }

    // Preparar dados para envio
    const produto = { nome, descricao, preco };

    // Enviar para a API
    api.post('/produtos', produto)
      .then(() => {
        alert('Produto adicionado com sucesso!');
        navigate('/'); // Redireciona após o sucesso
      })
      .catch((error) => {
        console.error('Erro ao adicionar produto:', error);
        if (error.response) {
          // Se a resposta de erro contiver dados, exibe o erro detalhado
          console.error('Erro detalhado:', error.response.data);
          alert(`Erro ao adicionar produto: ${error.response.data.message || 'Erro desconhecido'}`);
        } else {
          // Caso não haja uma resposta do servidor
          alert('Erro de conexão com o servidor.');
        }
      });
  };

  return (
    <div>
      <h1>Adicionar Produto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Preço:</label>
          <input
            type="number"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default AdicionarProduto;

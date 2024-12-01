import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

const AdicionarProduto = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !descricao || !preco || preco <= 0) {
      alert('Por favor, preencha todos os campos corretamente!');
      return;
    }

    const produto = { nome, descricao, preco };

    api.post('/produtos', produto)
      .then(() => {
        alert('Produto adicionado com sucesso!');
        navigate('/'); // Redireciona após o sucesso
      })
      .catch((error) => {
        console.error('Erro ao adicionar produto:', error);
        if (error.response) {
          alert(`Erro ao adicionar produto: ${error.response.data.message || 'Erro desconhecido'}`);
        } else {
          alert('Erro de conexão com o servidor.');
        }
      });
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Adicionar Produto
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          maxWidth: 500,
          margin: 'auto',
        }}
      >
        <TextField
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Preço"
          type="number"
          step="0.01"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Adicionar
        </Button>
      </Box>
    </Container>
  );
};

export default AdicionarProduto;

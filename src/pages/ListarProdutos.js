import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
} from '@mui/material';

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
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Produtos
      </Typography>
      <Grid container spacing={3}>
        {produtos.map((produto) => (
          <Grid item xs={12} sm={6} md={4} key={produto.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{produto.nome}</Typography>
                <Typography variant="body1" color="text.secondary">
                  Preço: R${produto.preco}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(produto.id)}
                >
                  Excluir
                </Button>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/editar/${produto.id}`}
                >
                  Editar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListarProdutos;

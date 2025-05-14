import request from 'supertest';
import express from 'express';
import searchRoutes from '../src/routes/search.routes.js';
import { esClient } from '../src/config/elastic.js';

// Mock del cliente de Elasticsearch
jest.mock('../config/elastic.js', () => ({
  esClient: {
    search: jest.fn(),
    indices: {
      delete: jest.fn(),
      create: jest.fn()
    },
    bulk: jest.fn()
  }
}));

// app mínima de Express para pruebas
const app = express();
app.use(express.json());
app.use('/search', searchRoutes);
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Error interno del servidor' });
});

describe('GET /search/products', () => {
  beforeEach(() => {
    esClient.search.mockReset();
  });

  it('debe devolver resultados y paginación correcta', async () => {
    // Simular respuesta de ES
    esClient.search.mockResolvedValue({
      body: {
        hits: {
          total: { value: 2 },
          hits: [
            { _source: { id: '1', name: 'A', category: 'X', description: '...' } },
            { _source: { id: '2', name: 'B', category: 'Y', description: '...' } }
          ]
        }
      }
    });

    const res = await request(app)
      .get('/search/products')
      .query({ q: 'test', page: 2, size: 5 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      total: 2,
      page: 2,
      size: 5,
      results: [
        { id: '1', name: 'A', category: 'X', description: '...' },
        { id: '2', name: 'B', category: 'Y', description: '...' }
      ]
    });
  });

  it('debe manejar errores lanzando 500', async () => {
    esClient.search.mockRejectedValue(new Error('fail'));
    const res = await request(app).get('/search/products');
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error', 'Error interno del servidor');
  });
});

describe('GET /search/products/category/:categoria', () => {
  beforeEach(() => {
    esClient.search.mockReset();
  });

  it('debe filtrar por categoría y paginar', async () => {
    esClient.search.mockResolvedValue({
      body: {
        hits: {
          total: { value: 1 },
          hits: [
            { _source: { id: '3', name: 'C', category: 'X', description: '...' } }
          ]
        }
      }
    });

    const res = await request(app)
      .get('/search/products/category/X')
      .query({ page: 1, size: 1 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      total: 1,
      page: 1,
      size: 1,
      results: [
        { id: '3', name: 'C', category: 'X', description: '...' }
      ]
    });
  });
});

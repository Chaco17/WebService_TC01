import express from 'express';
import { esClient } from '../config/elastic.js';

const router = express.Router();

//Búsqueda full-text en name, category y description
router.get('/products', async (req, res, next) => {
  try {
    const q    = req.query.q || '';                   // texto a buscar
    const page = parseInt(req.query.page)  || 1;       // página actual
    const size = parseInt(req.query.size)  || 10;      // resultados por página
    const from = (page - 1) * size;

    const { body } = await esClient.search({
      index: 'products',
      body: {
        query: {
          multi_match: {
            query:    q,
            fields:   ['name^3', 'category', 'description'],
            fuzziness: 'AUTO'
          }
        },
        from,
        size
      }
    });

    const total   = body.hits.total.value;
    const results = body.hits.hits.map(hit => hit._source);

    res.json({ total, page, size, results });
  } catch (err) {
    next(err);
  }
});

//Filtrado por categoría exacta
router.get('/products/category/:categoria', async (req, res, next) => {
  try {
    const categoria = req.params.categoria;
    const page      = parseInt(req.query.page)  || 1;
    const size      = parseInt(req.query.size)  || 10;
    const from      = (page - 1) * size;

    const { body } = await esClient.search({
      index: 'products',
      body: {
        query: {
          term: { category: categoria }
        },
        from,
        size
      }
    });

    const total   = body.hits.total.value;
    const results = body.hits.hits.map(hit => hit._source);

    res.json({ total, page, size, results });
  } catch (err) {
    next(err);
  }
});

// Reindexar productos desde la base de datos
router.post('/reindex', async (req, res, next) => {
  try {
    // 1. Borrar índice si existe
    await esClient.indices.delete({ index: 'products' }).catch(() => {});

    // 2. Crear índice con mappings
    await esClient.indices.create({
      index: 'products',
      body: {
        mappings: {
          properties: {
            name:        { type: 'text' },
            category:    { type: 'keyword' },
            description: { type: 'text' }
          }
        }
      }
    });

    // 3. Bulk insert (ejemplo: obtén productos desde DB)
    const products = await getAllProductsFromDB(); // implementa esta función
    const bodyBulk = products.flatMap(prod => [
      { index: { _index: 'products', _id: prod.id } },
      { 
        name:        prod.name,
        category:    prod.category,
        description: prod.description || 'Producto sin descripción'
      }
    ]);

    const { body: bulkRes } = await esClient.bulk({ refresh: true, body: bodyBulk });
    if (bulkRes.errors) throw new Error('Errores en bulk insert');

    res.json({ reindexed: products.length });
  } catch (err) {
    next(err);
  }
});

export default router;
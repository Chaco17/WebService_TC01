
import request from 'supertest';
import app from '../src/index.js';

let createdPlatoId; // convertir en un plato existente y con datos , este plato se usará ne get, en put y en delete
// crear una variable diferente para que use post sin interferir con las demás rutas
const MENU_ID = 1; // Asegúrate que exista en tu DB

// crear un menú con la estructura para usar con post, inclúyele algunos platos con estructura dentro

describe('Plato routes', () => {

  // ========== POST /menus/:id/platos ==========

  it('should create a plato', async () => {
    const res = await request(app).post(`/menus/${MENU_ID}/platos`).send({
      nombre: 'Pizza Margarita',
      precio: 9.99
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    createdPlatoId = res.body.data.id;
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post(`/menus/${MENU_ID}/platos`).send({});
    expect(res.statusCode).toBe(400);
  });

  it('should return 404 if menu does not exist', async () => {
    const res = await request(app).post('/menus/999999/platos').send({
      nombre: 'Platillo Fantasma',
      precio: 12.99
    });
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if menu ID is invalid', async () => {
    const res = await request(app).post('/menus/abc/platos').send({
      nombre: 'Error Platillo',
      precio: 5
    });
    expect(res.statusCode).toBe(500);
  });

  // ========== GET /platos/:id ==========

  it('should return plato by ID', async () => {
    const res = await request(app).get(`/platos/${createdPlatoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(createdPlatoId);
  });

  it('should return 404 if plato not found', async () => {
    const res = await request(app).get('/platos/999999');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if plato ID is invalid', async () => {
    const res = await request(app).get('/platos/NaN');
    expect(res.statusCode).toBe(500);
  });

  // ========== PUT /platos/:id ==========

  it('should update a plato', async () => {
    const res = await request(app).put(`/platos/${createdPlatoId}`).send({
      nombre: 'Pizza Vegetariana',
      precio: 10.50
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.nombre).toBe('Pizza Vegetariana');
  });

  it('should return 404 if plato not found on update', async () => {
    const res = await request(app).put('/platos/999999').send({
      nombre: 'Fake',
      precio: 1
    });

    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if ID is invalid on update', async () => {
    const res = await request(app).put('/platos/abc').send({
      nombre: 'Error',
      precio: 1
    });

    expect(res.statusCode).toBe(500);
  });

  // ========== DELETE /platos/:id ==========

  it('should delete a plato by ID', async () => {
    const res = await request(app).delete(`/platos/${createdPlatoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminado/i);
  });

  it('should return 404 if plato not found on delete', async () => {
    const res = await request(app).delete('/platos/999999');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if ID is invalid on delete', async () => {
    const res = await request(app).delete('/platos/undefined');
    expect(res.statusCode).toBe(500);
  });

  // ========== GET /menus/:id/platos ==========

  it('should get platos by menu ID', async () => {
    const res = await request(app).get(`/menus/${MENU_ID}/platos`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return 404 if menu not found', async () => {
    const res = await request(app).get('/menus/999999/platos');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if menu ID is invalid', async () => {
    const res = await request(app).get('/menus/NaN/platos');
    expect(res.statusCode).toBe(500);
  });
});
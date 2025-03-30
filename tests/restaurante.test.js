import request from 'supertest';
import app from '../src/index.js';

let createdRestaurantId;

describe('Restaurant routes', () => {

  // ========== POST /restaurants ==========

  it('should create a restaurant', async () => {
    const res = await request(app).post('/restaurants').send({
      nombre: 'Restaurante Prueba',
      direccion: 'Calle 123',
      telefono: '12345678',
      id_administrador: 1
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    createdRestaurantId = res.body.data.id;
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/restaurants').send({
      nombre: 'Faltante'
    });
    expect(res.statusCode).toBe(400);
  });

  it('should return 500 if id_administrador is invalid', async () => {
    const res = await request(app).post('/restaurants').send({
      nombre: 'Invalido',
      direccion: 'Av. Falsa',
      telefono: '99999999',
      id_administrador: 'not-an-id'
    });
    expect([400, 500]).toContain(res.statusCode);
  });

  // ========== GET /restaurants ==========

  it('should return all restaurants', async () => {
    const res = await request(app).get('/restaurants');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // ========== GET /restaurants/:id ==========

  it('should return restaurant by ID', async () => {
    const res = await request(app).get(`/restaurants/${createdRestaurantId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('id', createdRestaurantId);
  });

  it('should return 404 if restaurant does not exist', async () => {
    const res = await request(app).get('/restaurants/999999');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if ID is invalid', async () => {
    const res = await request(app).get('/restaurants/abc');
    expect(res.statusCode).toBe(500);
  });

  it('should return 500 if ID is undefined', async () => {
    const res = await request(app).get('/restaurants/undefined');
    expect(res.statusCode).toBe(500);
  });

  it('should return 500 if ID is NaN', async () => {
    const res = await request(app).get('/restaurants/NaN');
    expect(res.statusCode).toBe(500);
  });

  // ========== PUT /restaurants/:id ==========

  it('should update restaurant by ID', async () => {
    const res = await request(app).put(`/restaurants/${createdRestaurantId}`).send({
      nombre: 'Restaurante Actualizado',
      direccion: 'Calle Actualizada 456',
      telefono: '11112222',
      id_administrador: 1
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.nombre).toBe('Restaurante Actualizado');
  });

  it('should return 404 if restaurant does not exist for update', async () => {
    const res = await request(app).put('/restaurants/999999').send({
      nombre: 'Nada',
      direccion: 'X',
      telefono: '000',
      id_administrador: 1
    });
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if ID is invalid on update', async () => {
    const res = await request(app).put('/restaurants/abc').send({
      nombre: 'X',
      direccion: 'X',
      telefono: '000',
      id_administrador: 1
    });
    expect(res.statusCode).toBe(500);
  });

  it('should return 500 if ID is undefined on update', async () => {
    const res = await request(app).put('/restaurants/undefined').send({
      nombre: 'X',
      direccion: 'X',
      telefono: '000',
      id_administrador: 1
    });
    expect(res.statusCode).toBe(500);
  });

  it('should return 404 if ID is empty string on update', async () => {
    const res = await request(app).put('/restaurants/').send({
      nombre: 'X',
      direccion: 'X',
      telefono: '000',
      id_administrador: 1
    });
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if ID is NaN on update', async () => {
    const res = await request(app).put('/restaurants/NaN').send({
      nombre: 'X',
      direccion: 'X',
      telefono: '000',
      id_administrador: 1
    });
    expect(res.statusCode).toBe(500);
  });

  // ========== DELETE /restaurants/:id ==========

  it('should delete restaurant by ID', async () => {
    const res = await request(app).delete(`/restaurants/${createdRestaurantId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminado/i);
  });

  it('should return 404 if restaurant does not exist', async () => {
    const res = await request(app).delete('/restaurants/999999');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if ID is invalid on delete', async () => {
    const res = await request(app).delete('/restaurants/abc');
    expect(res.statusCode).toBe(500);
  });

  it('should return 500 if ID is undefined on delete', async () => {
    const res = await request(app).delete('/restaurants/undefined');
    expect(res.statusCode).toBe(500);
  });

  it('should return 404 if ID is empty string on delete', async () => {
    const res = await request(app).delete('/restaurants/');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if ID is NaN on delete', async () => {
    const res = await request(app).delete('/restaurants/NaN');
    expect(res.statusCode).toBe(500);
  });
});

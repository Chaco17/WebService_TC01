import request from 'supertest';
import app from '../src/index.js';

let createdOrderId;
const USER_ID = 2; // debe existir
const RESTAURANT_ID = 1; // debe existir

describe('Order routes', () => {

  // ========== POST /orders ==========

  it('should create an order without reservation', async () => {
    const res = await request(app).post('/orders').send({
      id_cliente: USER_ID,
      id_restaurante: RESTAURANT_ID
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    createdOrderId = res.body.data.id;
  });

  it('should create an order with reservation', async () => {
    const res = await request(app).post('/orders').send({
      id_cliente: USER_ID,
      id_restaurante: RESTAURANT_ID,
      id_reserva: null // o un ID válido si tenés
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/orders').send({
      id_restaurante: RESTAURANT_ID
    });

    expect(res.statusCode).toBe(400);
  });

  it('should return 500 if id_cliente is invalid', async () => {
    const res = await request(app).post('/orders').send({
      id_cliente: 'x',
      id_restaurante: RESTAURANT_ID
    });

    expect([400, 500]).toContain(res.statusCode);
  });

  // ========== GET /orders/:id ==========

  it('should return order by ID', async () => {
    const res = await request(app).get(`/orders/${createdOrderId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(createdOrderId);
  });

  it('should return 404 if order not found', async () => {
    const res = await request(app).get('/orders/999999');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if order ID is invalid', async () => {
    const res = await request(app).get('/orders/abc');
    expect(res.statusCode).toBe(500);
  });

  // ========== GET /users/:id/orders ==========

  it('should return orders by user ID', async () => {
    const res = await request(app).get(`/users/${USER_ID}/orders`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return 500 if user ID is invalid', async () => {
    const res = await request(app).get('/users/invalid/orders');
    expect(res.statusCode).toBe(500);
  });

  // ========== GET /restaurants/:id/orders ==========

  it('should return orders by restaurant ID', async () => {
    const res = await request(app).get(`/restaurants/${RESTAURANT_ID}/orders`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return 500 if restaurant ID is invalid', async () => {
    const res = await request(app).get('/restaurants/invalid/orders');
    expect(res.statusCode).toBe(500);
  });

  // ========== PUT /orders/:id ==========

  it('should update order status', async () => {
    const res = await request(app).put(`/orders/${createdOrderId}`).send({
      estado: 'preparando'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.estado).toBe('preparando');
  });

  it('should return 400 if estado is invalid', async () => {
    const res = await request(app).put(`/orders/${createdOrderId}`).send({
      estado: 'inexistente'
    });

    expect(res.statusCode).toBe(400);
  });

  it('should return 404 if order not found on update', async () => {
    const res = await request(app).put('/orders/999999').send({
      estado: 'completado'
    });

    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if order ID is invalid on update', async () => {
    const res = await request(app).put('/orders/abc').send({
      estado: 'pendiente'
    });

    expect(res.statusCode).toBe(500);
  });

  // ========== DELETE /orders/:id ==========

  it('should delete order by ID', async () => {
    const res = await request(app).delete(`/orders/${createdOrderId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminado/i);
  });

  it('should return 404 if order not found on delete', async () => {
    const res = await request(app).delete('/orders/999999');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if order ID is invalid on delete', async () => {
    const res = await request(app).delete('/orders/invalid');
    expect(res.statusCode).toBe(500);
  });
});

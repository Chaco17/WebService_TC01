import request from 'supertest';
import app from '../src/index.js';

let createdReservationId;
const USER_ID = 2; // Asegúrate que existe
const RESTAURANT_ID = 1; // Asegúrate que existe

describe('Reservation routes', () => {

  // ========== POST /reservations ==========

  it('should create a reservation', async () => {
    const res = await request(app).post('/reservations').send({
      id_cliente: USER_ID,
      id_restaurante: RESTAURANT_ID,
      fecha: '2025-03-30T14:00:00',
      numero_personas: 4
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    createdReservationId = res.body.data.id;
  });

  it('should return 400 if fields are missing', async () => {
    const res = await request(app).post('/reservations').send({
      id_cliente: USER_ID
    });

    expect(res.statusCode).toBe(400);
  });

  it('should return 500 if id_cliente is invalid', async () => {
    const res = await request(app).post('/reservations').send({
      id_cliente: 'x',
      id_restaurante: RESTAURANT_ID,
      fecha: '2025-03-30T14:00:00',
      numero_personas: 4
    });

    expect([400, 500]).toContain(res.statusCode);
  });

  // ========== GET /reservations/:id ==========

  it('should get reservation by ID', async () => {
    const res = await request(app).get(`/reservations/${createdReservationId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(createdReservationId);
  });

  it('should return 404 if reservation not found', async () => {
    const res = await request(app).get('/reservations/999999');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if reservation ID is invalid', async () => {
    const res = await request(app).get('/reservations/abc');
    expect(res.statusCode).toBe(500);
  });

  // ========== DELETE /reservations/:id ==========

  it('should cancel a reservation by ID', async () => {
    const res = await request(app).delete(`/reservations/${createdReservationId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.estado).toBe('cancelada');
  });

  it('should return 404 when trying to cancel a non-existent reservation', async () => {
    const res = await request(app).delete('/reservations/999999');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if reservation ID is invalid on cancel', async () => {
    const res = await request(app).delete('/reservations/NaN');
    expect(res.statusCode).toBe(500);
  });

  // ========== GET /reservations/user/:id ==========

  it('should get reservations by user ID', async () => {
    const res = await request(app).get(`/reservations/user/${USER_ID}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return 500 if user ID is invalid', async () => {
    const res = await request(app).get('/reservations/user/abc');
    expect(res.statusCode).toBe(500);
  });

  // ========== GET /reservations/restaurant/:id ==========

  it('should get reservations by restaurant ID', async () => {
    const res = await request(app).get(`/reservations/restaurant/${RESTAURANT_ID}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return 500 if restaurant ID is invalid', async () => {
    const res = await request(app).get('/reservations/restaurant/NaN');
    expect(res.statusCode).toBe(500);
  });
});

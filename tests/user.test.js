import request from 'supertest';
import app from '../src/index.js';

let createdUserId;

describe('User routes', () => {

  // ========== POST /users ==========

  it('should create a user', async () => {
    const res = await request(app).post('/users').send({
      nombre: 'Test User',
      correo: 'testuser@example.com',
      tipo_usuario: 'cliente'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('data');
    createdUserId = res.body.data.id;
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/users').send({
      nombre: 'Incomplete User'
    });
    expect(res.statusCode).toBe(400);
  });

  it('should return 400 if invalid tipo_usuario is provided', async () => {
    const res = await request(app).post('/users').send({
      nombre: 'Invalid Type',
      correo: 'invalid@example.com',
      tipo_usuario: 'hacker'
    });
    // esto depende si validás el tipo_usuario manualmente
    expect([400, 500]).toContain(res.statusCode);
  });

  it('should return 500 if email is duplicated', async () => {
    const res = await request(app).post('/users').send({
      nombre: 'Duplicated',
      correo: 'testuser@example.com',
      tipo_usuario: 'cliente'
    });
    expect(res.statusCode).toBe(500);
  });

  // ========== GET /users ==========

  it('should return all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // Este caso depende de que la tabla esté vacía
  // it('should return 200 and empty array if no users', async () => {
  //   // Simular tabla vacía o usar BD separada
  // });

  // ========== GET /users/:id ==========

  it('should return user by ID', async () => {
    const res = await request(app).get(`/users/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('id', createdUserId);
  });

  it('should return 404 if user does not exist', async () => {
    const res = await request(app).get('/users/999999');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if ID is invalid', async () => {
    const res = await request(app).get('/users/abc');
    expect(res.statusCode).toBe(500);
  });

  it('should return 500 if ID is undefined', async () => {
    const res = await request(app).get('/users/undefined');
    expect(res.statusCode).toBe(500);
  });

  it('should return 500 if ID is NaN', async () => {
    const res = await request(app).get('/users/NaN');
    expect(res.statusCode).toBe(500);
  });

  // ========== PUT /users/:id ==========

  it('should update user by ID', async () => {
    const res = await request(app).put(`/users/${createdUserId}`).send({
      nombre: 'Updated User',
      correo: 'updated@example.com',
      tipo_usuario: 'cliente'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.nombre).toBe('Updated User');
  });

  it('should return 404 if updating non-existent user', async () => {
    const res = await request(app).put('/users/999999').send({
      nombre: 'Nobody',
      correo: 'nobody@example.com',
      tipo_usuario: 'cliente'
    });
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if ID is invalid on update', async () => {
    const res = await request(app).put('/users/abc').send({
      nombre: 'Error',
      correo: 'error@example.com',
      tipo_usuario: 'cliente'
    });
    expect(res.statusCode).toBe(500);
  });

  it('should return 500 if ID is undefined on update', async () => {
    const res = await request(app).put('/users/undefined').send({
      nombre: 'Error',
      correo: 'error@example.com',
      tipo_usuario: 'cliente'
    });
    expect(res.statusCode).toBe(500);
  });

  it('should return 404 if ID is empty string on update', async () => {
    const res = await request(app).put('/users/').send({
      nombre: 'Error',
      correo: 'error@example.com',
      tipo_usuario: 'cliente'
    });
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if ID is NaN on update', async () => {
    const res = await request(app).put('/users/NaN').send({
      nombre: 'Error',
      correo: 'error@example.com',
      tipo_usuario: 'cliente'
    });
    expect(res.statusCode).toBe(500);
  });

  // ========== DELETE /users/:id ==========

  it('should delete user by ID', async () => {
    const res = await request(app).delete(`/users/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminado/i);
  });

  it('should return 404 if deleting non-existent user', async () => {
    const res = await request(app).delete('/users/999999');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if ID is invalid on delete', async () => {
    const res = await request(app).delete('/users/abc');
    expect(res.statusCode).toBe(500);
  });

  it('should return 500 if ID is undefined on delete', async () => {
    const res = await request(app).delete('/users/undefined');
    expect(res.statusCode).toBe(500);
  });

  it('should return 404 if ID is empty string on delete', async () => {
    const res = await request(app).delete('/users/');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if ID is NaN on delete', async () => {
    const res = await request(app).delete('/users/NaN');
    expect(res.statusCode).toBe(500);
  });
});

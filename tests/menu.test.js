import request from 'supertest';
import app from '../src/index.js';

let createdMenuId;
let ADMIN_ID;
let RESTAURANT_ID;

beforeAll(async () => {
  // Crear usuario administrador
  const userRes = await request(app).post('/users').send({
    nombre: 'Admin Test',
    correo: 'admin@test.com',
    tipo_usuario: 'administrador'
  });

  ADMIN_ID = userRes.body.data.id;

  // Crear restaurante con ese administrador
  const res = await request(app).post('/restaurants').send({
    nombre: 'Restaurante de Prueba',
    direccion: 'Calle Test',
    telefono: '123456789',
    id_administrador: ADMIN_ID
  });

  RESTAURANT_ID = res.body.data.id;
});

afterAll(async () => {
  await request(app).delete(`/users/${ADMIN_ID}`);
});

describe('Menu routes', () => {
  // ========== POST /menus ==========

  it('should create a menu', async () => {
    const res = await request(app).post('/menus').send({
      nombre: 'Menú Prueba',
      id_restaurante: RESTAURANT_ID
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    createdMenuId = res.body.data.id;
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/menus').send({
      nombre: 'Incompleto'
    });
    expect(res.statusCode).toBe(400);
  });

  it('should return 500 if id_restaurante is invalid', async () => {
    const res = await request(app).post('/menus').send({
      nombre: 'Error',
      id_restaurante: 'no-id'
    });
    expect([400, 500]).toContain(res.statusCode);
  });

  // ========== GET /menus/:id ==========

  it('should return menu by ID', async () => {
    const res = await request(app).get(`/menus/${createdMenuId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(createdMenuId);
  });

  it('should return 404 if menu does not exist', async () => {
    const res = await request(app).get('/menus/999999');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if ID is invalid', async () => {
    const res = await request(app).get('/menus/abc');
    expect(res.statusCode).toBe(500);
  });

  // ========== PUT /menus/:id ==========

  it('should update menu by ID', async () => {
    const res = await request(app).put(`/menus/${createdMenuId}`).send({
      nombre: 'Menú Actualizado',
      id_restaurante: RESTAURANT_ID
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.nombre).toBe('Menú Actualizado');
  });

  it('should return 404 if menu does not exist on update', async () => {
    const res = await request(app).put('/menus/999999').send({
      nombre: 'Nada',
      id_restaurante: RESTAURANT_ID
    });
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if ID is invalid on update', async () => {
    const res = await request(app).put('/menus/abc').send({
      nombre: 'Errado',
      id_restaurante: RESTAURANT_ID
    });
    expect(res.statusCode).toBe(500);
  });

  // ========== DELETE /menus/:id ==========

  it('should delete menu by ID', async () => {
    const res = await request(app).delete(`/menus/${createdMenuId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminado/i);
  });

  it('should return 404 if menu does not exist on delete', async () => {
    const res = await request(app).delete('/menus/999999');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if ID is invalid on delete', async () => {
    const res = await request(app).delete('/menus/abc');
    expect(res.statusCode).toBe(500);
  });

  // ========== GET /restaurants/:id/menus ==========

  it('should return menus by restaurant ID', async () => {
    // Crear uno nuevo para verificar esta ruta
    await request(app).post('/menus').send({
      nombre: 'Menú Secundario',
      id_restaurante: RESTAURANT_ID
    });

    const res = await request(app).get(`/restaurants/${RESTAURANT_ID}/menus`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return 404 if restaurant does not exist', async () => {
    const res = await request(app).get('/restaurants/999999/menus');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 if restaurant ID is invalid', async () => {
    const res = await request(app).get('/restaurants/abc/menus');
    expect(res.statusCode).toBe(500);
  });
});

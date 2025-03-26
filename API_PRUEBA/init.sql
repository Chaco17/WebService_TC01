-- Tabla de Usuarios
CREATE TABLE usuarios (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nombre TEXT NOT NULL,
  correo TEXT UNIQUE NOT NULL,
  tipo_usuario TEXT CHECK (tipo_usuario IN ('administrador', 'cliente')) NOT NULL
);

-- Tabla de Restaurantes
CREATE TABLE restaurantes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nombre TEXT NOT NULL,
  direccion TEXT NOT NULL,
  telefono TEXT NOT NULL,
  id_administrador BIGINT NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE
);

-- Tabla de Menús
CREATE TABLE menus (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  id_restaurante BIGINT NOT NULL REFERENCES restaurantes (id) ON DELETE CASCADE,
  nombre TEXT NOT NULL
);

-- Tabla de Platos
CREATE TABLE platos (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  id_menu BIGINT NOT NULL REFERENCES menus (id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  precio NUMERIC(10,2) NOT NULL
);

-- Tabla de Reservas
CREATE TABLE reservas (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  id_cliente BIGINT NOT NULL, -- Manejado externamente
  id_restaurante BIGINT NOT NULL REFERENCES restaurantes (id) ON DELETE CASCADE,
  fecha TIMESTAMP NOT NULL,
  numero_personas INT NOT NULL,
  estado TEXT CHECK (estado IN ('pendiente', 'confirmada', 'cancelada')) NOT NULL
);

-- Tabla de Pedidos
CREATE TABLE pedidos (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  id_cliente BIGINT NOT NULL, -- Manejado externamente
  id_restaurante BIGINT NOT NULL REFERENCES restaurantes (id) ON DELETE CASCADE,
  id_reserva BIGINT REFERENCES reservas (id) ON DELETE SET NULL,
  fecha TIMESTAMP NOT NULL,
  estado TEXT CHECK (estado IN ('pendiente', 'preparando', 'completado', 'cancelado')) NOT NULL
);

CREATE INDEX idx_restaurantes_administrador ON restaurantes USING btree (id_administrador);
CREATE INDEX idx_reservas_cliente ON reservas USING btree (id_cliente);
CREATE INDEX idx_pedidos_cliente ON pedidos USING btree (id_cliente);
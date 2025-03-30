import session from 'express-session';
import Keycloak from 'keycloak-connect';
import dotenv from 'dotenv';

dotenv.config();

const memoryStore = new session.MemoryStore();

const keycloakConfig = {
  realm: 'restauranteapi',
  'auth-server-url': 'http://auth:8080',
  'ssl-required': 'external',
  resource: 'restauranteapi',
  'public-client': true, // Cliente público
  'verify-token-audience': true,
  'confidential-port': 0,
  'use-resource-role-mappings': true
};

const keycloak = new Keycloak(
  { store: memoryStore },
  keycloakConfig
);

// Middleware CORS para desarrollo
const devMiddleware = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
  }
  next();
};

export { keycloak, memoryStore, devMiddleware };
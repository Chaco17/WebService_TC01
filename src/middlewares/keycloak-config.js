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
  'public-client': true, // o bearer only
  'verify-token-audience': true,
  'confidential-port': 0,
  'use-resource-role-mappings': true
};

const keycloak = new Keycloak(
  { store: memoryStore },
  keycloakConfig
);

export { keycloak, memoryStore };
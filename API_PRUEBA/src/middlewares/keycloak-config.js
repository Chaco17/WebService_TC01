// src/config/keycloak.js
import session from 'express-session'
import Keycloak from 'keycloak-connect'
import dotenv from 'dotenv'
dotenv.config()

const memoryStore = new session.MemoryStore()

const keycloak = new Keycloak({ store: memoryStore }, {
  realm: 'restaurante-api',
  'auth-server-url': 'http://auth:8080',
  'ssl-required': 'none',
  resource: 'restaurante-api',
  'bearer-only': true,
  credentials: {
    secret: process.env.KEYCLOAK_SECRET
  },
  'confidential-port': 0
})

export { keycloak, memoryStore }

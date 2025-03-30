// src/middlewares/verifyToken.js
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: `http://auth:8080/realms/restauranteapi/protocol/openid-connect/certs`,
  cache: true,
  cacheMaxAge: 86400000,
  rateLimit: true,
  jwksRequestsPerMinute: 10
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      console.error('Error obteniendo clave:', err);
      return callback(err);
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

export function verifyToken(requiredRole = null) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Formato de token inválido" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
      token,
      getKey,
      {
        algorithms: ['RS256']
      
      }, // se quitó el issuer
      (err, decoded) => {
        if (err) {
          console.error('Error JWT:', err);
          return res.status(401).json({ message: "Token inválido", detail: err.message });
        }

        // Validación de expiración
        if (decoded.exp < Date.now() / 1000) {
          return res.status(401).json({ message: "Token expirado" });
        }

        // Validación de roles
        if (requiredRole) {
          const resourceRoles = decoded.resource_access?.['restauranteapi']?.roles || [];
          const realmRoles = decoded.realm_access?.roles || [];
          
          if (!resourceRoles.includes(requiredRole) && !realmRoles.includes(requiredRole)) {
            return res.status(403).json({
              message: "Acceso denegado: Rol requerido",
              requiredRole,
              userRoles: [...resourceRoles, ...realmRoles]
            });
          }
        }

        req.user = decoded;
        next();
      }
    );
  };
}

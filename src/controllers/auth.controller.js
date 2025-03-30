import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
  // En Keycloak, los usuarios se registran vía el panel de administración o el endpoint del servidor
  return res.status(501).json({ message: 'El registro se maneja desde Keycloak directamente' });
};

export const login = async (req, res) => {
  return res.status(501).json({ message: 'El login debe hacerse directamente desde Keycloak o con un cliente OAuth2' });
};

export const getMe = (req, res) => {
  if (!req.kauth || !req.kauth.grant) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  const tokenContent = req.kauth.grant.access_token.content;

  return res.json({
    id: tokenContent.sub,
    username: tokenContent.preferred_username,
    email: tokenContent.email,
    roles: tokenContent.realm_access?.roles || [],
  });
};

export const updateUser = (req, res) => {
  return res.status(501).json({ message: 'Actualizar usuarios no está implementado aún (requiere integración con la Admin API de Keycloak)' });
};

export const deleteUser = (req, res) => {
  return res.status(501).json({ message: 'Eliminar usuarios no está implementado aún (requiere integración con la Admin API de Keycloak)' });
};

import { pool } from '../database/database';

export const getUsers = async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM users')
    res.json( rows );
};

export const getUser = async (req, res) => {
    const {id} = req.params.id; // Extrae el id de la URL

    const {rows} = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({message: 'Usuario no encontrado'});
    }

    res.json(rows);
};

export const createUser = async(req, res) => {
    const data = req.body;
    console.log(data);

    const {rows} = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [data.name, data.email]);
    console.log(rows);

    res.send('Creando usuario');
};

export const deleteUser = async (req, res) => {
    const {id} = req.params.id; // Extrae el id de la URL

    const {rows} = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({message: 'Usuario no encontrado'});
    }
    
    return res.sendStatus(204).json({message: 'eliminando usuario'});
};

export const updateUser = async (req, res) => {
    const {id} = req.params.id; // Extrae el id de la URL
    const data = req.body;

    const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [data.name, data.email, id]);

    console.log(result);

    res.send('actualizando usuario');
};
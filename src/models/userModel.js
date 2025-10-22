import pool from '../config/db.js';

class UserModel {
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, username, email, role, avatar_url, created_at, updated_at FROM users WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async create(username, email, hashedPassword) {
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, role, avatar_url, created_at, updated_at
    `;
    const { rows } = await pool.query(query, [username, email, hashedPassword]);
    return rows[0];
  }

  static async updateAvatar(userId, avatarUrl) {
    const query = `
      UPDATE users
      SET avatar_url = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, username, email, role, avatar_url, created_at, updated_at
    `;
    const { rows } = await pool.query(query, [avatarUrl, userId]);
    return rows[0];
  }

  static async getAllUsers() {
    const query = 'SELECT id, username, email, role, avatar_url, created_at, updated_at FROM users';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async updateProfile(userId, data) {
    const allowedUpdates = ['username', 'email'];
    const updates = Object.keys(data)
      .filter(key => allowedUpdates.includes(key) && data[key] !== undefined)
      .map((key, index) => `${key} = $${index + 1}`);
    
    if (updates.length === 0) return null;

    const values = Object.keys(data)
      .filter(key => allowedUpdates.includes(key) && data[key] !== undefined)
      .map(key => data[key]);

    const query = `
      UPDATE users
      SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${values.length + 1}
      RETURNING id, username, email, role, avatar_url, created_at, updated_at
    `;
    
    const { rows } = await pool.query(query, [...values, userId]);
    return rows[0];
  }

  static async deleteUser(userId) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
    const { rows } = await pool.query(query, [userId]);
    return rows[0];
  }
}

export default UserModel;
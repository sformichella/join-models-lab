const pool = require('../utils/pool');

module.exports = class Video {
  id;
  title;
  length;
  description;

  constructor({ id, title, length, description }) {
    this.id = id;
    this.title = title;
    this.length = length;
    this.description = description;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM videos');
    return rows.map(video => new Video(video));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM videos WHERE id = $1', [id]);

    if(!rows[0]) throw new Error(`No video with an ID of ${id}`);

    return new Video(rows[0]);
  }

  static async make({ title, length, description }) {
    const { rows } = await pool.query(
      `
        INSERT INTO videos (title, length, description)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [title, length, description]
    );

    return new Video(rows[0]);
  }

  static async update(id, { title, length, description }) {
    const { rows } = await pool.query(
      `
        UPDATE videos
        SET title = $1,
            length = $2,
            description = $3
        WHERE id = $4
        RETURNING *
      `,
      [title, length, description, id]
    );

    return new Video(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM videos
        WHERE id = $1
        RETURNING *
      `,
      [id]
    );

    return new Video(rows[0]);
  }
};

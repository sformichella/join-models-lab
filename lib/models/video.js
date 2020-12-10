const pool = require('../utils/pool');

module.exports = class Video {
  id;
  title;
  length;
  description;
  youtuber_id;

  constructor({ id, title, length, description, youtuber_id }) {
    this.id = String(id);
    this.title = title;
    this.length = length;
    this.description = description;
    this.youtuber_id = String(youtuber_id);
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

  static async make({ title, length, description, youtuber_id }) {
    const { rows } = await pool.query(
      `
        INSERT INTO videos (title, length, description, youtuber_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [title, length, description, youtuber_id]
    );

    return new Video(rows[0]);
  }

  static async update(id, { title, length, description, youtuber_id }) {
    const { rows } = await pool.query(
      `
        UPDATE videos
        SET title = $1,
            length = $2,
            description = $3,
            youtuber_id = $4
        WHERE id = $5
        RETURNING *
      `,
      [title, length, description, youtuber_id, id]
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

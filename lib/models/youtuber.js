const pool = require('../utils/pool');
const Video = require('./video');

module.exports = class Youtuber {
  id;
  name;
  subscribers;
  description;

  constructor({ id, name, subscribers, description }) {
    this.id = String(id);
    this.name = name;
    this.subscribers = subscribers;
    this.description = description;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM youtubers');
    return rows.map(youtuber => new Youtuber(youtuber));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT youtubers.*, array_to_json(array_agg(videos.*)) AS videos
        FROM youtubers
        JOIN videos
        ON youtubers.id = videos.youtuber_id
        WHERE youtubers.id = $1 
        GROUP BY youtubers.id
      `, [id]);

    if(!rows[0]) throw new Error(`No youtuber with an ID of ${id}`);

    return {
      ...new Youtuber(rows[0]),
      videos: rows[0].videos.map(video => new Video(video))
    };
  }

  static async make({ name, subscribers, description }) {
    const { rows } = await pool.query(
      `
        INSERT INTO youtubers (name, subscribers, description)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [name, subscribers, description]
    );

    return new Youtuber(rows[0]);
  }

  static async update(id, { name, subscribers, description }) {
    const { rows } = await pool.query(
      `
        UPDATE youtubers
        SET name = $1,
            subscribers = $2,
            description = $3
        WHERE id = $4
        RETURNING *
      `,
      [name, subscribers, description, id]
    );

    return new Youtuber(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM youtubers
        WHERE id = $1
        RETURNING *
      `,
      [id]
    );

    return new Youtuber(rows[0]);
  }
};

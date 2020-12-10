const request = require('supertest');
const fileSys =  require('fs').promises;
const pool = require('../lib/utils/pool');
const app = require('../lib/app');

describe('youtuber and video routes', () => {

  beforeAll(async() => {
    const setupSQL = await fileSys.readFile('./sql/setup.sql');

    await pool.query(setupSQL);
  });

  afterAll(async() => {
    await pool.end();
  });


  it('make a youtuber', async() => {

  });

  it('make a video', async() => {

  });

  it('return a youtuber with videos', async() =>{

  });

  it('return a video', async() => {

  });

  it('return some youtubers', async() => {

  });

  it('return some videos', async() => {

  });

  it('update a youtuber', async() => {

  });

  it('update a video', async() => {

  });

  it('delete a youtuber', async() => {

  });

  it('delete a video', async() => {
    
  });
});

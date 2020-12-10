const request = require('supertest');
const fileSys =  require('fs').promises;
const pool = require('../lib/utils/pool');
const app = require('../lib/app');

const { 
  vSauce,
  updatedVSauce,
  firstVideo,
  updatedFirstVideo,
  secondVideo,
  veritasium
} = require('./test-data.json');



describe('youtuber and video routes', () => {

  beforeAll(async() => {
    const setupSQL = await fileSys.readFile('./sql/setup.sql', 'utf-8');
 
    await pool.query(setupSQL);
  });

  afterAll(async() => {
    await pool.end();
  });


  it('make a youtuber', async() => {
    const response = await request(app)
      .post('/youtubers')
      .send(vSauce);

    expect(response.body).toEqual({
      id: '1',
      ...vSauce
    });
  });

  it('make a video', async() => {
    const response = await request(app)
      .post('/videos')
      .send(firstVideo);

    expect(response.body).toEqual({
      id: '1',
      ...firstVideo
    });
  });

  it('return a youtuber with videos', async() => {
    await request(app)
      .post('/videos')
      .send(secondVideo);

    const response = await request(app)
      .get('/youtubers/1');

    expect(response.body).toEqual({
      id: '1',
      ...vSauce,
      videos: [
        { id: '1', ...firstVideo },
        { id: '2', ...secondVideo }
      ]
    });
  });

  it('return a video', async() => {
    const response = await request(app)
      .get('/videos/1');

    expect(response.body).toEqual({
      id: '1',
      ...firstVideo
    });
  });

  it('return some youtubers', async() => {
    await request(app)
      .post('/youtubers')
      .send(veritasium);

    const response = await request(app)
      .get('/youtubers');

    expect(response.body).toEqual([
      { id: 1, ...vSauce },
      { id: 2, ...veritasium }
    ]);
  });

  it('return some videos', async() => {
    const response = await request(app)
      .get('/videos');

    expect(response.body).toEqual([
      { id: 1, ...firstVideo },
      { id: 2, ...secondVideo }
    ]);
  });

  it('update a youtuber', async() => {
    const response = await request(app)
      .put('/youtubers/1')
      .send(updatedVSauce);

    expect(response.body).toEqual({
      id: 1,
      ...updatedVSauce
    });
  });

  it('update a video', async() => {
    const response = await request(app)
      .put('/videos/1')
      .send(updatedFirstVideo);

    expect(response.body).toEqual({
      id: 1,
      ...updatedFirstVideo
    });
  });

  it('delete a youtuber', async() => {
    const response = await request(app)
      .delete('/youtubers/1');

    expect(response.body).toEqual({
      id: 1,
      ...updatedVSauce
    });
  });

  it('delete a video', async() => {
    const response = await request(app)
      .delete('/videos/1');

    expect(response.body).toEqual({
      id: 1,
      ...updatedFirstVideo
    });
  });
});

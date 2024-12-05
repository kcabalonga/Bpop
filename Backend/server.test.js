


const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');

let server;

beforeAll(async () => {
  // Start the server on a test-specific port
  server = app.listen(9000);

  // Connect to a test database
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb://localhost:27017/test_db');
  }
});

afterAll(async () => {
  // Close the server and MongoDB connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  server.close();
});

describe('Server Tests', () => {
  it('GET /test should return server running message', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, the server is running!');
  });

  it('POST /add-user should create a new user and return a token', async () => {
    const userData = {
      name: 'User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(app).post('/add-user').send(userData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User created successfully');
    expect(response.body).toHaveProperty('token');
  });

  it('POST /add-user should return error for duplicate user', async () => {
    const userData = {
      name: 'User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(app).post('/add-user').send(userData);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'User already exists');
  });


  it('GET /check-user should authenticate user and return a token', async () => {
    const response = await request(app).get('/check-user').query({
      username: 'testuser',
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User authenticated successfully');
    expect(response.body).toHaveProperty('token');
  });

  it('GET /check-user should return error for invalid credentials', async () => {
    const response = await request(app).get('/check-user').query({
      username: 'invaliduser',
      password: 'wrongpassword',
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Invalid username or password');
  });

  it('POST /editBio should update user bio', async () => {
    const bioData = {
      username: 'testuser',
      bio: 'This is a test bio',
    };

    const response = await request(app).post('/editBio').send(bioData);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Bio updated successfully');
  });

  it('POST /editBio should return error for non-existent user', async () => {
    const bioData = {
      username: 'nonexistentuser',
      bio: 'This is a test bio',
    };

    const response = await request(app).post('/editBio').send(bioData);
    expect(response.status).toBe(404);
    expect(response.text).toBe('User not found');
  });
});

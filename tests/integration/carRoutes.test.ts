import request from 'supertest';
import app from '../../src/app';
import * as carService from '../../src/services/carService';

jest.mock('../../src/services/carService');
const mockedService = carService as any;

describe('Car Routes Integration', () => {
  it('GET /cars deve retornar 200 com lista de carros', async () => {
    const mockCars = [{ id: '1', name: 'Carro1' }];
    mockedService.getCars = jest.fn().mockResolvedValue(mockCars);

    const response = await request(app).get('/cars');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCars);
  });

  it('GET /cars/:id deve retornar 200 se carro existir', async () => {
    const mockCar = { id: '1', name: 'Carro1' };
    mockedService.getCarById = jest.fn().mockResolvedValue(mockCar);

    const response = await request(app).get('/cars/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCar);
  });

  it('GET /cars/:id deve retornar 404 se carro não existir', async () => {
    mockedService.getCarById = jest.fn().mockResolvedValue(null);

    const response = await request(app).get('/cars/999');
    expect(response.status).toBe(404);
  });
});
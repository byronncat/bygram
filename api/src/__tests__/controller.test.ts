import request from 'supertest';
import app from '../app';
import { LoginResult, StatusCode } from '@constants';
import { accountService } from '@services';

jest.mock('@services', () => ({
  accountService: {
    login: jest.fn(),
  },
}));

jest.mock('mongoose', () => ({
  connect: jest.fn().mockImplementation(() => Promise.resolve()),
}));

describe('login controller', () => {
  it('should return a success message when login is successful', async () => {
    (accountService.login as jest.Mock).mockResolvedValue({
      userId: 1,
      message: LoginResult.SUCCESS,
    });

    await request(app)
      .post('/api/login')
      .send({
        email: 'test@gmail.com',
        password: '111111',
      })
      .expect(StatusCode.OK)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('message', LoginResult.SUCCESS);
        expect(res.body.data).toHaveProperty('sessionId');
      });
  });

  it('should return a not found message when user does not exist', async () => {
    (accountService.login as jest.Mock).mockResolvedValue({
      userId: null,
      message: LoginResult.NOT_EXIST,
    });

    await request(app)
      .post('/api/login')
      .send({
        email: 'test@gmail.com',
        password: '111111',
      })
      .expect(StatusCode.NOT_FOUND)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('message', LoginResult.NOT_EXIST);
      });
  });

  it('should return an unauthorized message when password is incorrect', async () => {
    (accountService.login as jest.Mock).mockResolvedValue({
      userId: null,
      message: LoginResult.INCORRECT_PASSWORD,
    });

    await request(app)
      .post('/api/login')
      .send({
        email: 'test@gmail.com',
        password: '111111',
      })
      .expect(StatusCode.UNAUTHORIZED)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty(
          'message',
          LoginResult.INCORRECT_PASSWORD,
        );
      });
  });

  it('should return an internal server error message when an error occurs', async () => {
    (accountService.login as jest.Mock).mockRejectedValue(
      new Error('Internal server error'),
    );

    const server = request(app);

    await server
      .post('/api/login')
      .send({
        email: 'test@gmail.com',
        password: '111111',
      })
      .expect(StatusCode.INTERNAL_SERVER_ERROR)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('message');
      });

    (accountService.login as jest.Mock).mockResolvedValue({
      userId: 1,
      message: 'Invalid login result',
    });

    await server
      .post('/api/login')
      .send({
        email: 'test@gmail.com',
        password: '111111',
      })
      .expect(StatusCode.INTERNAL_SERVER_ERROR)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('message');
      });
  });
});

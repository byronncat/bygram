// jest.useFakeTimers();
import { accountService } from '@services';
import { PostgreSQL } from '@database';
import { LoginResult } from '@constants';

jest.mock('@database', () => ({
  PostgreSQL: {
    oneOrNone: jest.fn(),
  },
}));

const database = {
  oneOrNone: PostgreSQL.oneOrNone as jest.Mock,
};

describe('services', () => {
  describe('account service', () => {
    const mockUser = {
      id: 1,
      email: 'test@gmail.com',
      password: '123456',
    };

    describe('login', () => {
      it('should return a identity token', async () => {
        database.oneOrNone.mockResolvedValue(mockUser);
        const result = await accountService.login('test@gmail.com', '123456');
        expect(result).toEqual({
          userId: 1,
          message: LoginResult.SUCCESS,
        });
      });

      it('should return failure message if password is incorrect', async () => {
        database.oneOrNone.mockResolvedValue(mockUser);
        const result = await accountService.login(
          'test@gmail.com',
          'wrongpassword',
        );
        expect(result).toEqual({
          userId: null,
          message: LoginResult.INCORRECT_PASSWORD,
        });
      });

      it('should return failure message if email does not exist', async () => {
        database.oneOrNone.mockResolvedValue(null);
        const result = await accountService.login('wrongemail', '123456');
        expect(result).toEqual({
          userId: null,
          message: LoginResult.NOT_EXIST,
        });
      });

      it('should throw an error if database query fails', async () => {
        database.oneOrNone.mockRejectedValue('Database error');
        await expect(accountService.login('test', '123456')).rejects.toEqual(
          'Database error',
        );
      });
    });
  });
});

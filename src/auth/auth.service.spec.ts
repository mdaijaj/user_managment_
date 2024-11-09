import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InternalServerErrorException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const usersServiceMock = {
      create: jest.fn(),
      validateUser: jest.fn(),
    };

    const jwtServiceMock = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signup', () => {
    it('should register a new user successfully', async () => {
      // const mockUser = { id: 1, mobile: '1234567890', name: 'John Doe' };
      const mockUser = {
        id: 1,
        mobile: '1234567890',
        name: 'John Doe',
        status: true,
        last_login: new Date(parseInt('12321')), // convert to Date type
        ip_address: '12321',
        created_at: new Date('12321'),
        password: '2312321',
      };
      jest.spyOn(usersService, 'create').mockResolvedValue(mockUser);

      const result = await authService.signup(
        '1234567890',
        'John Doe',
        'password',
      );

      expect(result).toEqual({
        message: 'Registration successfully',
        user: {
          id: mockUser.id,
          mobile: mockUser.mobile,
          name: mockUser.name,
        },
      });
      expect(usersService.create).toHaveBeenCalledWith(
        '1234567890',
        'John Doe',
        'password',
      );
    });

    it('should throw InternalServerErrorException when an error occurs', async () => {
      jest
        .spyOn(usersService, 'create')
        .mockRejectedValue(new Error('Unexpected error'));

      await expect(
        authService.signup('1234567890', 'John Doe', 'password'),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw InternalServerErrorException when an error occurs', async () => {
      jest
        .spyOn(usersService, 'validateUser')
        .mockRejectedValue(new Error('Unexpected error'));

      await expect(authService.login('1234567890', 'password')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});

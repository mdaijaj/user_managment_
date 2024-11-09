import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthService;

  beforeEach(async () => {
    mockAuthService = {
      signup: jest.fn(),
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('signup', () => {
    it('should call AuthService.signup with correct parameters', async () => {
      const signupDto: SignupRequestDto = {
        mobile: '1234567890',
        name: 'John Doe',
        password: 'securePassword',
      };
      const signupResponse = {
        id: 'userId',
        name: signupDto.name,
        mobile: signupDto.mobile,
      };
      mockAuthService.signup.mockResolvedValue(signupResponse);

      const result = await authController.signup(signupDto);

      expect(mockAuthService.signup).toHaveBeenCalledWith(
        signupDto.mobile,
        signupDto.name,
        signupDto.password,
      );
      expect(result).toEqual(signupResponse);
    });

    it('should throw an error if signup fails', async () => {
      const signupDto: SignupRequestDto = {
        mobile: '1234567890',
        name: 'John Doe',
        password: 'securePassword',
      };
      mockAuthService.signup.mockRejectedValue(new Error('Signup failed'));

      try {
        await authController.signup(signupDto);
      } catch (error) {
        expect(error.message).toBe('Signup failed');
      }
    });
  });

  describe('login', () => {
    it('should call AuthService.login with correct parameters', async () => {
      const loginDto: LoginDto = {
        mobile: '1234567890',
        password: 'securePassword',
      };
      const loginResponse = { token: 'jwtToken' };
      mockAuthService.login.mockResolvedValue(loginResponse);

      const result = await authController.login(loginDto);

      expect(mockAuthService.login).toHaveBeenCalledWith(
        loginDto.mobile,
        loginDto.password,
      );
      expect(result).toEqual(loginResponse);
    });

    it('should throw an error if login fails', async () => {
      const loginDto: LoginDto = {
        mobile: '1234567890',
        password: 'wrongPassword',
      };
      mockAuthService.login.mockRejectedValue(new Error('Login failed'));

      try {
        await authController.login(loginDto);
      } catch (error) {
        expect(error.message).toBe('Login failed');
      }
    });
  });
});

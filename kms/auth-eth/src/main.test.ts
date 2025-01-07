import { FastifyInstance } from 'fastify';
import { build } from './server';
import { BootInfo } from './types';

// Mock EthereumBackend
jest.mock('./ethereum', () => {
  return {
    EthereumBackend: jest.fn().mockImplementation(() => ({
      checkBoot: jest.fn()
    }))
  };
});

describe('Server', () => {
  let app: FastifyInstance;
  const mockBootInfo: BootInfo = {
    mrEnclave: '0x1234',
    mrImage: '0x5678',
    appId: '0x9012345678901234567890123456789012345678',
    composeHash: '0xabcd',
    instanceId: '0x3456789012345678901234567890123456789012',
    deviceId: '0xef12'
  };

  beforeAll(async () => {
    app = await build();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /bootAuth/app', () => {
    it('should return 200 when backend check passes', async () => {
      // Mock successful response
      const mockCheckBoot = jest.fn().mockResolvedValue({
        isAllowed: true,
        reason: ''
      });
      app.ethereum.checkBoot = mockCheckBoot;

      const response = await app.inject({
        method: 'POST',
        url: '/bootAuth/app',
        payload: mockBootInfo
      });

      expect(response.statusCode).toBe(200);
      const result = JSON.parse(response.payload);
      expect(result.isAllowed).toBe(true);
      expect(result.reason).toBe('');
      expect(mockCheckBoot).toHaveBeenCalledWith(mockBootInfo, false);
    });

    it('should return 400 for invalid boot info', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/bootAuth/app',
        payload: {
          // Missing required fields
          mrEnclave: '0x1234'
        }
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('POST /bootAuth/kms', () => {
    it('should return 200 when backend check passes', async () => {
      // Mock successful response
      const mockCheckBoot = jest.fn().mockResolvedValue({
        isAllowed: true,
        reason: ''
      });
      app.ethereum.checkBoot = mockCheckBoot;

      const response = await app.inject({
        method: 'POST',
        url: '/bootAuth/kms',
        payload: mockBootInfo
      });

      expect(response.statusCode).toBe(200);
      const result = JSON.parse(response.payload);
      expect(result.isAllowed).toBe(true);
      expect(result.reason).toBe('');
      expect(mockCheckBoot).toHaveBeenCalledWith(mockBootInfo, true);
    });

    it('should handle backend errors gracefully', async () => {
      // Mock error response
      const mockCheckBoot = jest.fn().mockRejectedValue(new Error('Backend error'));
      app.ethereum.checkBoot = mockCheckBoot;

      const response = await app.inject({
        method: 'POST',
        url: '/bootAuth/kms',
        payload: mockBootInfo
      });

      expect(response.statusCode).toBe(500);
      const result = JSON.parse(response.payload);
      expect(result.isAllowed).toBe(false);
      expect(result.reason).toMatch(/Error: Backend error/);
    });
  });
});

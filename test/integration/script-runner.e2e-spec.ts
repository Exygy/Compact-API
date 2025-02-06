import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/modules/app.module';
import { PrismaService } from '../../src/services/prisma.service';

describe('Script Runner Controller Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  describe('Testing example endpoint', () => {
    it('should return a successDTO', async () => {
      const res = await request(app.getHttpServer())
        .put('/scriptRunner/exampleScript')
        .send({
          name: 'Example User',
        })
        .set({ passkey: process.env.API_PASS_KEY || '' })
        .expect(200);

      expect(res.body).toEqual({
        success: true,
      });
    });
  });
});

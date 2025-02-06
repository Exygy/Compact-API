import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/modules/app.module';
import { PrismaService } from '../../src/services/prisma.service';
import { NameDTO } from '../../src/dtos/script-runner/name.dto';

describe('API Key Guard Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    process.env.API_PASS_KEY = 'OUR_API_PASS_KEY';
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

  it('should succeed when correct header is present', async () => {
    prisma.scriptRuns.findUnique = jest.fn().mockResolvedValueOnce(null);
    prisma.scriptRuns.create = jest.fn().mockResolvedValueOnce(null);
    prisma.scriptRuns.update = jest.fn().mockResolvedValueOnce(null);
    await request(app.getHttpServer())
      .put('/scriptRunner/exampleScript')
      .send({
        name: 'Example User',
      })
      .set({ passkey: process.env.API_PASS_KEY || '' })
      .expect(200);
  });

  it('should error when incorrect header is present', async () => {
    const res = await request(app.getHttpServer())
      .put('/scriptRunner/exampleScript')
      .set({ passkey: 'the wrong key' })
      .send({
        name: 'hello',
      } as NameDTO)
      .expect(401);
    expect(res.body.message).toBe('Traffic not from a known source');
  });

  it('should error when no header is present', async () => {
    const res = await request(app.getHttpServer())
      .put('/scriptRunner/exampleScript')
      .send({
        name: 'hello',
      } as NameDTO)
      .expect(401);
    expect(res.body.message).toBe('Traffic not from a known source');
  });
});

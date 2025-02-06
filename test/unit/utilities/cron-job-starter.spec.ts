import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { PrismaService } from '../../../src/services/prisma.service';
import { startCronJob } from '../../../src/utilities/cron-job-starter';

describe('Testing cron job starter utility', () => {
  let prisma: PrismaService;
  const testSchedulerRegistry = {
    addCronJob: () => {},
  };
  const mockAddCronJob = jest.spyOn(testSchedulerRegistry, 'addCronJob');
  const testLogger = {
    error: () => {},
  };
  const mockError = jest.spyOn(testLogger, 'error');
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, Logger, SchedulerRegistry],
    })
      .overrideProvider(SchedulerRegistry)
      .useValue(testSchedulerRegistry)
      .overrideProvider(Logger)
      .useValue(testLogger)
      .compile();
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('Testing startCronJob()', () => {
    it('should error when no cronString is passed in', () => {
      prisma.cronJobs.findFirst = jest.fn().mockResolvedValue({});
      startCronJob(
        prisma,
        'test cron',
        '',
        () =>
          new Promise(() => ({
            success: true,
          })),
        testLogger as unknown as Logger,
        testSchedulerRegistry as unknown as SchedulerRegistry,
      );
      expect(mockError).toHaveBeenCalledWith(
        'test cron cron string does not exist and test cron job will not run',
      );
      expect(prisma.cronJobs.findFirst).not.toHaveBeenCalled();
    });
    it('should add cronjob correctly', () => {
      startCronJob(
        prisma,
        'test cron',
        '0 * * * *',
        jest.fn().mockResolvedValue({ success: true }),
        testLogger as unknown as Logger,
        testSchedulerRegistry as unknown as SchedulerRegistry,
      );
      expect(mockAddCronJob).toHaveBeenCalled();
    });
  });
});

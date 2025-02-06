import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { Request as ExpressRequest } from 'express';
import { PrismaService } from '../../../src/services/prisma.service';
import { ScriptRunnerService } from '../../../src/services/script-runner.service';

describe('Testing script runner service', () => {
  let service: ScriptRunnerService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScriptRunnerService, PrismaService],
    }).compile();

    service = module.get<ScriptRunnerService>(ScriptRunnerService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('Testing example()', () => {
    it('should successfully return', async () => {
      prisma.scriptRuns.findUnique = jest.fn().mockResolvedValue(null);
      prisma.scriptRuns.create = jest.fn().mockResolvedValue(null);
      prisma.scriptRuns.update = jest.fn().mockResolvedValue(null);

      const scriptName = 'example';

      await service.example({} as ExpressRequest, 'Example User');

      expect(prisma.scriptRuns.findUnique).toHaveBeenCalledWith({
        where: {
          scriptName,
        },
      });
      expect(prisma.scriptRuns.create).toHaveBeenCalledWith({
        data: {
          scriptName,
          triggeringUser: 'Example User',
        },
      });
      expect(prisma.scriptRuns.update).toHaveBeenCalledWith({
        data: {
          didScriptRun: true,
          triggeringUser: 'Example User',
        },
        where: {
          scriptName,
        },
      });
    });
  });

  // | ---------- HELPER TESTS BELOW ---------- | //
  describe('Testing markScriptAsRunStart()', () => {
    it('should mark script run as started if no script run present in db', async () => {
      prisma.scriptRuns.findUnique = jest.fn().mockResolvedValue(null);
      prisma.scriptRuns.create = jest.fn().mockResolvedValue(null);

      const scriptName = 'new run attempt';

      await service.markScriptAsRunStart(scriptName, 'example user');

      expect(prisma.scriptRuns.findUnique).toHaveBeenCalledWith({
        where: {
          scriptName,
        },
      });
      expect(prisma.scriptRuns.create).toHaveBeenCalledWith({
        data: {
          scriptName,
          triggeringUser: 'example user',
        },
      });
    });

    it('should error if script run is in progress or failed', async () => {
      prisma.scriptRuns.findUnique = jest.fn().mockResolvedValue({
        id: randomUUID(),
        didScriptRun: false,
      });
      prisma.scriptRuns.create = jest.fn().mockResolvedValue(null);

      const scriptName = 'new run attempt 2';

      await expect(
        async () =>
          await service.markScriptAsRunStart(scriptName, 'example user'),
      ).rejects.toThrowError(
        `${scriptName} has an attempted run and it failed, or is in progress. If it failed, please delete the db entry and try again`,
      );

      expect(prisma.scriptRuns.findUnique).toHaveBeenCalledWith({
        where: {
          scriptName,
        },
      });
      expect(prisma.scriptRuns.create).not.toHaveBeenCalled();
    });

    it('should error if script run already succeeded', async () => {
      prisma.scriptRuns.findUnique = jest.fn().mockResolvedValue({
        id: randomUUID(),
        didScriptRun: true,
      });
      prisma.scriptRuns.create = jest.fn().mockResolvedValue(null);

      const scriptName = 'new run attempt 3';

      await expect(
        async () =>
          await service.markScriptAsRunStart(scriptName, 'example user'),
      ).rejects.toThrowError(
        `${scriptName} has already been run and succeeded`,
      );

      expect(prisma.scriptRuns.findUnique).toHaveBeenCalledWith({
        where: {
          scriptName,
        },
      });
      expect(prisma.scriptRuns.create).not.toHaveBeenCalled();
    });
  });

  describe('Testing markScriptAsComplete()', () => {
    it('should mark script run as started if no script run present in db', async () => {
      prisma.scriptRuns.update = jest.fn().mockResolvedValue(null);

      const scriptName = 'new run attempt 4';

      await service.markScriptAsComplete(scriptName, 'example user');

      expect(prisma.scriptRuns.update).toHaveBeenCalledWith({
        data: {
          didScriptRun: true,
          triggeringUser: 'example user',
        },
        where: {
          scriptName,
        },
      });
    });
  });
});

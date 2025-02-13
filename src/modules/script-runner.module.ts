import { Module } from '@nestjs/common';
import { ScirptRunnerController } from '../controllers/script-runner.controller';
import { ScriptRunnerService } from '../services/script-runner.service';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ScirptRunnerController],
  providers: [ScriptRunnerService],
  exports: [ScriptRunnerService],
})
export class ScriptRunnerModule {}

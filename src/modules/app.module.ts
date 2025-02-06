import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { PrismaModule } from './prisma.module';
import { ThrottleGuard } from '../guards/throttler.guard';
import { ScriptRunnerModule } from './script-runner.module';

@Module({
  imports: [
    PrismaModule,
    ScriptRunnerModule,
    ThrottlerModule.forRoot([
      {
        ttl: Number(process.env.THROTTLE_TTL),
        limit: Number(process.env.THROTTLE_LIMIT),
      },
    ]),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    SchedulerRegistry,
    {
      provide: APP_GUARD,
      useClass: ThrottleGuard,
    },
  ],
  exports: [PrismaModule, ScriptRunnerModule],
})
export class AppModule {}

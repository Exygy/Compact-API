import { ThrottlerGuard } from '@nestjs/throttler';
import { ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { ThrottlerLimitDetail } from '@nestjs/throttler/dist/throttler.guard.interface';
import { ConfigService } from '@nestjs/config';

/**
 * @description sets up IP based rate limiting
 */
@Injectable()
export class ThrottleGuard extends ThrottlerGuard {
  async getTracker(req: Record<string, any>): Promise<string> {
    if (req?.headers && req.headers['x-forwarded-for']) {
      // if we are passing through the proxy use forwarded for
      return req.headers['x-forwarded-for'].split(',')[0];
    }
    return req.ips.length ? req.ips[0] : req.ip;
  }

  async throwThrottlingException(
    context: ExecutionContext,
    throttlerLimitDetail: ThrottlerLimitDetail,
  ): Promise<void> {
    console.error(`IP Address: ${throttlerLimitDetail.tracker} was throttled`);
    await super.throwThrottlingException(context, throttlerLimitDetail);
  }
}

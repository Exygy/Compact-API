import { ImATeapotException, Injectable } from '@nestjs/common';
import { SuccessDTO } from '../dtos/shared/success.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  /**
   * @description this function verifies the API can hit the DB
   * @returns SuccessDTO with success of true when everything goes smoothly
   */
  async healthCheck(): Promise<SuccessDTO> {
    await this.prisma.$queryRaw`SELECT 1`;
    return {
      success: true,
    } as SuccessDTO;
  }

  // art pulled from: https://www.asciiart.eu/food-and-drinks/coffee-and-tea
  /**
   * @description I am a teapot!
   */
  async teapot(): Promise<SuccessDTO> {
    throw new ImATeapotException(`
                  ;,'
          _o_    ;:;'
      ,-.'---\`.__ ;
      ((j\`=====',-'
      \`-\     /
        \`-=-'     hjw
    `);
  }
}

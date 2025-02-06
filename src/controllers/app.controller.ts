import { Controller, Get } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';
import { SuccessDTO } from '../dtos/shared/success.dto';
import { AppService } from '../services/app.service';

@Controller()
@ApiExtraModels(SuccessDTO)
@ApiTags('root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Health check endpoint',
    operationId: 'healthCheck',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async healthCheck(): Promise<SuccessDTO> {
    return await this.appService.healthCheck();
  }

  @Get('teapot')
  @ApiOperation({
    summary: 'Tip me over and pour me out',
    operationId: 'teapot',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async teapot(): Promise<SuccessDTO> {
    return await this.appService.teapot();
  }
}

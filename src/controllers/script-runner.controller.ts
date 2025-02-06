import {
  Body,
  Controller,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScriptRunnerService } from '../services/script-runner.service';
import { defaultValidationPipeOptions } from '../utilities/default-validation-pipe-options';
import { SuccessDTO } from '../dtos/shared/success.dto';
import { NameDTO } from '../dtos/script-runner/name.dto';
import { ApiKeyGuard } from '../guards/api-key.guard';

@Controller('scriptRunner')
@ApiTags('scriptRunner')
@UsePipes(new ValidationPipe(defaultValidationPipeOptions))
@UseGuards(ApiKeyGuard)
export class ScirptRunnerController {
  constructor(private readonly scriptRunnerService: ScriptRunnerService) {}

  @Put('exampleScript')
  @ApiOperation({
    summary: 'An example of how the script runner can work',
    operationId: 'exampleScript',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async example(
    @Body() user: NameDTO,
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.example(req, user.name);
  }
}

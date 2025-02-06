import { Injectable, BadRequestException } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { PrismaService } from './prisma.service';
import { SuccessDTO } from '../dtos/shared/success.dto';

/**
 * @description this is the service for running scripts most functions in here will be unique, but its a way of writing complex 1 off scripts
 */
@Injectable()
export class ScriptRunnerService {
  constructor(private prisma: PrismaService) {}

  /**
    this is simply an example
  */
  async example(req: ExpressRequest, user): Promise<SuccessDTO> {
    await this.markScriptAsRunStart('example', user);
    // your code would go here
    await this.markScriptAsComplete('example', user);
    return { success: true };
  }

  // |------------------ HELPERS GO BELOW ------------------ | //

  /**
   *
   * @param scriptName the name of the script that is going to be run
   * @param userTriggeringTheRun the user that is attempting to trigger the script run
   * @description this checks to see if the script has already ran, if not marks the script in the db
   */
  async markScriptAsRunStart(
    scriptName: string,
    userTriggeringTheRun: string,
  ): Promise<void> {
    // check to see if script is already ran in db
    const storedScriptRun = await this.prisma.scriptRuns.findUnique({
      where: {
        scriptName,
      },
    });

    if (storedScriptRun?.didScriptRun) {
      // if script run has already successfully completed throw already succeed error
      throw new BadRequestException(
        `${scriptName} has already been run and succeeded`,
      );
    } else if (storedScriptRun?.didScriptRun === false) {
      // if script run was attempted but failed, throw attempt already failed error
      throw new BadRequestException(
        `${scriptName} has an attempted run and it failed, or is in progress. If it failed, please delete the db entry and try again`,
      );
    } else {
      // if no script run has been attempted create script run entry
      await this.prisma.scriptRuns.create({
        data: {
          scriptName,
          triggeringUser: userTriggeringTheRun,
        },
      });
    }
  }

  /**
   *
   * @param scriptName the name of the script that is going to be run
   * @param userTriggeringTheRun the user that is setting the script run as successfully completed
   * @description this marks the script run entry in the db as successfully completed
   */
  async markScriptAsComplete(
    scriptName: string,
    userTriggeringTheRun: string,
  ): Promise<void> {
    await this.prisma.scriptRuns.update({
      data: {
        didScriptRun: true,
        triggeringUser: userTriggeringTheRun,
      },
      where: {
        scriptName,
      },
    });
  }
}

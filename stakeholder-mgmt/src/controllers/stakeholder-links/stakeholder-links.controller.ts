import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
import {StakeHolderLinksRepository} from '../../repositories/stakeholder-links.repo';
export class StakeHolderLinksController {
  static stakeHolderLinksRepo = new StakeHolderLinksRepository();

  public static async getStakeHolderLinksList(
    req: Request,
    res: Response
  ): Promise<void> {
    const taskName = 'GET_STAKEHOLDER_LINKS_LIST';
    logger.info(`${taskName}_REQ`, 'GET_LIST');
    try {
      const stakeHolderLinksList: Array<any> = await StakeHolderLinksController.stakeHolderLinksRepo.getStakeHolderLinksList();
      if (!stakeHolderLinksList || stakeHolderLinksList.length <= 0) {
        logger.info(
          `${taskName}_DATA_NOT_FOUND`,
          JSON.stringify(stakeHolderLinksList)
        );
        const noResult = new BadRequestResponse(
          res,
          'Stakeholder Links List Data Not Found'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', stakeHolderLinksList);
      return success.send();
    } catch (err) {
      logger.error(`${taskName}_ERROR`, err);
      const response = new InternalErrorResponse(
        res,
        constants.errorMessage.unexpectedError
      );
      return response.send();
    }
  }
}

import {Request, Response} from 'express';

import {HotelReportsRepository} from './../../repositories/reports';
import {InternalErrorResponse} from './../../util/apiResponse';
import {FileBufferServices} from './../../util/fileSevices';

export class ReportsController {
  private static hotelReportsRepository = new HotelReportsRepository();

  public static async hotelReports(
    {params}: Request,
    res: Response
  ): Promise<void> {
    const taskName = 'GET-HOTEL-REPORT';
    try {
      const data =
        await ReportsController.hotelReportsRepository.getHotelReportById(
          params.id
        );
      const excel =
        await new FileBufferServices().generateBufferForExcelContent(data);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="hotel-${params.id}-report.xlsx"`
      );
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.status(200).send(excel);
    } catch (err) {
      console.error(`${taskName}_ERROR`, err);
      const response = new InternalErrorResponse(
        res,
        'An unexpected error has occurred'
      );
      return response.send();
    }
  }
}

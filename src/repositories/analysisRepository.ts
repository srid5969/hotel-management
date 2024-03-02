import {AppError, InternalError} from '../util/app-error';
import {CoverAnalysisData} from '../business_objects/coverAnalysis';
import {
  CoverAnalysisReportMasterModel,
  CoverAnalysisReportsModel,
} from '../models/coverAnalysis.model';
export class CoverAnalysisReportRepository {
  public async bulkImportCoverAnalysis(
    arr: CoverAnalysisData[],
    username: string,
    userId: string,
    hotel: string,
    hotelId: string,
    reportDate: string
  ) {
    try {
      await Promise.all(
        arr.map(async (data: CoverAnalysisData) => {
          const savedCARMaster = await CoverAnalysisReportMasterModel.create({
            username,
            userId,
            hotel,
            hotelId,
            reportDate,
            department: data.department,
          });
          //   await CoverAnalysisReportsModel.create({
          //     analysis: savedCARMaster.toJSON().id,
          //     type: 'outlet_total',
          //     ...data.outletTotal,
          //   });

          await Promise.all(
            data.report.map(async ses => {
              if (ses.resident)
                await CoverAnalysisReportsModel.create({
                  analysis: savedCARMaster.toJSON().id,
                  type: 'resident',
                  ...ses.resident,
                });
              if (ses.nonResident)
                await CoverAnalysisReportsModel.create({
                  analysis: savedCARMaster.toJSON().id,
                  type: 'non_resident',
                  ...ses.nonResident,
                });
              if (ses.sessionTotal)
                await CoverAnalysisReportsModel.create({
                  analysis: savedCARMaster.toJSON().id,
                  type: 'session_total',
                  ...ses.sessionTotal,
                });
            })
          );
        })
      );
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalError(error.message ?? 'Unexpected Error Ocurred');
    }
  }
}

import {getYear} from 'date-fns';
import {Request, Response} from 'express';
import {RevenueRepository} from '../../repositories/revenueRepository';
import {InternalErrorResponse, SuccessResponse} from './../../util/apiResponse';
import {AppError} from './../../util/app-error';
import {
  GeneratePdfUsingHTMLAndSendInResponse,
  getValueOrGetDefaultValue,
} from './../../util/commonService';
import {cityWiseHTMLTemplate} from './../../util/html-template/city-wise-revenue.pdf-html-template';
import {
  RevenueData,
  overAllRevenueHtmlTemplate,
} from './../../util/html-template/over-all-revenue.template-html';

export class RevenueGetController {
  public static readonly revenueService = new RevenueRepository();
  public static readonly staticData = {
    byYear: [
      {
        year: '2021-22',
        value: {
          roomsAvailable: 1,
          rnaPerDay: 1,
          toRoomNightsSold: 1,
          noOfRoomsSold: 1,
          occupancyPercent: 1,
          arr: 2,
          revPar: 1,
          roomRevenue: 2,
          foodRevenue: 1,
          beverageRevenue: 1,
          noOfCovers: 1,
          noOfCoversPerDay: 1,
          apc: 2,
          otherRevenue: 2,
          totalRevenue: 2,
        },
      },
      {
        year: '2022-23',
        value: {
          roomsAvailable: 1,
          rnaPerDay: 1,
          toRoomNightsSold: 1,
          noOfRoomsSold: 1,
          occupancyPercent: 1,
          arr: 2,
          revPar: 1,
          roomRevenue: 2,
          foodRevenue: 1,
          beverageRevenue: 1,
          noOfCovers: 1,
          noOfCoversPerDay: 1,
          apc: 2,
          otherRevenue: 2,
          totalRevenue: 2,
        },
      },
      {
        year: '2023-24',
        value: {
          roomsAvailable: 1,
          rnaPerDay: 1,
          toRoomNightsSold: 1,
          noOfRoomsSold: 1,
          occupancyPercent: 1,
          arr: 2,
          revPar: 1,
          roomRevenue: 2,
          foodRevenue: 1,
          beverageRevenue: 1,
          noOfCovers: 1,
          noOfCoversPerDay: 1,
          apc: 2,
          otherRevenue: 2,
          totalRevenue: 2,
        },
      },
    ],
    budget_ty: {
      roomsAvailable: 1,
      rnaPerDay: 1,
      toRoomNightsSold: 1,
      noOfRoomsSold: 1,
      occupancyPercent: 1,
      arr: 2,
      revPar: 1,
      roomRevenue: 2,
      foodRevenue: 1,
      beverageRevenue: 1,
      noOfCovers: 1,
      noOfCoversPerDay: 1,
      apc: 2,
      otherRevenue: 2,
      totalRevenue: 2,
    },
    variance: {
      roomsAvailable: 1,
      rnaPerDay: 1,
      toRoomNightsSold: 1,
      noOfRoomsSold: 1,
      occupancyPercent: 1,
      arr: 2,
      revPar: 1,
      roomRevenue: 2,
      foodRevenue: 1,
      beverageRevenue: 1,
      noOfCovers: 1,
      noOfCoversPerDay: 1,
      apc: 2,
      otherRevenue: 2,
      totalRevenue: 2,
    },
    golyPercentage: {
      roomsAvailable: 1,
      rnaPerDay: 1,
      toRoomNightsSold: 1,
      noOfRoomsSold: 1,
      occupancyPercent: 1,
      arr: 2,
      revPar: 1,
      roomRevenue: 2,
      foodRevenue: 1,
      beverageRevenue: 1,
      noOfCovers: 1,
      noOfCoversPerDay: 1,
      apc: 2,
      otherRevenue: 2,
      totalRevenue: 2,
    },
  };
  public static async getOverallRevenuePerHotelMTD(
    req: Request,
    res: Response
  ) {
    try {
      const data: RevenueData[] =
        await RevenueGetController.revenueService.getOverAllRevenueOfHotelByMonth(
          req.query.hotel as string,
          req.query.month as string
        );
      const currentYear = getYear(new Date());

      //convert to html
      const currentYearData = data.find(t => t.year == currentYear);
      const preYearData = data.find(t => t.year == currentYear - 1);
      const preTwoYearData = data.find(t => t.year == currentYear - 2);
      console.log('about to generate pdf');

      GeneratePdfUsingHTMLAndSendInResponse(
        res,
        await overAllRevenueHtmlTemplate({
          currentYear: currentYearData,
          oneYearB4Now: preYearData,
          twoYearB4Now: preTwoYearData,
          variance: {
            availableRooms:
              Number(currentYearData?.availableRooms || 0) -
              Number(preTwoYearData?.availableRooms || 0),
            notAvailableRooms:
              Number(currentYearData?.notAvailableRooms || 0) -
              Number(preTwoYearData?.notAvailableRooms || 0),
            occupancyPercentage:
              Number(currentYearData?.occupancyPercentage || 0) -
              Number(preTwoYearData?.occupancyPercentage || 0),
            roomRevenue:
              Number(currentYearData?.roomRevenue || 0) -
              Number(preTwoYearData?.roomRevenue || 0),
            foodAndBeverageRevenue:
              Number(currentYearData?.foodAndBeverageRevenue || 0) -
              Number(preTwoYearData?.foodAndBeverageRevenue || 0),
            otherRevenue:
              Number(currentYearData?.otherRevenue || 0) -
              Number(preTwoYearData?.otherRevenue || 0),
            roomsSold:
              Number(currentYearData?.roomsSold || 0) -
              Number(preTwoYearData?.roomsSold || 0),
            roomsSoldPerDay:
              Number(currentYearData?.roomsSoldPerDay || 0) -
              Number(preTwoYearData?.roomsSoldPerDay || 0),
            totalRevenue:
              Number(currentYearData?.totalRevenue || 0) -
              Number(preTwoYearData?.totalRevenue || 0),
            apc:
              Number(currentYearData?.apc || 0) -
              Number(preTwoYearData?.apc || 0), //n/a
            noOfCovers:
              Number(currentYearData?.noOfCovers || 0) -
              Number(preTwoYearData?.noOfCovers || 0), //n/a
            noOfCoversPerDay:
              Number(currentYearData?.noOfCoversPerDay || 0) -
              Number(preTwoYearData?.noOfCoversPerDay || 0), //n/a
            arr:
              Number(currentYearData?.arr || 0) -
              Number(preTwoYearData?.arr || 0), //n/a
            revPar:
              Number(currentYearData?.revPar || 0) -
              Number(preTwoYearData?.revPar || 0), //n/a
          },
        }),
        'overall-revenue-per-hotel-mtd'
      );
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res).send();
    }
  }
  static async getOverallRevenuePerHotelYTD(req: Request, res: Response) {
    new SuccessResponse(res, 'success', this.staticData).send();
  }
  static async getTotalRevenueUnitWise(req: Request, res: Response) {
    new SuccessResponse(res, 'success', {
      records: [
        {
          hotel: 'Hotel 1',
          roomRevenue: {
            ly: 0,
            budget: 0,
            ty: 0,
            var_vs_budget: 0,
            goly: 0,
          },
          'f-and-b-revenue': {
            ly: 0,
            budget: 0,
            ty: 0,
            var_vs_budget: 0,
            goly: 0,
          },
          otherRevenue: {
            ly: 0,
            budget: 0,
            ty: 0,
            var_vs_budget: 0,
            goly: 0,
          },
          totalRevenue: {
            ly: 0,
            budget: 0,
            ty: 0,
            var_vs_budget: 0,
            goly: 0,
            pdi: 0,
          },
        },
      ],
      grandTotal: {
        roomRevenue: {
          ly: 0,
          budget: 0,
          ty: 0,
          var_vs_budget: 0,
          goly: 0,
        },
        'f-and-b-revenue': {
          ly: 0,
          budget: 0,
          ty: 0,
          var_vs_budget: 0,
          goly: 0,
        },
        otherRevenue: {
          ly: 0,
          budget: 0,
          ty: 0,
          var_vs_budget: 0,
          goly: 0,
        },
        totalRevenue: {
          ly: 0,
          budget: 0,
          ty: 0,
          var_vs_budget: 0,
          goly: 0,
          pdi: 0,
        },
      },
    }).send();
  }
  static async getSegmentWiseRevenueConsolidatedLevel(
    req: Request,
    res: Response
  ) {
    new SuccessResponse(res, 'success', {
      records: [
        {
          segment: 'Retail',
          roomNightSold: {
            ly: 0,
            budget: 0,
            ty: 0,
            var_vs_budget: 0,
            goly: 0,
          },
          roomNightsSoldPerDay: {
            ly: 0,
            budget: 0,
            ty: 0,
            var_vs_budget: 0,
            goly: 0,
          },
          arr: {
            ly: 0,
            budget: 0,
            ty: 0,
            var_vs_budget: 0,
            goly: 0,
          },
          totalRev: {
            ly: 0,
            budget: 0,
            ty: 0,
            var_vs_budget: 0,
            goly: 0,
            pdi: 0,
            contriPercentLY: 0,
            contriPercentTY: 0,
          },
        },
      ],
      grandTotal: {
        roomNightSold: {
          ly: 0,
          budget: 0,
          ty: 0,
          var_vs_budget: 0,
          goly: 0,
        },
        roomNightsSoldPerDay: {
          ly: 0,
          budget: 0,
          ty: 0,
          var_vs_budget: 0,
          goly: 0,
        },
        arr: {
          ly: 0,
          budget: 0,
          ty: 0,
          var_vs_budget: 0,
          goly: 0,
        },
        totalRev: {
          ly: 0,
          budget: 0,
          ty: 0,
          var_vs_budget: 0,
          goly: 0,
          pdi: 0,
          contriPercentLY: 0,
          contriPercentTY: 0,
        },
      },
    }).send();
  }
  static async getSourceWiseRevenueConsolidatedLevel(
    req: Request,
    res: Response
  ) {
    new SuccessResponse(res, 'success', {
      records: [
        {
          source: 'UNIT Reservation',
          roomNightSold: {
            ly: 0,
            budget: 0,
            ty: 0,
            var_vs_budget: 0,
            goly: 0,
          },
          roomNightsSoldPerDay: {
            ly: 0,
            budget: 0,
            ty: 0,
            var_vs_budget: 0,
            goly: 0,
          },
          arr: {
            ly: 0,
            budget: 0,
            ty: 0,
            var_vs_budget: 0,
            goly: 0,
          },
          totalRev: {
            ly: 0,
            budget: 0,
            ty: 0,
            var_vs_budget: 0,
            goly: 0,
            pdi: 0,
            contriPercentLY: 0,
            contriPercentTY: 0,
          },
        },
      ],
      grandTotal: {
        roomNightSold: {
          ly: 0,
          budget: 0,
          ty: 0,
          var_vs_budget: 0,
          goly: 0,
        },
        roomNightsSoldPerDay: {
          ly: 0,
          budget: 0,
          ty: 0,
          var_vs_budget: 0,
          goly: 0,
        },
        arr: {
          ly: 0,
          budget: 0,
          ty: 0,
          var_vs_budget: 0,
          goly: 0,
        },
        totalRev: {
          ly: 0,
          budget: 0,
          ty: 0,
          var_vs_budget: 0,
          goly: 0,
          pdi: 0,
          contriPercentLY: 0,
          contriPercentTY: 0,
        },
      },
    }).send();
  }

  static async getCityWiseRevenue(req: Request, res: Response) {
    const html = cityWiseHTMLTemplate();
    GeneratePdfUsingHTMLAndSendInResponse(
      res,
      html,
      'city-wise-revenue-report'
    );
  }

  static async getHotelRoomRevenue(req: Request, res: Response) {
    new SuccessResponse(res, 'success', {
      revenues: [
        {
          hotel: 'Hotel 1',
          noOfRooms: 0,
          roomNightAvailable: {
            ly: null,
            budget: null,
            ty: null,
            var_vs_budget: 0,
            goly: 0,
          },
          roomNightSold: {
            ly: null,
            budget: null,
            ty: null,
            var_vs_budget: 0,
            goly: 0,
          },
          occupancyPercent: {
            ly: null,
            budget: null,
            ty: null,
            var_vs_budget: 0,
            goly: 0,
          },
          arr: {
            ly: null,
            budget: null,
            ty: null,
            var_vs_budget: 0,
            goly: 0,
          },
          revPar: {
            ly: null,
            budget: null,
            ty: null,
            var_vs_budget: 0,
            goly: 0,
          },
          totalRev: {
            ly: null,
            budget: null,
            ty: null,
            var_vs_budget: 0,
            goly: 0,
            pdi: 0,
            foreign: 0,
            domestic: 0,
          },
        },
      ],
      grandTotal: {
        noOfRooms: 0,
        roomNightAvailable: {
          ly: null,
          budget: null,
          ty: null,
          var_vs_budget: 0,
          goly: 0,
        },
        roomNightSold: {
          ly: null,
          budget: null,
          ty: null,
          var_vs_budget: 0,
          goly: 0,
        },
        occupancyPercent: {
          ly: null,
          budget: null,
          ty: null,
          var_vs_budget: 0,
          goly: 0,
        },
        arr: {
          ly: null,
          budget: null,
          ty: null,
          var_vs_budget: 0,
          goly: 0,
        },
        revPar: {
          ly: null,
          budget: null,
          ty: null,
          var_vs_budget: 0,
          goly: 0,
        },
        totalRev: {
          ly: null,
          budget: null,
          ty: null,
          var_vs_budget: 0,
          goly: 0,
          pdi: 0,
          foreign: 0,
          domestic: 0,
        },
      },
    }).send();
  }

  static async getRoomRevenueByRoomType(req: Request, res: Response) {
    new SuccessResponse(res, 'success', {
      records: [
        {
          roomType: 'Deluxe',
          rn_s: null,
          adr: null,
          revenue: 0,
          adrPremium: 0,
        },
        {
          roomType: 'Premium',
          rn_s: null,
          adr: null,
          revenue: 0,
          adrPremium: 0,
        },
        {
          roomType: 'Club Room',
          rn_s: null,
          adr: null,
          revenue: 0,
          adrPremium: 0,
        },
        {
          roomType: 'Suites',
          rn_s: null,
          adr: null,
          revenue: 0,
          adrPremium: 0,
        },
      ],
      total: {
        rn_s: null,
        adr: null,
        revenue: 0,
        adrPremium: 0,
      },
    }).send();
  }

  static async F_and_B_revenue(req: Request, res: Response) {
    new SuccessResponse(res, 'success', {
      records: [
        {
          hotel: 'Hotel 1',
          coverSold: {
            ly: null,
            budget: null,
            ty: null,
            var_vs_budget: null,
            goly: null,
          },
          avgRevPerCover: {
            ly: null,
            budget: null,
            ty: null,
            var_vs_budget: null,
            goly: null,
          },
          total: {
            ly: null,
            budget: null,
            ty: null,
            var_vs_budget: null,
            goly: null,
            resident: null,
            nonResident: null,
          },
        },
      ],
      grandTotal: {
        ly: null,
        budget: null,
        ty: null,
        var_vs_budget: null,
        goly: null,
      },
      avgRevPerCover: {
        ly: null,
        budget: null,
        ty: null,
        var_vs_budget: null,
        goly: null,
      },
      total: {
        ly: null,
        budget: null,
        ty: null,
        var_vs_budget: null,
        goly: null,
        resident: null,
        nonResident: null,
      },
    }).send();
  }
}

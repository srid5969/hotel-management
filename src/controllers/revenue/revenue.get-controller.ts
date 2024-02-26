import { GeneratePdfUsingHTMLAndSendInResponse } from './../../util/commonService';
import {cityWiseHTMLTemplate} from './../../util/html-template/city-wise-revenue.pdf-html-template';
import {SuccessResponse} from './../../util/apiResponse';
import {Request, Response} from 'express';

export class RevenueGetController {
  static staticData = {
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
  static async getOverallRevenuePerHotelMTD(req: Request, res: Response) {
    new SuccessResponse(res, 'success', this.staticData).send();
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
    GeneratePdfUsingHTMLAndSendInResponse(res,html,'city-wise-revenue-report')
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

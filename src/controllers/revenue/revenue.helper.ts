import {HotelRevenueData} from './../../business_objects/report';
import {SourceWiseRevenueResult} from '../../util/html-template/source-wise-revenue.html-template';
import {MarketSegmentResult} from './../../util/html-template/segment-wise-revenue.html-template';
export function calculateGrandTotal(data: any[]): any {
  const grandTotal: any = {
    roomRev: {ly: 0, budget: 0, ty: 0, var_vs_budget: 0, goly: 0},
    FnBRev: {ly: 0, budget: 0, ty: 0, var_vs_budget: 0, goly: 0},
    otherRev: {ly: 0, budget: 0, ty: 0, var_vs_budget: 0, goly: 0},
    totalRev: {ly: 0, budget: 0, ty: 0, var_vs_budget: 0, goly: 0},
  };

  // Iterate over each object in the array
  data.forEach(item => {
    grandTotal.roomRev.ly += item.roomRev.ly;
    grandTotal.roomRev.budget += item.roomRev.budget;
    grandTotal.roomRev.ty += item.roomRev.ty;
    grandTotal.roomRev.var_vs_budget += item.roomRev.var_vs_budget;
    grandTotal.roomRev.goly += item.roomRev.goly;

    grandTotal.FnBRev.ly += item.FnBRev.ly;
    grandTotal.FnBRev.budget += item.FnBRev.budget;
    grandTotal.FnBRev.ty += item.FnBRev.ty;
    grandTotal.FnBRev.var_vs_budget += item.FnBRev.var_vs_budget;
    grandTotal.FnBRev.goly += item.FnBRev.goly;

    grandTotal.otherRev.ly += item.otherRev.ly;
    grandTotal.otherRev.budget += item.otherRev.budget;
    grandTotal.otherRev.ty += item.otherRev.ty;
    grandTotal.otherRev.var_vs_budget += item.otherRev.var_vs_budget;
    grandTotal.otherRev.goly += item.otherRev.goly;

    grandTotal.totalRev.ly += item.totalRev.ly;
    grandTotal.totalRev.budget += item.totalRev.budget;
    grandTotal.totalRev.ty += item.totalRev.ty;
    grandTotal.totalRev.var_vs_budget += item.totalRev.var_vs_budget;
    grandTotal.totalRev.goly += item.totalRev.goly;
  });

  return grandTotal;
}
export function calculateGrandTotalForMarketSegment(
  data: MarketSegmentResult[]
): Omit<MarketSegmentResult, 'segment'> {
  const grandTotal: Omit<MarketSegmentResult, 'segment'> = {
    arr: {ly: 0, budget: 0, ty: 0, var_vs_budget: 0, goly: 0},
    roomPerDay: {ly: 0, budget: 0, ty: 0, var_vs_budget: 0, goly: 0},
    roomSold: {ly: 0, budget: 0, ty: 0, var_vs_budget: 0, goly: 0},
    totalRevenue: {
      ly: 0,
      budget: 0,
      ty: 0,
      var_vs_budget: 0,
      goly: 0,
      lyContr: 0,
      pdi: 0,
      tyContr: 0,
    },
  };

  // Iterate over each object in the array
  data.forEach(item => {
    grandTotal.roomSold.ly += item.roomSold.ly;
    grandTotal.roomSold.budget += item.roomSold.budget;
    grandTotal.roomSold.ty += item.roomSold.ty;
    grandTotal.roomSold.var_vs_budget += item.roomSold.var_vs_budget;
    grandTotal.roomSold.goly += item.roomSold.goly;

    grandTotal.roomPerDay.ly += item.roomPerDay.ly;
    grandTotal.roomPerDay.budget += item.roomPerDay.budget;
    grandTotal.roomPerDay.ty += item.roomPerDay.ty;
    grandTotal.roomPerDay.var_vs_budget += item.roomPerDay.var_vs_budget;
    grandTotal.roomPerDay.goly += item.roomPerDay.goly;

    grandTotal.arr.ly += item.arr.ly;
    grandTotal.arr.budget += item.arr.budget;
    grandTotal.arr.ty += item.arr.ty;
    grandTotal.arr.var_vs_budget += item.arr.var_vs_budget;
    grandTotal.arr.goly += item.arr.goly;

    grandTotal.totalRevenue.ly += item.totalRevenue.ly;
    grandTotal.totalRevenue.budget += item.totalRevenue.budget;
    grandTotal.totalRevenue.ty += item.totalRevenue.ty;
    grandTotal.totalRevenue.var_vs_budget += item.totalRevenue.var_vs_budget;
    grandTotal.totalRevenue.goly += item.totalRevenue.goly;
    grandTotal.totalRevenue.pdi += item.totalRevenue.pdi;
    grandTotal.totalRevenue.lyContr += item.totalRevenue.lyContr;
    grandTotal.totalRevenue.tyContr += item.totalRevenue.tyContr;
  });

  return grandTotal;
}
export function calculateGrandTotalForSourceRevenue(
  data: SourceWiseRevenueResult[]
): Omit<SourceWiseRevenueResult, 'source'> {
  const grandTotal: Omit<SourceWiseRevenueResult, 'source'> = {
    arr: {ly: 0, budget: 0, ty: 0, var_vs_budget: 0, goly: 0},
    roomPerDay: {ly: 0, budget: 0, ty: 0, var_vs_budget: 0, goly: 0},
    roomSold: {ly: 0, budget: 0, ty: 0, var_vs_budget: 0, goly: 0},
    totalRevenue: {
      ly: 0,
      budget: 0,
      ty: 0,
      var_vs_budget: 0,
      goly: 0,
      pdi: 0,
    },
  };

  // Iterate over each object in the array
  data.forEach(item => {
    grandTotal.roomSold.ly += item.roomSold.ly;
    grandTotal.roomSold.budget += item.roomSold.budget;
    grandTotal.roomSold.ty += item.roomSold.ty;
    grandTotal.roomSold.var_vs_budget += item.roomSold.var_vs_budget;
    grandTotal.roomSold.goly += item.roomSold.goly;

    grandTotal.roomPerDay.ly += item.roomPerDay.ly;
    grandTotal.roomPerDay.budget += item.roomPerDay.budget;
    grandTotal.roomPerDay.ty += item.roomPerDay.ty;
    grandTotal.roomPerDay.var_vs_budget += item.roomPerDay.var_vs_budget;
    grandTotal.roomPerDay.goly += item.roomPerDay.goly;

    grandTotal.arr.ly += item.arr.ly;
    grandTotal.arr.budget += item.arr.budget;
    grandTotal.arr.ty += item.arr.ty;
    grandTotal.arr.var_vs_budget += item.arr.var_vs_budget;
    grandTotal.arr.goly += item.arr.goly;

    grandTotal.totalRevenue.ly += item.totalRevenue.ly;
    grandTotal.totalRevenue.budget += item.totalRevenue.budget;
    grandTotal.totalRevenue.ty += item.totalRevenue.ty;
    grandTotal.totalRevenue.var_vs_budget += item.totalRevenue.var_vs_budget;
    grandTotal.totalRevenue.goly += item.totalRevenue.goly;
    grandTotal.totalRevenue.pdi += item.totalRevenue.pdi;
  });

  return grandTotal;
}
export function CalculateRoomsRevenueGrandTotal(
  data: HotelRevenueData[]
): Omit<HotelRevenueData, 'hotel'> {
  const result: Omit<HotelRevenueData, 'hotel'> = {
    arr: {budget: 0, goly: 0, ly: 0, ty: 0, var_vs_budget: 0},
    occupancy: {budget: 0, goly: 0, ly: 0, ty: 0, var_vs_budget: 0},
    revPar: {budget: 0, goly: 0, ly: 0, ty: 0, var_vs_budget: 0},
    roomsAvailable: {budget: 0, goly: 0, ly: 0, ty: 0, var_vs_budget: 0},
    roomSold: {budget: 0, goly: 0, ly: 0, ty: 0, var_vs_budget: 0},
    noOfRooms: 0,
    totalRev: {
      budget: 0,
      goly: 0,
      ly: 0,
      ty: 0,
      var_vs_budget: 0,
      domestic: 0,
      foreign: 0,
      pdi: 0,
    },
  };
  data.forEach(item => {
    result.noOfRooms += item.noOfRooms;

    result.arr.ly += item.arr.ly;
    result.arr.ty += item.arr.ty;
    result.arr.budget += item.arr.budget;
    result.arr.var_vs_budget += item.arr.var_vs_budget;
    result.arr.goly += item.arr.goly;

    result.occupancy.ly += item.occupancy.ly;
    result.occupancy.ty += item.occupancy.ty;
    result.occupancy.budget += item.occupancy.budget;
    result.occupancy.var_vs_budget += item.occupancy.var_vs_budget;
    result.occupancy.goly += item.occupancy.goly;

    result.revPar.ly += item.revPar.ly;
    result.revPar.ty += item.revPar.ty;
    result.revPar.budget += item.revPar.budget;
    result.revPar.var_vs_budget += item.revPar.var_vs_budget;
    result.revPar.goly += item.revPar.goly;

    result.roomsAvailable.ly += item.roomsAvailable.ly;
    result.roomsAvailable.ty += item.roomsAvailable.ty;
    result.roomsAvailable.budget += item.roomsAvailable.budget;
    result.roomsAvailable.var_vs_budget += item.roomsAvailable.var_vs_budget;
    result.roomsAvailable.goly += item.roomsAvailable.goly;

    result.roomSold.ly += item.roomSold.ly;
    result.roomSold.ty += item.roomSold.ty;
    result.roomSold.budget += item.roomSold.budget;
    result.roomSold.var_vs_budget += item.roomSold.var_vs_budget;
    result.roomSold.goly += item.roomSold.goly;

    result.totalRev.ly += item.totalRev.ly;
    result.totalRev.ty += item.totalRev.ty;
    result.totalRev.budget += item.totalRev.budget;
    result.totalRev.var_vs_budget += item.totalRev.var_vs_budget;
    result.totalRev.goly += item.totalRev.goly;
    result.totalRev.pdi += item.totalRev.pdi;
    result.totalRev.domestic += item.totalRev.domestic;
    result.totalRev.foreign += item.totalRev.foreign;
  });
  return result;
}

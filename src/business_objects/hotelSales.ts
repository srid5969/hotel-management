import {MealType} from '../util/enum';
export interface HolelMonthlyDataImportDTO {
  id?: any;
  hotel: string;
  date: Date;
  billAmount: number;
  discount: number;
  food: number;
  liquor: number;
  softDrinks: number;
  tobacco: number;
  advance: number;
}

export interface HolelDailyDataImportDTO {
  id?: any;
  hotel: string;
  date: Date;
  billAmount: number;
  discount: number;
  food: number;
  liquor: number;
  softDrinks: number;
  tobacco: number;
  advance: number;
}

export interface DailySalesDataFromExcel {
  'Bill#': string;
  'Table # / Room #': string;
  'Kot #': string;
  COVFX: string;
  FOD: string;
  'LIQ#': string;
  'SFD#': string;
  'SMK#': string;
  'OTH#': string;
  'Sale Amount': string;
  CGT: string;
  SGT: string;
  'ROF#': string;
  'DISC.': string;
  'NET.AMT': string;
  'Set.Amt': string;
  'Set.Mode': string;
  User: string;
}

export interface DailySalesReport {
  id?: never;
  hotel: string;
  mealType: MealType;
  orderId: string;
  tableNo: string;
  kot: number[];
  covfx: number;
  fod: number;
  liq: number;
  sfd: number;
  smk: number;
  oth: number;
  salesAmount: number;
  cgt: number;
  sgt: number;
  rof: number;
  disc: number;
  netAmount: number;
  setAmount: number;
  setMode: string;
  user: string;
  date: any;
}

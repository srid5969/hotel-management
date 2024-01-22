export interface HolelMonthlyDataImportDTO {
  id?:any
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

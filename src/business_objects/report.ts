export interface IReportReqBody {
  username: string;
  userId: string;
  uploadDate: string;
  hotelName: string;
  hotelId: string;
}

export interface CityWiseRevenueReportResponseDTO {
  hotel: string;
  city: string;
  roomsAvl: number;
  roomsSold: number;
  occ: number;
  arr: number;
  revPar: number;
  fnbRev: number;
  otherRev: number;
  roomRev: number;
  totalRevenue: number;
}
interface Metrics {
  ly: number;
  budget: number;
  ty: number;
  var_vs_budget: number;
  goly: number;
}
interface TotalRevenueMetrics extends Metrics {
  foreign: number;
  pdi: number;
  domestic: number;
}
export interface HotelRevenueData {
  hotel: string;
  noOfRooms: number;
  roomsAvailable: Metrics;
  roomSold: Metrics;
  occupancy: Metrics;
  arr: Metrics;
  revPar: Metrics;
  totalRev: TotalRevenueMetrics;
}
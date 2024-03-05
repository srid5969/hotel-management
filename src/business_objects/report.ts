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

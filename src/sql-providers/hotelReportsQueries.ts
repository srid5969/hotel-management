export const hotelReportsQueries = {
  getHotelReportsByHotelId(hotelId: number | string) {
    if (hotelId == 1) {
      return `
          SELECT 
            HotelId, HotelName, NoOfRooms, HotelType, Location, HtlCategory, HtlClfication, CompName,
            CONVERT(VARCHAR(30), FlagDate, 103) as FlagDate,
            CONVERT(VARCHAR(30), AgreSingDate, 103) as AgreSingDate,
            CONVERT(VARCHAR(30), AgreTillDate, 103) as AgreTillDate 
          FROM 
            hotelmaster 
          WHERE 
            IsActive = 1`;
    } else {
      return `
          SELECT 
            HotelId, HotelName, NoOfRooms, HotelType, Location, HtlCategory, HtlClfication, CompName,
            CONVERT(VARCHAR(30), FlagDate, 103) as FlagDate,
            CONVERT(VARCHAR(30), AgreSingDate, 103) as AgreSingDate,
            CONVERT(VARCHAR(30), AgreTillDate, 103) as AgreTillDate 
          FROM 
            hotelmaster 
          WHERE 
            HotelId = ${hotelId} AND IsActive = 1`;
    }
  },
};

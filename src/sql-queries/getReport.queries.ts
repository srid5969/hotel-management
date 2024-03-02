export const reportSqlQueries = {
  getOverAllRevenuePerHotelByMonth(
    month: string,
    hotel: string,
    years: number[]
  ) {
    return `
        select 
        report.avl as availableRooms,
        report.avl-report.totalOcc as notAvailableRooms,
        report.occPercent as occupancyPercentage,
        report.roomRev as roomRevenue,
        report.fnbRev as foodAndBeverageRevenue,
        report.otherRev as otherRevenue,
        report.totalOcc as roomsSold,
        report.totalOcc as roomsSoldPerDay,
        report.roomRev +  report.fnbRev+ report.otherRev as totalRevenue,
        DATEPART(YEAR, report.date) as year,
        DATEPART(MONTH, report.date) as month
        from Revenues as report where DATEPART(MONTH, report.date) = ${month} 
        and report.hotelId='${hotel}' 
        and report.type='History'
        and DATEPART(YEAR, report.date) in (${years.join(',')})
        `;
  },
  getOverAllRevenuePerHotelByYear(
    month: string,
    hotel: string,
    years: number[]
  ) {
    return `
        select 
        report.avl as availableRooms,
        report.avl-report.totalOcc as notAvailableRooms,
        report.occPercent as occupancyPercentage,
        report.roomRev as roomRevenue,
        report.fnbRev as foodAndBeverageRevenue,
        report.otherRev as otherRevenue,
        report.totalOcc as roomsSold,
        report.totalOcc as roomsSoldPerDay,
        report.roomRev +  report.fnbRev+ report.otherRev as totalRevenue,
        DATEPART(YEAR, report.date) as year,
        DATEPART(MONTH, report.date) as month
        from Revenues as report where DATEPART(MONTH, report.date) = ${month} 
        and report.hotelId='${hotel}' 
        and report.type='History'
        and DATEPART(YEAR, report.date) in (${years.join(',')})
        `;
  },
};

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
  getOverAllRevenuePerHotelByYear(hotel: string, years: number[]) {
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
        from Revenues as report where
        report.hotelId='${hotel}' 
        and report.type='History'
        and DATEPART(YEAR, report.date) in (${years.join(',')})
        `;
  },
  unitWiseReportGetQuery(city: string, year: number) {
    return `select 
    DATEPART(YEAR,report.[date]) AS year,
    report.[type] as [type],
    hotel.hotel_name as hotelName,
    hotel.id as hotelId,
    report.roomRev as roomRevenue,
    report.otherRev as otherRevenue,
    report.fnbRev as fnbRev,
    report.roomRev+report.otherRev+report.fnbRev as total
   from Revenues as report
   left join hotel_master as hotel on hotel.id=report.hotelId
   where hotel.CityID='${city}' and DATEPART(YEAR,report.[date])='${year}'
   `;
  },
  getSegmentWiseReport(hotel: string) {
    return `select
    marketSegment.source as "segment",

    marketSegment.[yod_occ] as "roomSold.ty",
    marketSegment.[yod_rate] as "roomSold.budget",
    marketSegment.yod_arp as "roomSold.ly",
    marketSegment.yod_arp-marketSegment.mod_arp as "roomSold.var_vs_budget",
    marketSegment.yod_paxPercent as "roomSold.goly",

    marketSegment.mod_arr as "roomPerDay.ty",
    marketSegment.[yod_rate] as "roomPerDay.budget",
    marketSegment.yod_arp as "roomPerDay.ly",
    marketSegment.yod_arp-marketSegment.mod_arp as "roomPerDay.var_vs_budget",
    marketSegment.yod_paxPercent as "roomPerDay.goly",

    marketSegment.yod_arr as "arr.ty",
    marketSegment.[yod_rate] as "arr.budget",
    marketSegment.yod_arp as "arr.ly",
    marketSegment.yod_arp-marketSegment.mod_arp as "arr.var_vs_budget",
    marketSegment.yod_paxPercent as "arr.goly",

    marketSegment.[yod_occ]+marketSegment.mod_arr+marketSegment.yod_arr as "totalRevenue.ty",
    marketSegment.[yod_rate]+marketSegment.[yod_rate]+marketSegment.[yod_rate] as "totalRevenue.budget",
    marketSegment.yod_arp+marketSegment.yod_arp+marketSegment.yod_arp as "totalRevenue.ly",
    marketSegment.yod_arp-marketSegment.mod_arp+marketSegment.yod_arp-marketSegment.mod_arp+marketSegment.yod_arp-marketSegment.mod_arp as "totalRevenue.var_vs_budget",
    marketSegment.yod_paxPercent+marketSegment.yod_paxPercent+marketSegment.yod_paxPercent as "totalRevenue.goly"
    from [Statistics] as marketSegment
    where marketSegment.[type]='Market Segment'
    and marketSegment.hotelId='${hotel}'`;
  },
  getSourceWiseReport(hotel: string) {
    return `select
    source_rev.source as "source",

    source_rev.[yod_occ] as "roomSold.ty",
    source_rev.[yod_rate] as "roomSold.budget",
    source_rev.yod_arp as "roomSold.ly",
    source_rev.yod_arp-source_rev.mod_arp as "roomSold.var_vs_budget",
    source_rev.yod_paxPercent as "roomSold.goly",

    source_rev.mod_arr as "roomPerDay.ty",
    source_rev.[yod_rate] as "roomPerDay.budget",
    source_rev.yod_arp as "roomPerDay.ly",
    source_rev.yod_arp-source_rev.mod_arp as "roomPerDay.var_vs_budget",
    source_rev.yod_paxPercent as "roomPerDay.goly",

    source_rev.yod_arr as "arr.ty",
    source_rev.[yod_rate] as "arr.budget",
    source_rev.yod_arp as "arr.ly",
    source_rev.yod_arp-source_rev.mod_arp as "arr.var_vs_budget",
    source_rev.yod_paxPercent as "arr.goly",

    source_rev.[yod_occ]+source_rev.mod_arr+source_rev.yod_arr as "totalRevenue.ty",
    source_rev.[yod_rate]+source_rev.[yod_rate]+source_rev.[yod_rate] as "totalRevenue.budget",
    source_rev.yod_arp+source_rev.yod_arp+source_rev.yod_arp as "totalRevenue.ly",
    source_rev.yod_arp-source_rev.mod_arp+source_rev.yod_arp-source_rev.mod_arp+source_rev.yod_arp-source_rev.mod_arp as "totalRevenue.var_vs_budget",
    source_rev.yod_paxPercent+source_rev.yod_paxPercent+source_rev.yod_paxPercent as "totalRevenue.goly"
    from [Statistics] as source_rev
    where source_rev.[type]='Business Source'
    and source_rev.hotelId='${hotel}'`;
  },
  getCityWiseReport(cityID: string) {
    return `
    select hotel.hotel_name as hotel ,
    hotel.CityName as city,
    revenue.avl-revenue.avl as roomsAvl,
    revenue.avl-revenue.totalOcc as roomsSold,
    revenue.totalOcc as occ,
    revenue.avgRate as arr,
    revenue.occPercent/revenue.avgRate as revPar,
    revenue.fnbRev as fnbRev,
    revenue.otherRev as otherRev,
    revenue.roomRev as roomRev,
    revenue.roomRev+revenue.fnbRev as totalRevenue
    from hotel_master as hotel
    inner join [Revenues] as revenue on revenue.hotelId=hotel.id
    where hotel.CityID='${cityID}'
    `;
  },
};
